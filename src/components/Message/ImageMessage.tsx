import React from "react";
import { Message } from "../../../typings";
import Image from "next/image";

const ImageMessage = ({ message, sentBy }: Message) => {
  return (
    <div className="h-60 w-60 cursor-pointer">
      <Image
        src={message!}
        alt={`Sent By ${sentBy!}`}
        fill
        className="rounded-lg object-cover p-0.5"
      />
    </div>
  );
};

export default ImageMessage;
