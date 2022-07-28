import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Captions({ caption, username }) {
  return (
    <p className="truncate p-4 pt-2">
      <Link to={`/profile/${username}`}>
        <span className="pr-3 font-bold text-gray-800">{username}</span>
      </Link>
      {caption}
    </p>
  );
}

export default Captions;

Captions.propType = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};
