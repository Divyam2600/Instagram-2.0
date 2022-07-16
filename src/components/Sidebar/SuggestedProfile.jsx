import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  updateFollowedUserFollowers,
  updateLoggedInUserFollowing,
} from "../../services/firebase";

function SuggestedProfile({
  profileDocId,
  loggedInUserDocId,
  username,
  userImage,
  profileId,
  loggedInUserId,
}) {
  const [followed, setFollowed] = useState(false);
  async function handleFollowUser() {
    setFollowed(true);
    //update the following array of the logged in user
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    //update the followers array of the user who has been followed
    await updateFollowedUserFollowers(profileDocId, loggedInUserId, false);
    setTimeout(() => {
      document.location.reload();
    }, 5000);
  }
  return !followed ? (
    <div className="flex items-center justify-between mt-3">
      <img
        src={userImage}
        alt={`${username}`}
        className="rounded-full cursor-pointer h-12 w-12 border-2 p-[2px] border-gray-300"
      />
      <Link to={`/profile/${username}`} className="flex-1 ml-4 mr-2">
        <h2 className="font-semibold text-sm cursor-pointer">{username}</h2>
        <h3 className="text-gray-400 text-xs truncate">New To Instagram</h3>
      </Link>
      <button
        className="text-blue-500 font-semibold text-xs mb-4"
        onClick={handleFollowUser}
      >
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
  loggedInUserDocId: PropTypes.string.isRequired,
};
