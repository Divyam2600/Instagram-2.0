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
        <SenderMessage
          key={chat.id}
          message={chat.data().message}
          image={chat.data().image}
          username={chat.data().sender}
          sentAt={chat.data().sentAt}
          isImage={chat.data().isImage}
          isVideo={chat.data().isVideo}
          isAudio={chat.data().isAudio}
          audioId={chat.data().audioId}
        />
      ) : (
        <ReceiverMessage
          key={chat.id}
          message={chat.data().message}
          image={chat.data().image}
          username={chat.data().sender}
          sentAt={chat.data().sentAt}
          isImage={chat.data().isImage}
          isVideo={chat.data().isVideo}
          isAudio={chat.data().isAudio}
          audioId={chat.data().audioId}
        />
      )
    )
  );
}

export default Message;

Message.propType = {
  messageId: PropTypes.string.isRequired
};
