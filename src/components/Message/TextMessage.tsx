import React from "react";
import { Message } from "../../../typings";

const TextMessage = ({message}: Message) => (
    <div className="py-1 px-2">
        <span className="whitespace-pre-line break-words">{message}</span>
        <span className="invisible inline-flex h-0 w-16 flex-shrink-0 flex-grow-0" />
    </div>
);

export default TextMessage;
