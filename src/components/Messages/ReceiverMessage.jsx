import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function ReceiverMessage({ message, image, username, sentAt }) {
  return (
    <>
      <p className="message-time ml-11">{moment(sentAt?.toDate()).format('LT')}</p>
      <div className="message-container">
        <img src={image} alt="" className="h-6 w-6 self-end rounded-full object-cover" />
        <div className="message rounded-tl-none bg-purple-600 text-white">{message}</div>
      </div>
    </>
  );
}

export default ReceiverMessage;

ReceiverMessage.propType = {
  message: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  sentAt: PropTypes.object.isRequired
};
