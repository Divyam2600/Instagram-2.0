import {
  deleteObject,
  getMetadata,
  getStorage,
  listAll,
  uploadBytesResumable,
} from "firebase/storage";
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
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../lib/firebase";
import {
  UploadFile,
  Messages,
  MessageStatus,
  MessageType,
  Post,
  User,
} from "../../typings";
import { uuid } from "uuidv4";

export const doesUsernameExist = async (username: string) => {
  const usersRef = collection(db, "users");
  const result = query(usersRef, where("username", "==", username));
  const getResult = await getDocs(result);
  const returnResult = getResult.docs.map((user) => user.data().length > 0);
  return returnResult;
};

export const getUserByUsername = async (username: string | undefined) => {
  const usersRef = collection(db, "users");
  const result = query(usersRef, where("username", "==", username));
  const getResult = await getDocs(result);
  const userResult = getResult.docs.map((user) => ({
    ...user.data(),
    id: user.id,
  }));
  return userResult[0];
};

export const getUserByUserId = async (userId: string | undefined) => {
  const usersRef = collection(db, "users");
  const result = query(usersRef, where("userId", "==", userId));
  const getResult = await getDocs(result);
  const userResult = getResult.docs?.map((user) => ({
    ...user.data(),
    id: user.id,
  }));
  return userResult[0];
};

// fetch the posts of the users whom the active user is following
export const getPosts = async (following: string[]) => {
  const postsRef = collection(db, "posts");
  const result = query(postsRef, where("userId", "in", following));
  const getResult = await getDocs(result);
  const userFollowedPosts = getResult.docs.map((post) => ({
    ...post.data(),
    id: post.id,
  }));
  return userFollowedPosts;
};

export const activeUserLatestPost = async (activeUserId: string) => {
  const postsRef = collection(db, "posts");
  const result = query(
    postsRef,
    where("userId", "==", activeUserId),
    orderBy("postedAt", "desc")
  );
  // getting all posts which the active user has posted and arranging them in descending order so that the latest post is at the post
  const getResult = await getDocs(result);
  const activeUserPosts = getResult.docs.map((post) => ({
    ...post.data(),
    id: post.id,
  }));
  return activeUserPosts[0];
};

export const updateLikes = async (
  id: string | undefined,
  userId: string | undefined,
  toggledLiked: boolean
) => {
  const postsRef = doc(db, "posts", id!);
  await updateDoc(postsRef, {
    likes: toggledLiked ? arrayRemove(userId) : arrayUnion(userId),
  });
};

export const displayComment = (id: string | undefined) => {
  const commentsRef = collection(db, "posts", id!, "comments");
  return query(commentsRef, orderBy("postedAt", "desc"));
};

export const addComment = async (
  id: string | undefined,
  commentToSend: string | undefined,
  activeUserUserId: string | undefined
) => {
  const commentsRef = collection(db, "posts", id!, "comments");
  await addDoc(commentsRef, {
    comment: commentToSend,
    userId: activeUserUserId,
    likes: [],
    postedAt: serverTimestamp(),
  });
};

export const likeComment = async (
  postId: string | undefined,
  commentId: string | undefined,
  userId: string | undefined,
  toggledLiked: boolean
) => {
  const commentRef = doc(db, "posts", postId!, "comments", commentId!);
  await updateDoc(commentRef, {
    likes: toggledLiked ? arrayRemove(userId) : arrayUnion(userId),
  });
};

export const getSuggestedProfiles = async (
  activeUserId: string | undefined,
  following: string[] | undefined
) => {
  const usersRef = collection(db, "users");
  const result = query(usersRef, limit(10));
  const getResult = await getDocs(result);
  const userResult = getResult.docs
    .map((user) => ({
      ...user.data(),
      id: user.id,
    }))
    .filter(
      (profile: User) =>
        profile.userId !== activeUserId && !following?.includes(profile.userId!)
    );
  return userResult;
};

export const updateActiveUserFollowing = async (
  activeUserDocId: string | undefined,
  profileId: string | undefined,
  isFollowingProfile: boolean
) => {
  const usersRef = doc(db, "users", activeUserDocId!);
  await updateDoc(usersRef, {
    following: isFollowingProfile
      ? arrayRemove(profileId)
      : arrayUnion(profileId),
  });
};

export const updateFollowedUserFollowers = async (
  profileDocId: string | undefined,
  activeUserDocId: string | undefined,
  isFollowingProfile: boolean
) => {
  const usersRef = doc(db, "users", profileDocId!);
  await updateDoc(usersRef, {
    followers: isFollowingProfile
      ? arrayRemove(activeUserDocId)
      : arrayUnion(activeUserDocId),
  });
};

export const getLikedUsers = async (id: string | undefined) => {
  const postsRef = doc(db, "posts", id!);
  const getResult = await getDoc(postsRef);
  const likesUserIds = getResult.data()?.likes;
  const data = likesUserIds.map(async (userId: string) => {
    const user: User = await getUserByUserId(userId);
    return user;
  });
  const result: User[] = await Promise.all(data);
  return result;
};

