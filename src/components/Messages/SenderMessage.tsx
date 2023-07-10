import React from "react";
import { Message } from "../../../typings";
import MessageTime from "../Message/MessageTime";
import TextMessage from "../Message/TextMessage";
import ImageMessage from "../Message/ImageMessage";
import VideoMessage from "../Message/VideoMessage";
import AudioMessage from "../Message/AudioMessage";
import FileMessage from "../Message/FileMessage";

const SenderMessage = ({
  message,
  sentAt,
  type,
  status,
  sentBy,
  id,
}: Message) => {
  return (
    <div className="relative flex px-2">
      <div className="relative ml-auto max-w-[75%] flex-none">
        {type !== "audio" && <span className="tail-in -right-2" />}
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
            type === "file" && <FileMessage message={message}/>
          )}
          <MessageTime type={type} sentAt={sentAt} />
        </div>
      </div>
    </div>
  );
};

export default SenderMessage;
