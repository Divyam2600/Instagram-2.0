import React from "react";
import PropTypes from "prop-types";
import Photo from "./Photo";

function Photos({ photos }) {
  return photos.length > 0 ? (
    <div className="image-grid">
      {photos.map((photo) => (
        <div key={photo.id} className="image-wrap group">
          <Photo
            image={photo.imageSrc}
            photoId={photo.id}
            likes={photo.likes.length}
          />
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center text-3xl my-4">No Posts Yet...</div>
  );
}

export default Photos;

Photos.propTypes = {
  photos: PropTypes.array.isRequired,
};