export const getCommentLikedUsers = async (
  postId: string | undefined,
  commentId: string | undefined
) => {
  const commentRef = doc(db, "posts", postId!, "comments", commentId!);
  const getResult = await getDoc(commentRef);
  const likesUserIds = getResult.data()?.likes;
  const data = likesUserIds.map(async (userId: string) => {
    const user: User = await getUserByUserId(userId);
    return user;
  });
  const result: User[] = await Promise.all(data);
  return result;
};

export const addPostsToFirestore = async (
  userId: string | undefined,
  caption: string,
  selectedFiles: UploadFile[]
) => {
  const postsRef = await addDoc(collection(db, "posts"), {
    caption: caption,
    likes: [],
    userId: userId,
    postedAt: serverTimestamp(),
  });
  for (let i = 0; i < selectedFiles.length; i++) {
    const uploadRef = ref(
      storage,
      `posts/${postsRef.id}/${"file - " + uuid()}`
    );
    await uploadString(uploadRef, selectedFiles[i].dataURL!, "data_url").then(
      async () => {
        const downloadUrl = await getDownloadURL(uploadRef);
        const metadata = await getMetadata(uploadRef);
        const postRef = doc(db, "posts", postsRef.id);
        await updateDoc(postRef, {
          files: arrayUnion({
            url: downloadUrl,
            type: metadata.contentType,
          }),
        });
      }
    );
  }
};

export const delPost = async (postId: string | undefined) => {
  await deleteDoc(doc(db, "posts", postId!));
  const postRef = ref(storage, `posts/${postId}`);
  listAll(postRef).then((res) => {
    res.items.forEach(async (item) => {
      const imageRef = ref(storage, `posts/${postId}/${item.name}`);
      await deleteObject(imageRef).then(() => {
        console.log("Deleted");
      });
    });
  });
};

export const getAllUsers = async () => {
  const usersRef = collection(db, "users");
  const getResult = await getDocs(usersRef);
  const users = getResult.docs.map((user) => ({
    ...user.data(),
    id: user.id,
  }));
  return users;
};

export const getPostsByUserId = async (userId: string | undefined) => {
  const postRef = collection(db, "posts");
  const result = query(
    postRef,
    where("userId", "==", userId),
    orderBy("postedAt", "desc")
  );
  const getResult = await getDocs(result);
  const posts = getResult.docs.map((post) => ({
    ...post.data(),
    id: post.id,
  }));
  return posts;
};

export const isUserFollowingProfile = async (
  activeUserUsername: string | undefined,
  profileUserUserId: string | undefined
) => {
  const userRef = collection(db, "users");
  const result = query(
    userRef,
    where("username", "==", activeUserUsername),
    where("following", "array-contains", profileUserUserId)
  );
  const getResult = await getDocs(result);
  const response: User[] = getResult.docs.map((res) => ({
    ...res.data(),
    id: res.id,
  }));
  return response[0]?.userId;
};

export const toggleFollow = async (
  isFollowingProfile: boolean,
  activeUserDocId: string | undefined,
  profileDocId: string | undefined,
  profileUserUserId: string | undefined,
  activeUserUserId: string | undefined
) => {
  await updateActiveUserFollowing(
    activeUserDocId,
    profileUserUserId,
    isFollowingProfile
  );
  await updateFollowedUserFollowers(
    profileDocId,
    activeUserUserId,
    isFollowingProfile
  );
};

export const getFollowers = async (id: string | undefined) => {
  const usersRef = doc(db, "users", id!);
  const getResult = await getDoc(usersRef);
  const followersId: string[] = getResult.data()!.followers;
  const data: Promise<User>[] = followersId.map(async (userId) => {
    const user: User = await getUserByUserId(userId);
    return user;
  });
  const result = await Promise.all(data);
  return result;
};

// fetch the following of the profile user
export const getFollowing = async (id: string | undefined) => {
  const usersRef = doc(db, "users", id!);
  const getResult = await getDoc(usersRef);
  const followingUsersId: string[] = getResult.data()!.following;
  const data: Promise<User>[] = followingUsersId.map(async (userId) => {
    const user: User = await getUserByUserId(userId);
    return user;
  });
  const result = await Promise.all(data);
  return result;
};

export const getCommentsLength = async (id: string | undefined) => {
  const commentRef = collection(db, "posts", id!, "comments");
  const getResult = await getDocs(commentRef);
  return getResult.size;
};

export const getPostById = async (postId: string | undefined) => {
  const postRef = doc(db, "posts", postId!);
  const getResult = await getDoc(postRef);
  const result: Post = { ...getResult.data(), id: getResult.id };
  return result;
};

