import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function SenderMessage({ message, sentAt }) {
  return (
    <>
      <p className="message-time mr-3 self-end">{moment(sentAt?.toDate()).format('LT')}</p>
      <div className="message-container justify-end self-end ">
        <span className="absolute right-[2px] top-0 h-0 w-0 border-8 border-[#edeef1] border-x-transparent border-b-transparent" />
        <div className="message bg-gray-200 bg-opacity-70">{message}</div>
      </div>
    </>
  );
}

export default SenderMessage;

SenderMessage.propType = {
  message: PropTypes.string.isRequired,
  sentAt: PropTypes.object.isRequired
};
