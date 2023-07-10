import { db } from "../../../src/lib/firebase";
import {
  onSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import React, { RefObject, useEffect, useState } from "react";
import { Message } from "../../../typings";
import { getChats } from "../../services/firebase";
import moment from "moment";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";

type Props = {
  activeUserUserId?: string;
  messageId?: string;
  messageRef: RefObject<HTMLDivElement>;
};

const RenderMessage = ({ activeUserUserId, messageId, messageRef }: Props) => {
  const [messages, setMessages] = useState<QueryDocumentSnapshot<Message>[]>(
    []
  );
  useEffect(() => {
    const getAllChats = () => {
      onSnapshot(getChats(messageId), (snapshot: QuerySnapshot<Message>) =>
        setMessages(snapshot.docs)
      );
    };
    messageId && getAllChats();
  }, [messageId]);
  const isDifferentDay = (messageIndex: number) => {
    const day1 = messages[messageIndex - 1]?.data().sentAt?.toDate();
    const day2 = messages[messageIndex]?.data().sentAt?.toDate();
    return (
      day1?.getFullYear() != day2?.getFullYear() ||
      day1?.getMonth() != day2?.getMonth() ||
      day1?.getDate() != day2?.getDate()
    );
  };
  messageRef.current &&
    messageRef.current.scrollTo({
      top: messageRef.current.scrollHeight,
      behavior: "auto",
    });
  return (
    <div
      className="max-h-[80vh] flex-1 space-y-2 overflow-y-scroll p-2 scrollbar-thin scrollbar-thumb-gray-400"
      ref={messageRef}
    >
      {messages.length > 0
        ? messages.map((message, i) => (
            <div key={i} className="space-y-2">
              {isDifferentDay(i) && (
                <div
                  className="sticky top-0 z-10 mx-auto my-3 max-w-fit select-none rounded-lg bg-gray-300 px-4 py-1 text-center text-sm text-black shadow-md"
                  key={i}
                >
                  {moment(message?.data().sentAt?.toDate()).calendar({
                    sameDay: "[Today]",
                    nextDay: "[Tomorrow]",
                    lastDay: "[Yesterday]",
                    nextWeek: "MMM D, YYYY",
                    lastWeek: "MMM D, YYYY",
                    sameElse: "MMM D, YYYY",
                  })}
                </div>
              )}
              {message.data().sentBy === activeUserUserId ? (
                <SenderMessage
                  key={message.id}
                  message={message.data().message}
                  sentAt={message.data().sentAt}
                  type={message.data().type}
                  status={message.data().status}
                  sentBy={message.data().sentBy}
                  id={message.id}
                />
              ) : (
                <ReceiverMessage
                  key={message.id}
                  message={message.data().message}
                  sentAt={message.data().sentAt}
                  type={message.data().type}
                  status={message.data().status}
                  sentBy={message.data().sentBy}
                  id={message.id}
                />
              )}
            </div>
          ))
        : null}
    </div>
  );
};

export default RenderMessage;
