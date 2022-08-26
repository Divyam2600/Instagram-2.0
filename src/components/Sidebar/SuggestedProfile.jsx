import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { updateFollowedUserFollowers, updateLoggedInUserFollowing } from '../../services/firebase';

function SuggestedProfile({
  profileDocId,
  loggedInUserDocId,
  username,
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
  return !followed ? (
    <div className="mt-3 flex items-center justify-between">
      <img
        src={userImage}
        alt={username}
        className="aspect-square h-12 w-12 cursor-pointer rounded-full border-2 border-gray-300 object-cover p-[2px]"
      />
      <Link to={`/profile/${username}`} className="ml-4 mr-2 flex-1">
        <h2 className="cursor-pointer text-sm font-semibold">{username}</h2>
        <h3 className="truncate text-xs text-gray-400">New To Instagram</h3>
      </Link>
      <button className="mb-4 text-xs font-semibold text-blue-500" onClick={handleFollowUser}>
        Follow
      </button>
    </div>
  ) : null;
}

export default SuggestedProfile;

SuggestedProfile.propType = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  loggedInUserId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired
};
