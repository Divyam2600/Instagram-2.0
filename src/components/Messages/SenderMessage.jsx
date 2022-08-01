import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function SenderMessage({ message, sentAt }) {
  return (
    <>
      <p className="message-time mr-2 self-end">{moment(sentAt?.toDate()).format('LT')}</p>
      <div className="message-container justify-end self-end">
        <div className="message rounded-tr-none bg-gray-200 bg-opacity-70">{message}</div>
      </div>
    </>
  );
}

export default SenderMessage;

SenderMessage.propType = {
  message: PropTypes.string.isRequired,
  sentAt: PropTypes.object.isRequired
};
