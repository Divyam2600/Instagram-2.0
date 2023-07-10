import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { db } from "../../lib/firebase";
import { activeUserMessageQuery } from "../../services/firebase";
import useUser from "../../hooks/use-user";
import { onSnapshot, QuerySnapshot } from "firebase/firestore";
import {
  LastMessage as LastMessageType,
  Messages,
  User,
} from "../../../typings";
import ReactTimeAgo from "react-time-ago";
import { UserChatLoader } from "../Loader";

type Props = {
  messageId?: string;
} & User;

const Profile = ({ userId, imageUrl, username, messageId }: Props) => {
  const router = useRouter();
  const [lastMessage, setLastMessage] = useState<LastMessageType>();
  const activeUser = useUser();
  useEffect(() => {
    const showLastMessage = async () => {
      onSnapshot(
        activeUserMessageQuery(activeUser?.userId),
        (snapshot: QuerySnapshot<Messages>) => {
          snapshot.docs?.map((res) => {
            res?.data()?.users?.includes(userId!) &&
              setLastMessage(res.data().lastMessage);
          });
        }
      );
    };
    activeUser?.userId && showLastMessage();
  }, [db, activeUser?.userId, userId]);
  return imageUrl && username ? (
    <div
      onClick={() => router.push(`/direct/${messageId}`)}
      className="flex w-full cursor-pointer items-center space-x-2 py-1.5 px-4 hover:bg-gray-100"
    >
      <div className="h-14 w-14 rounded-full border-2 border-gray-300 p-px">
        <Image
          src={imageUrl}
          height={56}
          width={56}
          alt={username}
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          <h1 className="flex-1 font-semibold">{username}</h1>
          <span className="rounded-full bg-blue-400 py-0.5 px-2 text-xs font-semibold tracking-wider text-gray-100">
            12
          </span>
        </div>
        {lastMessage?.sentAt && (
          <div className="flex items-center space-x-1 text-xs text-gray-500 ">
            <p className="flex-1 line-clamp-1">{lastMessage.message}</p>
            &nbsp;•
            <ReactTimeAgo
              date={lastMessage.sentAt.toDate()}
              locale="en-US"
              timeStyle="mini"
            />
          </div>
        )}
      </div>
    </div>
  ) : (
    <UserChatLoader />
  );
};

export default Profile;
