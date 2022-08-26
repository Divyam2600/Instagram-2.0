import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { updateFollowedUserFollowers, updateLoggedInUserFollowing } from '../../services/firebase';

function SuggestedProfile({
  profileDocId,
  loggedInUserDocId,
  username,
  fullName,
  userImage,
  profileId,
  loggedInUserId
}) {
  const [followed, setFollowed] = useState(false);
  async function handleFollowUser() {
    setFollowed(true);
    //update the following array of the logged in user
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    //update the followers array of the user who has been followed
    await updateFollowedUserFollowers(profileDocId, loggedInUserId, false);
  }
  return (
    !followed && (
      <div className="flex w-44 flex-col items-center space-y-2 rounded-lg border bg-gray-100 bg-opacity-30 p-4">
        <img
          src={userImage}
          alt={username}
          className="aspect-square h-20 w-20 cursor-pointer rounded-full border object-cover"
        />
        <Link to={`/profile/${username}`} className="text-center">
          <h2 className="-mt-1 cursor-pointer font-semibold">{username}</h2>
          <h3 className="mb-2 truncate text-sm text-gray-400">{fullName}</h3>
        </Link>
        <button
          className="text-md w-28 rounded-md border bg-sky-400 py-1 font-semibold text-white hover:bg-sky-500"
          onClick={handleFollowUser}
        >
          Follow
        </button>
      </div>
    )
  );
}

export default SuggestedProfile;

SuggestedProfile.propType = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  loggedInUserId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired
};