export const updatedSavedPosts = async (
  postId: string | undefined,
  activeUserDocId: string | undefined,
  toggleSaved: boolean
) => {
  const userRef = doc(db, "users", activeUserDocId!);
  await updateDoc(userRef, {
    savedPosts: toggleSaved ? arrayRemove(postId) : arrayUnion(postId),
  });
};

export const isPostSaved = async (
  postId: string | undefined,
  activeUserDocId: string | undefined
) => {
  const userRef = doc(db, "users", activeUserDocId!);
  const getResult = await getDoc(userRef);
  const result: User = { ...getResult.data(), id: getResult.id };
  return result.savedPosts?.includes(postId!);
};

export const savedCollection = async (id: string | undefined) => {
  const userRef = doc(db, "users", id!);
  const getResult = await getDoc(userRef);
  const result: User = { ...getResult.data(), id: getResult.id };
  const posts: Post[] = result.savedPosts
    ? await Promise.all(
        result.savedPosts?.map(async (postId) => {
          const post: Post = await getPostById(postId);
          return post;
        })
      )
    : [];
  return posts;
};

export const createUserMessage = async (
  activeUserUserId: string | undefined,
  userId: string | undefined
) => {
  const messagesRef = collection(db, "messages");
  const getResult = await getUserChats(activeUserUserId);
  const doesChatExists = !!getResult.find(
    (chat) => chat.users?.find((id) => id === userId)?.length! > 0
  );
  userId &&
    !doesChatExists &&
    (await addDoc(messagesRef, {
      users: [activeUserUserId, userId],
    }));
};

export const getChatId = async (
  activeUserUserId: string | undefined,
  userId: string | undefined
) => {
  const getResult = await getUserChats(activeUserUserId);
  const chatId = getResult
    .map((chat) => chat.users?.includes(userId!) && chat.id)
    .filter((id) => id !== undefined)[0];
  return chatId;
};

export const getUserChats = async (activeUserUserId: string | undefined) => {
  const query = activeUserMessageQuery(activeUserUserId);
  const getResult = await getDocs(query);
  const result: Messages[] = getResult.docs.map((chat) => ({
    ...chat.data(),
    id: chat.id,
  }));
  return result;
};

export const activeUserMessageQuery = (
  activeUserUserId: string | undefined
) => {
  const messagesRef = collection(db, "messages");
  const messageQuery = query(
    messagesRef,
    where("users", "array-contains", activeUserUserId)
  );
  return messageQuery;
};

export const getOtherChatUser = async (
  messageId: string | undefined,
  activeUserUserId: string | undefined
) => {
  const messagesRef = doc(db, "messages", messageId!);
  const getResult = await getDoc(messagesRef);
  const userId: string = getResult
    .data()!
    .users.filter((id: string) => id !== activeUserUserId)[0];
  const result = await getUserByUserId(userId);
  return result;
};

export const getChats = (messageId: string | undefined) => {
  const chatRef = collection(db, "messages", messageId!, "chats");
  return query(chatRef, orderBy("sentAt", "asc"));
};

export const getUserLastSeen = (username: string | undefined) => {
  const usersRef = collection(db, "users");
  return query(usersRef, where("username", "==", username));
};

export const addChat = async (
  message: string,
  messageType: MessageType,
  status: MessageStatus,
  userId: string | undefined,
  messageId: string | undefined,
  lastMessage?: string
) => {
  const messageRef = doc(db, "messages", messageId!);
  const chatRef = collection(messageRef, "chats");
  await addDoc(chatRef, {
    message: message,
    sentAt: serverTimestamp(),
    type: messageType,
    status: status,
    sentBy: userId,
  });
  await updateDoc(messageRef, {
    lastMessage: {
      message: lastMessage ? lastMessage : message,
      sentAt: serverTimestamp(),
    },
  });
};

export const sendMediaChat = async (
  selectedFiles: UploadFile[],
  messageId: string,
  activeUserUserId: string | undefined,
  type?: MessageType
) => {
  for (let i = 0; i < selectedFiles.length; i++) {
    const uploadRef = ref(
      storage,
      `messages/${messageId}/${"file - " + uuid()}`
    );
    await uploadString(uploadRef, selectedFiles[i].dataURL!, "data_url").then(
      async () => {
        const downloadUrl = await getDownloadURL(uploadRef);
        const metadata = await getMetadata(uploadRef);
        await addChat(
          type !== "file"
            ? downloadUrl
            : JSON.stringify({
                downloadUrl: downloadUrl,
                name: selectedFiles[i].file?.name,
              }),
          !type
            ? metadata.contentType?.match(/^image\//)
              ? "image"
              : metadata.contentType?.match(/^audio\//)
              ? "audio"
              : "video"
            : type,
          "delivered",
          activeUserUserId,
          messageId,
          type !== "file"
            ? metadata.contentType?.match(/^image\//)
              ? "📸 Image"
              : metadata.contentType?.match(/^audio\//)
              ? "🎙️ Audio"
              : "🎥 Video"
            : "📎File"
        );
      }
    );
  }
};
