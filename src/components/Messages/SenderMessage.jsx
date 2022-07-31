import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function SenderMessage({ message, sentAt }) {
  return (
    <div className="message-container justify-end self-end">
      <p className="message-time">{moment(sentAt?.toDate()).format('LT')}</p>
      <div className="message bg-[#efefef]">{message}</div>
    </div>
  );
}

export default SenderMessage;

SenderMessage.propType = {
  message: PropTypes.string.isRequired,
  sentAt: PropTypes.object.isRequired
};
