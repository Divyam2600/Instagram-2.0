import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MiniProfileLoader } from "./Loader";

function MiniProfile({ username, fullName, image }) {
  return !username || !fullName ? (
    <MiniProfileLoader />
  ) : (
    <Link
      to={`/profile/${username}`}
      className="flex items-center justify-between ml-4 my-2"
    >
      <img
        src={image}
        alt={username}
        className="h-14 w-14 rounded-full border-2 p-[2px] border-gray-300 cursor-pointer object-cover text-center"
      />
      <div className="flex-1 mx-4 text-sm">
        <h2 className="font-semibold text-gray-700 cursor-pointer">
          {username}
        </h2>
        <h3 className=" text-gray-400">{fullName}</h3>
      </div>
    </Link>
  );
}
export default MiniProfile;

MiniProfile.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
  image: PropTypes.string,
};
