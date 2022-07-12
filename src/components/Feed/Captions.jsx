import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Captions({ caption, username }) {
  return (
    <p className="p-4 truncate pt-2">
      <Link to={`/profile/${username}`}>
        <span className="font-bold text-gray-800 pr-3">{username}</span>
      </Link>
      {caption}
    </p>
  );
}

export default Captions;

Captions.propType = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
