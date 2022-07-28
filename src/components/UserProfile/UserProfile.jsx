import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { getPhotosByUsername } from '../../services/firebase';
import Photos from './Photos';

function UserProfile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
    followingCount: 0
  };
  const [{ profile, photosCollection, followerCount, followingCount }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getPhotosByUsername(user.username);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
        followingCount: user.following.length
      });
    }
    getProfileInfoAndPhotos();
  }, [user, user.username]);

  return (
    <div>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        followingCount={followingCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </div>
  );
}

export default UserProfile;

UserProfile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired
  })
};
