import { firebaseApp } from '../lib/firebase';
import { deleteObject, getStorage, uploadBytesResumable } from 'firebase/storage';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { getAuth, updateProfile } from 'firebase/auth';

const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth();

// to check if the usernam entered is valid or not
export async function doesUsernameExist(username) {
  const usersRef = collection(db, 'users');
  const result = query(usersRef, where('username', '==', username));
  const getResult = await getDocs(result);
  const returnResult = getResult.docs.map((user) => user.data().length > 0);
  return returnResult;
}

// get user from the firestore with the username
export async function getUserByUsername(username) {
  const usersRef = collection(db, 'users');
  const result = query(usersRef, where('username', '==', username));
  const getResult = await getDocs(result);
  const returnResult = getResult.docs.map((user) => ({
    ...user.data(),
    id: user.id
  }));
  return returnResult;
}

// get user from the firestore with the userId
export async function getUserByUserId(userId) {
  const usersRef = collection(db, 'users');
  const result = query(usersRef, where('userId', '==', userId));
  const getResult = await getDocs(result);
  const userResult = getResult.docs.map((user) => ({
    ...user.data(),
    id: user.id
  }));
  return userResult;
}

// fetch the suggested profiles for the active user.
export async function getSuggestedProfiles(userId, following) {
  const usersRef = collection(db, 'users');
  const result = query(usersRef, limit(10));
  const getResult = await getDocs(result);
  const userResult = getResult.docs
    .map((user) => ({
      ...user.data(),
      id: user.id
    }))
    .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
  return userResult;
}

// update the active users following
export async function updateLoggedInUserFollowing(
  loggedInUserDocId,
  profileId,
  isFollowingProfile
) {
  const usersRef = doc(db, 'users', loggedInUserDocId);
  await updateDoc(usersRef, {
    following: isFollowingProfile ? arrayRemove(profileId) : arrayUnion(profileId)
  });
}

// update the followers list of the user whom the active user follows
export async function updateFollowedUserFollowers(
  profileDocId,
  loggedInUserDocId,
  isFollowingProfile
) {
  const usersRef = doc(db, 'users', profileDocId);
  await updateDoc(usersRef, {
    followers: isFollowingProfile ? arrayRemove(loggedInUserDocId) : arrayUnion(loggedInUserDocId)
  });
}

// fetch the posts of the users whom the active user is following
export async function getPhotos(userId, following) {
  const photosRef = collection(db, 'photos');
  const result = query(photosRef, where('userId', 'in', following));
  const getResult = await getDocs(result);
  const userFollowedPhotos = getResult.docs.map((photo) => ({
    ...photo.data(),
    id: photo.id
  }));
  const photoWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      // checks if the logged in user already likes that post or not
      let userLikedPhoto = false;
      photo.likes?.map((res) => {
        if (res === userId) {
          userLikedPhoto = true;
        }
      });
      return { ...photo, userLikedPhoto };
    })
  );
  return photoWithUserDetails;
}

// update the like count of the post
export async function updateLikes(id, userId, toggledLiked) {
  const photosRef = doc(db, 'photos', id);
  await updateDoc(photosRef, {
    likes: toggledLiked ? arrayRemove(userId) : arrayUnion(userId)
  });
}

// add the photo to firebase storage, fetch its download url and add to photos in firestore
export async function addPostsToFirestore(userId, username, image, caption, selectedFile) {
  const postRef = await addDoc(collection(db, 'photos'), {
    caption: caption,
    likes: [],
    username: username,
    userId: userId,
    userImage: image,
    timestamp: serverTimestamp()
  });
  const imageRef = ref(storage, `posts/${postRef.id}/image`);
  await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
    const downloadUrl = await getDownloadURL(imageRef);
    const photoRef = doc(db, 'photos', postRef.id);
    await updateDoc(photoRef, {
      imageSrc: downloadUrl
    });
  });
}

// add the comments to the particular post
export async function addComment(id, commentToSend, username, image) {
  const commentsRef = collection(db, 'photos', id, 'comments');
  await addDoc(commentsRef, {
    comment: commentToSend,
    username: username,
    userImage: image,
    likes: [],
    timestamp: serverTimestamp()
  });
}

// fetch the comments of the particular post
export function displayComment(id) {
  const commentsRef = collection(db, 'photos', id, 'comments');
  return query(commentsRef, orderBy('timestamp', 'desc'));
}

