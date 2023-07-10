import React, { useEffect, useState } from "react";
import { Message, User } from "../../../typings";
import { getUserByUserId } from "../../services/firebase";
import MessageTime from "../Message/MessageTime";
import Image from "next/image";
import VideoMessage from "../Message/VideoMessage";
import ImageMessage from "../Message/ImageMessage";
import TextMessage from "../Message/TextMessage";
import AudioMessage from "../Message/AudioMessage";
import FileMessage from "../Message/FileMessage";

const ReceiverMessage = ({
  message,
  sentAt,
  type,
  status,
  sentBy,
  id,
}: Message) => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const getUser = async () => {
      const user: User = await getUserByUserId(sentBy);
      setUser(user);
    };
    sentBy && getUser();
  }, [sentBy]);
  return user?.imageUrl && user.username ? (
    <div className="relative flex items-end space-x-2 px-2">
      <div className="relative h-7 w-7">
        <Image
          src={user.imageUrl}
          alt={user.username}
          className="rounded-full object-cover"
          fill
        />
      </div>
      <div className="relative mr-auto max-w-[75%] flex-none">
        {type !== "audio" && <span className="tail-in -left-2" />}
        <div className="relative overflow-hidden rounded-lg bg-gray-200">
          {type === "text" ? (
            <TextMessage message={message} />
          ) : type === "image" ? (
            <ImageMessage message={message} sentBy={sentBy} />
          ) : type === "video" ? (
            <VideoMessage message={message} />
          ) : type === "audio" ? (
            <AudioMessage message={message} id={id} />
          ) : (
            type === "file" && <FileMessage message={message} />
          )}
          <MessageTime sentAt={sentAt} type={type} />
        </div>
      </div>
    </div>
  ) : null;
};

export default ReceiverMessage;
