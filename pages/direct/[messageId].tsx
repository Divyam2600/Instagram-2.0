import React, { useEffect, useRef, useState } from "react";
import MessageHomePage from "../../src/components/Messages/MessageHomePage";
import { useRouter, NextRouter } from "next/router";
import useUser from "../../src/hooks/use-user";
import { User } from "../../typings";
import { getOtherChatUser } from "../../src/services/firebase";
import Header from "../../src/components/Messages/Header";
import MessageInput from "../../src/components/Messages/MessageInput";
import RenderMessage from "../../src/components/Messages/Message";

type Props = {
  query: {
    messageId?: string;
  };
} & NextRouter;

const Messages = () => {
  const {
    query: { messageId },
  }: Props = useRouter();
  const activeUser = useUser();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const getOtherUser = async () => {
      const result: User = await getOtherChatUser(
        messageId,
        activeUser?.userId
      );
      setUser(result);
    };
    messageId && activeUser?.userId && getOtherUser();
  }, [messageId, activeUser?.userId]);
  const messageRef = useRef<HTMLDivElement>(null);
  return (
    <MessageHomePage isHomePage={false}>
      <Header username={user?.username} imageUrl={user?.imageUrl} />
      <RenderMessage
        activeUserUserId={activeUser?.userId}
        messageId={messageId}
        messageRef={messageRef}
      />
      <MessageInput messageId={messageId} messageRef={messageRef} />
    </MessageHomePage>
  );
};

export default Messages;