// fetch users who liked the particular post
export async function getLikedUsers(id) {
  const photosRef = doc(db, 'photos', id);
  const getResult = await getDoc(photosRef);
  const likesUserIds = getResult.data().likes;
  // returns a data as promise
  const data = likesUserIds.map(async (userId) => {
    const user = await getUserByUserId(userId);
    return user;
  });
  // extracts the data from the promise
  const result = await Promise.all(data);
  return result;
}

// get photos of the visited user from the firestore with the username
export async function getPhotosByUsername(username) {
  const [user] = await getUserByUsername(username);
  const photosRef = collection(db, 'photos');
  // fetch photos only of the visited user
  const result = query(photosRef, where('userId', '==', user.userId), orderBy('timestamp', 'desc'));
  const getResult = await getDocs(result);
  const photos = getResult.docs.map((photo) => ({
    ...photo.data(),
    id: photo.id
  }));
  return photos;
}

// checks if the logged in user is following the profile user or not
export async function isUserFollowingProfile(loggedInUserUsername, profileUserUserId) {
  const userRef = collection(db, 'users');
  const result = query(
    userRef,
    where('username', '==', loggedInUserUsername),
    where('following', 'array-contains', profileUserUserId)
  );
  const getResult = await getDocs(result);
  const [response = {}] = getResult.docs.map((res) => ({
    ...res.data(),
    id: res.id
  }));
  return response.userId;
}

// handle the Follow unfollow button functionality
export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserUserId,
  activeUserUserId
) {
  await updateLoggedInUserFollowing(activeUserDocId, profileUserUserId, isFollowingProfile);
  await updateFollowedUserFollowers(profileDocId, activeUserUserId, isFollowingProfile);
}

// edit the logged in User details as per his request
export async function updateUserDetails(
  id,
  userId,
  username,
  fullName,
  bio,
  edituserName,
  editfullName,
  editBio,
  selectedFile
) {
  const imageRef = ref(storage, `users/${userId}/image`);
  const userRef = doc(db, 'users', id);
  if (selectedFile) {
    await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
      const downloadUrl = await getDownloadURL(imageRef);
      await updateDoc(userRef, {
        username: edituserName ? edituserName : username,
        fullName: editfullName ? editfullName : fullName,
        image: downloadUrl,
        bio: editBio ? editBio : bio
      });
    });
  } else {
    await updateDoc(userRef, {
      username: edituserName ? edituserName : username,
      fullName: editfullName ? editfullName : fullName
    });
  }
}

// update the logged in User's username if an edit was requested
export async function updateUserAuthDetails(username, edituserName) {
  updateProfile(auth.currentUser, {
    displayName: edituserName ? edituserName : username
  }).then(() => {
    console.log(auth.currentUser);
  });
}

// fetch the followers of the profile user
export async function getFollowers(id) {
  const usersRef = doc(db, 'users', id);
  const getResult = await getDoc(usersRef);
  const followersId = getResult.data().followers;
  // returns a data as promise
  const data = followersId.map(async (userId) => {
    const user = await getUserByUserId(userId);
    return user;
  });
  // extracts the data from the promise
  const result = await Promise.all(data);
  return result;
}

// fetch the following of the profile user
export async function getFollowing(id) {
  const usersRef = doc(db, 'users', id);
  const getResult = await getDoc(usersRef);
  const followingUsersId = getResult.data().following;
  // returns a data as promise
  const data = followingUsersId.map(async (userId) => {
    const user = await getUserByUserId(userId);
    return user;
  });
  // extracts the data from the promise
  const result = await Promise.all(data);
  return result;
}

//get the length of the comments in the photo with that id
export async function getCommentsLength(id) {
  const commentRef = collection(db, 'photos', id, 'comments');
  const result = query(commentRef, where('username', '!=', ''));
  const getResult = await getDocs(result);
  // returns length of comments in that photo
  return getResult.size;
}

// deletes the photo posted both from storage as well as firestore (including its other docs)
export async function deletePost(photoId) {
  await deleteDoc(doc(db, 'photos', photoId));
  const imageRef = ref(storage, `posts/${photoId}/image`);
  await deleteObject(imageRef).then(() => {
    console.log('Deleted');
  });
}

// fetch the active Users Latest Post to show it in the active users's feed alse
export async function activeUserLatestPost(userId, activeUserId) {
  const photoRef = collection(db, 'photos');
  const result = query(photoRef, where('userId', '==', activeUserId), orderBy('timestamp', 'desc'));
  // getting all posts which the active user has posted and arranging them in descending order so that the latest post is at the post
  const getResult = await getDocs(result);
  const activeUserPhotos = getResult.docs.map((photo) => ({
    ...photo.data(),
    id: photo.id
  }));
  // extract the latest post which is at index = 0
  const latestPhoto = activeUserPhotos[0];
  // checks if the logged in user already likes that post or not
  let userLikedPhoto = false;
  latestPhoto?.likes?.map((res) => {
    if (res === userId) {
      userLikedPhoto = true;
    }
  });
  return latestPhoto ? { ...latestPhoto, userLikedPhoto } : null;
}

