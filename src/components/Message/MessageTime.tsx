import React from "react";
import moment from "moment";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Message } from "../../../typings";

const MessageTime = ({ sentAt, type }: Message) => (
  <div
    className={`relative z-10 w-full ${
      type === "image" || type === "video"
        ? "rounded-b-lg bg-gradient-to-t from-black/60 to-transparent p-0.5 pt-0 text-white"
        : type === "audio" ?
          "bg-gradient-to-t from-black/25 to-transparent text-white": type === "file" &&"bg-gradient-to-t from-gray-800/20 to-transparent"
    }`}
  >
    <div className="-mt-4 ml-auto mr-1 flex  max-w-fit items-center space-x-1 whitespace-nowrap">
      <span className="align-top text-[11px] leading-4 tracking-wide">
        {moment(sentAt?.toDate()).format("LT")}
      </span>
      <CheckIcon className="h-3 w-3 stroke-[3]" />
    </div>
  </div>
);

export default MessageTime;
