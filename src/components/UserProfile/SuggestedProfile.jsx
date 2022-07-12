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
  fullName,
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
  }
  return (
    !followed && (
      <div className="border flex w-44 flex-col p-4 items-center space-y-2 rounded-lg bg-gray-100 bg-opacity-30">
        <img
          src={userImage}
          alt={`${username}`}
          className="rounded-full cursor-pointer h-20 w-20 border"
        />
        <Link to={`/profile/${username}`} className="text-center">
          <h2 className="font-semibold cursor-pointer -mt-1">{username}</h2>
          <h3 className="text-gray-400 text-sm truncate mb-2">{fullName}</h3>
        </Link>
        <button
          className="text-md font-semibold text-white border rounded-md w-28 py-1 bg-sky-400 hover:bg-sky-500"
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
  loggedInUserDocId: PropTypes.string.isRequired,
};
