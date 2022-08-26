import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MiniProfileLoader } from './Loader';

function MiniProfile({ username, fullName, image }) {
  return !username || !fullName ? (
    <MiniProfileLoader />
  ) : (
    <Link to={`/profile/${username}`} className="my-2 ml-4 flex items-center justify-between">
      <img
        src={image}
        alt={username}
        className="aspect-square h-14 w-14 cursor-pointer rounded-full border-2 border-gray-300 object-cover p-[2px] text-center"
      />
      <div className="mx-4 flex-1 text-sm">
        <h2 className="cursor-pointer font-semibold text-gray-700">{username}</h2>
        <h3 className=" text-gray-400">{fullName}</h3>
      </div>
    </Link>
  );
}
export default MiniProfile;

MiniProfile.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
  image: PropTypes.string
};
