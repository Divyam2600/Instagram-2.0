import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Messages, User } from "../../../typings";
import useUser from "../../hooks/use-user";
import { getUserByUserId, getUserChats } from "../../services/firebase";
import Profile from "./Profile";

type Props = {
  messageId?: string;
} & User;

const MessageList = () => {
  const activeUser = useUser();
  const [users, setUsers] = useState<Props[]>([]);
  const [chats, setChats] = useState<Messages[]>([]);
  useEffect(() => {
    const getChats = async () => {
      const result = await getUserChats(activeUser?.userId);
      setChats(result);
    };
    activeUser?.userId && getChats();
  }, [activeUser?.userId]);
  useEffect(() => {
    const getUsers = async () => {
      chats.map(async (chat) => {
        const chatId = chat.id;
        const userId = chat.users?.filter((id) => id !== activeUser?.userId)[0];
        const user: Props | undefined = userId
          ? await getUserByUserId(userId)
          : undefined;
        user && setUsers((users) => [...users, { ...user, messageId: chatId }]);
      });
    };
    chats && getUsers();
  }, [chats]);

  return users && activeUser ? (
    <div>
      <div className="flex items-center justify-center gap-x-6 border-b p-4 font-semibold">
        {activeUser.username}
        <PencilSquareIcon className="nav-icon -mt-1.5" />
      </div>
      <div className="h-[88vh] divide-y overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 xs:h-[65vh]">
        {users
          .filter(
            (user, i) => i === users.findIndex((usr) => usr.id === user.id)
          )
          .map(({ imageUrl, messageId, username, userId, id }) => (
            <Profile
              userId={userId}
              imageUrl={imageUrl}
              username={username}
              messageId={messageId}
              key={id}
            />
          ))}
      </div>
    </div>
  ) : null;
};

export default MessageList;