// update the like count of the comment
export async function likeComment(photoId, commentId, userId, toggledLiked) {
  const commentRef = doc(db, 'photos', photoId, 'comments', commentId);
  await updateDoc(commentRef, {
    likes: toggledLiked ? arrayRemove(userId) : arrayUnion(userId)
  });
}

// checks if the logged in user already likes that comment or not
export async function isCommentLiked(photoId, commentId, userId) {
  const commentRef = doc(db, 'photos', photoId, 'comments', commentId);
  const getResult = await getDoc(commentRef);
  const comment = getResult.data().likes;
  if (comment.includes(userId)) return true;
  return false;
}

export async function getCommentLikedUsers(photoId, commentId) {
  const commentRef = doc(db, 'photos', photoId, 'comments', commentId);
  const getResult = await getDoc(commentRef);
  const likesUserIds = getResult.data().likes;
  // returns a data as promise
  const data = likesUserIds.map(async (userId) => {
    const user = await getUserByUserId(userId);
    return user;
  });
  // extracts the data from the promise
  const result = await Promise.all(data);
  return result;
}

// update the details of every post (if any) of the user who is updating his details
export async function updateUserPostDetails(username, edituserName, selectedFile) {
  const photosRef = collection(db, 'photos');
  const result = query(photosRef, where('username', '==', username));
  const getResult = await getDocs(result);
  getResult.forEach(async (res) => {
    const photoRef = doc(photosRef, res.id);
    const imageRef = ref(storage, `posts/${res.id}/user/image`);
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
        const downloadUrl = await getDownloadURL(imageRef);
        await updateDoc(photoRef, {
          username: edituserName ? edituserName : username,
          userImage: downloadUrl
        });
      });
    } else {
      await updateDoc(photoRef, {
        username: edituserName ? edituserName : username
      });
    }
  });
}

// update the details of every comment posted by the user who is updating his details
export async function updateUserCommentsDetails(username, edituserName, selectedFile) {
  const photosRef = collection(db, 'photos');
  const result = query(photosRef, where('username', '!=', ''));
  const getResult = await getDocs(result);
  getResult.forEach(async (res) => {
    const commentsRef = collection(photosRef, res.id, 'comments');
    const response = query(commentsRef, where('username', '==', username));
    const getResponse = await getDocs(response);
    getResponse.forEach(async (resp) => {
      console.log('changing');
      const commentRef = doc(commentsRef, resp.id);
      const commRef = ref(storage, `posts/${res.id}/comments/${resp.id}/user/image`);
      if (selectedFile) {
        await uploadString(commRef, selectedFile, 'data_url').then(async () => {
          const downloadUrl = await getDownloadURL(commRef);
          await updateDoc(commentRef, {
            username: edituserName ? edituserName : username,
            userImage: downloadUrl
          });
        });
      } else {
        await updateDoc(commentRef, {
          username: edituserName ? edituserName : username
        });
        console.log('changed');
      }
    });
  });
}

// fetch all existing users in the entire server
export async function getAllUsers() {
  const usersRef = collection(db, 'users');
  const getResult = await getDocs(usersRef);
  const users = getResult.docs.map((user) => ({
    ...user.data(),
    id: user.id
  }));
  return users;
}

// get the particular Photo details which is requested to be seen by the user
export async function getPhoto(photoId, userId) {
  const photoRef = doc(db, 'photos', photoId);
  const result = await getDoc(photoRef);
  let userLikedPhoto = false;
  result.data().likes?.map((res) => {
    if (res === userId) {
      userLikedPhoto = true;
    }
  });
  return { ...result.data(), userLikedPhoto };
}

// create a message database with all the users beforehand whom the user is following
export async function createUserMessage(activeUserId, followingUserId) {
  const messageRef = collection(db, 'messages');
  // fetch all chat docs from the collection where active user's id is present
  const activeUserMessageQuery = query(messageRef, where('users', 'array-contains', activeUserId));
  const result = await getDocs(activeUserMessageQuery);
  // returns true if the chat doc already exists with the user to be added else false
  const chatAlreadyExists = (followingUserId) =>
    !!result?.docs.find(
      (chat) => chat.data().users.find((user) => user === followingUserId)?.length > 0
    );
  //if chat doesn't exists then add it to the database
  if (!chatAlreadyExists(followingUserId)) {
    await addDoc(messageRef, {
      users: [activeUserId, followingUserId]
    });
  }
  let messageId = '';
  result.docs.map((chat) => {
    if (chat.data().users.includes(followingUserId)) {
      messageId = chat.id;
    }
  });
  return { messageId, followingUserId };
}

