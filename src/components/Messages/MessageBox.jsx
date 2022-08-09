import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { getChats, getUserByUserId } from '../../services/firebase';
import { Header } from './Header';
import MessageInput from './MessageInput';
import Message from './Message';

function MessageBox({ userId, messageId }) {
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  useEffect(() => {
    const userObject = async () => {
      const result = await getUserByUserId(userId);
      setUser(result[0]);
      const messages = getChats(messageId);
      setChats(messages);
    };
    userObject();
  }, [userId, messageId]);
  const messageRef = useRef(null);
  return (
    user && (
      <div className="flex h-full flex-col overflow-hidden">
        <Header username={user.username} image={user.image} />
        <div
          className="flex h-full flex-col overflow-y-scroll pt-2 scrollbar-hide"
          ref={messageRef}
        >
          <Message messageId={messageId} messageRef={messageRef} />
        </div>
        <MessageInput messageId={messageId} messageRef={messageRef} />
      </div>
    )
  );
}

export default MessageBox;

MessageBox.propType = {
  userId: PropTypes.string.isRequired,
  messageId: PropTypes.string.isRequired
};
