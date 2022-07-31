import {
  CameraIcon,
  MicrophoneIcon,
  PaperAirplaneIcon,
  PaperClipIcon
} from '@heroicons/react/outline';
import React, { useState } from 'react';
import useUser from '../../hooks/use-user';
import { addChat } from '../../services/firebase';
import PropTypes from 'prop-types';

function MessageInput({ messageId }) {
  const [message, setMessage] = useState('');
  const {
    user: { username, image, id }
  } = useUser();
  const sendMessage = async (event) => {
    event.preventDefault();
    const messageToSend = message;
    setMessage('');
    await addChat(messageId, username, image, id, messageToSend);
  };
  const increaseHeight = (event) => {
    event.target.style.height = '20px';
    event.target.style.height = event.target.scrollHeight + 'px';
  };
  return (
    <div className="z-100 sticky my-2 mx-auto flex w-[95%] items-center space-x-1 self-end rounded-3xl border p-1">
      <textarea
        placeholder="Enter your message..."
        className="m-0 h-5 max-h-24 max-w-full flex-1 resize-none overflow-auto border-r bg-transparent px-4 text-sm outline-none scrollbar-hide"
        onChange={(event) => setMessage(event.target.value)}
        autoComplete="off"
        value={message}
        onKeyUp={increaseHeight}
      />
      <PaperClipIcon className={`navButton h-5 w-5 ${message && 'w-0 scale-0'}`} />
      <MicrophoneIcon className={`navButton h-5 w-5 ${message && 'w-0 scale-0'}`} />
      <button type="submit" disabled={!message.trim()} onClick={sendMessage}>
        <PaperAirplaneIcon
          className={`navButton -mt-2 h-6 w-6 rotate-50 ${!message && 'w-0 scale-0'}`}
        />
      </button>
      <CameraIcon className="box-content h-7 w-7 cursor-pointer rounded-full bg-purple-700 fill-white p-[2px] text-purple-700 transition duration-200 ease-in-out hover:scale-110 active:scale-90" />
    </div>
  );
}

export default MessageInput;

MessageInput.propType = {
  messageId: PropTypes.string.isRequired
};
