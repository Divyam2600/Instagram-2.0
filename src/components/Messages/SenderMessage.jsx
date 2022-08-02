import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function SenderMessage({ message, username, sentAt, isImage, isVideo }) {
  return (
    <>
      <p className="message-time mr-3 self-end">{moment(sentAt?.toDate()).format('LT')}</p>
      <div className="message-container justify-end self-end ">
        <span className="absolute right-[2px] top-0 h-0 w-0 border-8 border-[#edeef1] border-x-transparent border-b-transparent" />
        <div
          className={`message bg-gray-200 bg-opacity-70 ${
            (isImage || isVideo) &&
            'aspect-auto max-w-[50%] cursor-pointer rounded-md px-1 lg:max-w-[35%]'
          }`}
        >
          {!isImage && !isVideo && message}
          {isImage && (
            <img src={message} alt={`Sent By ${username}`} className="rounded-md object-cover" />
          )}
          {isVideo && message && (
            <video
              src={message}
              controls
              preload={true}
              autoPlay={true}
              loop={true}
              alt={`Sent By ${username}`}
              className="rounded-md object-cover"
              disablePictureInPicture={true}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default SenderMessage;

SenderMessage.propType = {
  message: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  sentAt: PropTypes.object.isRequired,
  isImage: PropTypes.bool.isRequired,
  isVideo: PropTypes.bool.isRequired
};
