import React, { useEffect, useState } from 'react';
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';
import { getFirestore, onSnapshot } from 'firebase/firestore';
import { firebaseApp } from '../../lib/firebase';
import { getChats } from '../../services/firebase';
import useUser from '../../hooks/use-user';
import PropTypes from 'prop-types';

function Message({ messageId }) {
  const [chats, setChats] = useState([]);
  const db = getFirestore(firebaseApp);
  const {
    user: { username }
  } = useUser();
  useEffect(() => {
    async function showChats() {
      onSnapshot(getChats(messageId), (snapshot) => {
        setChats(snapshot.docs);
      });
    }
    showChats();
  }, [db, messageId]);
  return (
    chats.length > 0 &&
    chats?.map((chat) =>
      chat.data().sender === username ? (
        <SenderMessage key={chat.id} message={chat.data().message} sentAt={chat.data().sentAt} />
      ) : (
        <ReceiverMessage
          key={chat.id}
          message={chat.data().message}
          image={chat.data().image}
          username={chat.data().sender}
          sentAt={chat.data().sentAt}
        />
      )
    )
  );
}

export default Message;

Message.propType = {
  messageId: PropTypes.string.isRequired
};
