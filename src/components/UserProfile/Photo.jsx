import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { HeartIcon, ChatIcon } from "@heroicons/react/solid";
import { getCommentsLength } from "../../services/firebase";

function Photo({ image, photoId, likes }) {
  const [comments, setComments] = useState(0);
  useEffect(() => {
    const commentsLength = async () => {
      const length = await getCommentsLength(photoId);
      setComments(length);
    };
    if (photoId) commentsLength();
  }, [photoId]);

  //   const comments =  getCommentsLength(id)
  return (
    <>
      <img src={image} alt="" className="image" />
      <div className="absolute inset-0 z-10 hidden min-h-full min-w-full items-center justify-evenly group-hover:flex group-hover:bg-black group-hover:bg-opacity-70">
        <p className="flex items-center font-bold text-white">
          <HeartIcon className="mr-1 h-5 w-5" />
          {likes}
        </p>
        <p className="flex items-center font-bold text-white">
          <ChatIcon className="mr-1 h-5 w-5" />
          {comments}
        </p>
      </div>
    </>
  );
}

export default Photo;

Photo.propTypes = {
  image: PropTypes.string.isRequired,
  photoId: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
};
