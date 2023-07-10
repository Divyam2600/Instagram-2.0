import { PlayIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Message } from "../../../typings";

const VideoMessage = ({ message }: Message) => (
  <div className="relative cursor-pointer">
    <video
      src={message!}
      preload="true"
      className="max-h-60 rounded-lg object-cover p-0.5 pb-0"
    />
    <PlayIcon className="animate-large absolute left-0.5 top-1 h-10 w-10 text-white drop-shadow-lg" />
  </div>
);

export default VideoMessage;
