import React from "react";
import PropTypes from "prop-types";

function Image({ src, caption }) {
  return (
    <div>
      <img src={src} alt={caption} className="object-contain" />
    </div>
  );
}

export default Image;

Image.propTypes = {
  src: PropTypes.string.isRequired,
};
