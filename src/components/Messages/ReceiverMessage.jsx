import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function ReceiverMessage({ message, image, username, sentAt, isImage, isVideo }) {
  return (
    <>
      <p className="message-time ml-11">{moment(sentAt?.toDate()).format('LT')}</p>
      <div className="message-container">
        <img src={image} alt="" className="h-6 w-6 self-end rounded-full object-cover" />
        <span className="absolute top-0 left-[26px] h-0 w-0 border-8 border-purple-600 border-x-transparent border-b-transparent" />
        <div
          className={`message bg-purple-600 text-white ${
            (isImage || isVideo) && 'aspect-auto max-w-[50%] rounded-md px-1 lg:max-w-[35%]'
          }`}
        >
          {!isImage && !isVideo && message}
          {isImage && (
            <img src={message} alt={`Sent By ${username}`} className="rounded-md object-cover" />
          )}
          {isVideo && (
            <video
              src={message}
              autoPlay={true}
              loop={true}
              alt={`Sent By ${username}`}
              className="rounded-md object-cover"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ReceiverMessage;

ReceiverMessage.propType = {
  message: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  sentAt: PropTypes.object.isRequired,
  isImage: PropTypes.bool.isRequired,
  isVideo: PropTypes.bool.isRequired
};
