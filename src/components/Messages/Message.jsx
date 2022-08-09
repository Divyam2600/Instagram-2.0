import React, { useEffect, useState } from 'react';
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';
import { getFirestore, onSnapshot } from 'firebase/firestore';
import { firebaseApp } from '../../lib/firebase';
import { getChats } from '../../services/firebase';
import useUser from '../../hooks/use-user';
import PropTypes from 'prop-types';
import moment from 'moment';

function Message({ messageId, messageRef }) {
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
  const isDifferentDay = (messageIndex) => {
    if (messageIndex === 0) return true;
    const day1 = chats[messageIndex - 1]?.data().sentAt?.toDate();
    const day2 = chats[messageIndex]?.data().sentAt?.toDate();
    return (
      day1.getFullYear() != day2?.getFullYear() ||
      day1.getMonth() != day2?.getMonth() ||
      day1.getDate() != day2?.getDate()
    );
  };
  if (messageRef.current) {
    messageRef.current.scrollTo({ top: messageRef.current.scrollHeight });
  }
  return (
    chats.length > 0 &&
    chats?.map((chat, i) => (
      <div key={i} className="">
        {isDifferentDay(i) && (
          <div
            className="sticky top-0 z-10 my-2 mx-auto max-w-fit rounded-lg bg-gray-300 py-1 px-4 text-center text-sm text-black"
            key={i}
          >
            {moment(chats[i]?.data().sentAt?.toDate()).calendar({
              sameDay: '[Today]',
              nextDay: '[Tomorrow]',
              nextWeek: 'MMMM D, YYYY',
              lastDay: '[Yesterday]',
              lastWeek: 'MMMM D, YYYY',
              sameElse: 'MMMM D, YYYY'
            })}
          </div>
        )}
        {chat.data().sender === username ? (
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
        )}
      </div>
    ))
  );
}

export default Message;

Message.propType = {
  messageId: PropTypes.string.isRequired
};
