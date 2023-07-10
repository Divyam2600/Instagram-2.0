import React from "react";
import { Message } from "../../../typings";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

const FileMessage = ({ message }: Message) => {
  const fileMessage = JSON.parse(message ?? "");
  return (
    <a
      href={fileMessage?.downloadUrl}
      download={fileMessage?.name}
      className="relative flex items-center space-x-2 rounded-md border bg-gray-200 p-2 text-sm"
    >
      <DocumentTextIcon className="h-8 w-8" />
      <p className="line-clamp-1 w-full">{fileMessage?.name}</p>
    </a>
  );
};

export default FileMessage;