// to get the chats between the users whose message id is passed
export function getChats(messageId) {
  const chatRef = collection(db, 'messages', messageId, 'chats');
  return query(chatRef, orderBy('sentAt', 'asc'));
}

// to add a text-chat sent by the user(s)
export async function addChat(messageId, username, image, id, message) {
  const userRef = doc(db, 'users', id);
  await updateDoc(userRef, {
    lastSeen: serverTimestamp()
  });
  const messageRef = doc(db, 'messages', messageId);
  const chatRef = collection(messageRef, 'chats');
  await addDoc(chatRef, {
    message: message,
    sender: username,
    image: image,
    sentAt: serverTimestamp(),
    isImage: false,
    isVideo: false,
    isAudio: false
  });
  await updateDoc(messageRef, {
    lastMessage: message
  });
}

// get user from the firestore with the username (for realtime snapshot)
export function getUserLastSeen(username) {
  const usersRef = collection(db, 'users');
  return query(usersRef, where('username', '==', username));
}

// export async function updateUserStatus(id, status) {
//   const usersRef = collection(db, "users");
//   const result = query(usersRef, where("userId", "==", id));
//   const getResult = await getDocs(result);
//   const userId = getResult.docs[0].id;
//   const userRef = doc(usersRef, userId);
//   await updateDoc(userRef, {
//     isActive: status,
//   });
// }

export function getLastMessage(activeUserId) {
  const messageRef = collection(db, 'messages');
  // fetch all chat docs from the collection where active user's id is present
  return query(messageRef, where('users', 'array-contains', activeUserId));
}

// to add a media(image or video) file sent by the user(s)
// here we push the download url as the message so that we can conditionally render it in the component based on its type : image or video or text (neither image nor video)
export async function sendMedia(messageId, username, image, id, isImage, selectedFile, videoFile) {
  const userRef = doc(db, 'users', id);
  // update the activeUser's last seen
  await updateDoc(userRef, {
    lastSeen: serverTimestamp()
  });
  const mediaType = isImage ? 'image' : 'video';
  const messageRef = doc(db, 'messages', messageId);
  const chatsRef = collection(messageRef, 'chats');
  const mediaRef = ref(storage, `messages/${messageId}/chats/${id}/${Date.now()}/${mediaType}`);
  // upload image file to storage and then push the url to firestore
  if (isImage) {
    await uploadString(mediaRef, selectedFile, 'data_url').then(async () => {
      const downloadUrl = await getDownloadURL(mediaRef);
      await addDoc(chatsRef, {
        message: downloadUrl,
        sender: username,
        image: image,
        sentAt: serverTimestamp(),
        isImage: isImage,
        isVideo: !isImage,
        isAudio: false
      });
    });
  }
  // upload video file to storage and then push the url to firestore
  else {
    const uploadTask = uploadBytesResumable(mediaRef, videoFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
          await addDoc(chatsRef, {
            message: downloadUrl,
            sender: username,
            image: image,
            sentAt: serverTimestamp(),
            isImage: isImage,
            isVideo: !isImage,
            isAudio: false
          });
        });
      }
    );
  }
  await updateDoc(messageRef, {
    lastMessage: isImage ? '📸Image' : '📹Video'
  });
}

export async function sendAudio(messageId, username, image, id, selectedFile) {
  const userRef = doc(db, 'users', id);
  // update the activeUser's last seen
  await updateDoc(userRef, {
    lastSeen: serverTimestamp()
  });
  const messageRef = doc(db, 'messages', messageId);
  const chatsRef = collection(messageRef, 'chats');
  const audioRef = ref(storage, `messages/${messageId}/chats/${id}/${Date.now()}/audio`);
  // upload audio file to storage and then push the url to firestore
  await uploadString(audioRef, selectedFile, 'data_url').then(async () => {
    const downloadUrl = await getDownloadURL(audioRef);
    await addDoc(chatsRef, {
      message: downloadUrl,
      sender: username,
      image: image,
      sentAt: serverTimestamp(),
      isImage: false,
      isVideo: false,
      isAudio: true,
      audioId: username + Date.now()
    });
  });

  await updateDoc(messageRef, {
    lastMessage: '🎙️Audio'
  });
}
