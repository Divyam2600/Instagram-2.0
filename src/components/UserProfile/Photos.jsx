import React from 'react';
import PropTypes from 'prop-types';
import Photo from './Photo';

function Photos({ photos }) {
  return photos.length > 0 ? (
    <div className="grid h-0 grid-cols-3 justify-center gap-1 ">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="group relative h-0 w-auto cursor-pointer overflow-hidden py-[75%] px-0 pt-0"
        >
          <Photo image={photo.imageSrc} photoId={photo.id} likes={photo.likes.length} />
        </div>
      ))}
    </div>
  ) : (
    <div className="my-4 text-center text-3xl">No Posts Yet...</div>
  );
}

export default Photos;

Photos.propTypes = {
  photos: PropTypes.array.isRequired
};
