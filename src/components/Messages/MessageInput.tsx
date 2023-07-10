import {
  CameraIcon,
  FaceSmileIcon,
  GifIcon,
  MicrophoneIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import React, { FormEvent, KeyboardEvent, RefObject, useState } from "react";
import Picker, { SkinTones } from "emoji-picker-react";
import { addChat } from "../../services/firebase";
import useUser from "../../hooks/use-user";
import {
  sendAudioModalState,
  sendMediaModalState,
  sendFileModalState
} from "../../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { messageIdState } from "../../atoms/idAtom";

type Props = {
  messageId?: string;
  messageRef: RefObject<HTMLDivElement>;
};

const MessageInput = ({ messageId, messageRef }: Props) => {
  const [message, setMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const activeUser = useUser();
  const [, setSendMediaModalOpen] = useRecoilState(sendMediaModalState);
  const [, setSendAudioModalOpen] = useRecoilState(sendAudioModalState);
  const [, setSendFileModalOpen] = useRecoilState(sendFileModalState);
  const [, setMessageId] = useRecoilState(messageIdState);

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault();
    const messageToSend = message.trim();
    setMessage("");
    document.querySelector("textarea")!.style.height = "20px";
    await addChat(
      messageToSend,
      "text",
      "delivered",
      activeUser?.userId,
      messageId
    );
    messageRef.current!.scrollTop = messageRef.current!.scrollHeight;
  };
  const increaseHeight = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    (event.target as HTMLTextAreaElement).style.height = "20px";
    (event.target as HTMLTextAreaElement).style.height =
      (event.target as HTMLTextAreaElement).scrollHeight + "px";
  };
  return (
    <footer className="sticky bottom-0 z-20 w-full bg-white p-1">
      <form
        onSubmit={sendMessage}
        className="messageInput mx-auto flex items-center space-x-0.5 rounded-3xl border p-1"
      >
        <FaceSmileIcon
          className="animate-large h-8 w-8 cursor-pointer"
          onClick={() => setShowEmojis(!showEmojis)}
        />
        <textarea
          placeholder="Enter your message ..."
          className="m-0 h-5 max-h-24 max-w-full flex-1 resize-none overflow-auto border-r bg-transparent px-2 text-sm outline-none scrollbar-hide"
          onChange={(event) => setMessage(event.target.value)}
          autoComplete="off"
          value={message}
          onKeyUp={increaseHeight}
          onClick={() => setShowEmojis(false)}
        />
        <GifIcon
          className={`animate-large w-0 cursor-pointer ${
            !message && "h-5 w-5"
          }`}
        />
        <PaperClipIcon
          className={`animate-large w-0 cursor-pointer ${
            !message && "h-5 w-5"
          }`}
          onClick={() => {
            setSendFileModalOpen(true), setMessageId(messageId!);
          }}
        />
        <MicrophoneIcon
          className={`animate-large w-0 cursor-pointer ${
            !message && "h-5 w-5"
          }`}
          onClick={() => {
            setSendAudioModalOpen(true), setMessageId(messageId!);
          }}
        />
        <CameraIcon
          className={`animate-large box-content h-7 w-7 cursor-pointer rounded-full bg-blue-700 fill-white p-[2px] text-blue-700 ${
            message && "w-0 scale-0"
          }`}
          onClick={() => {
            setSendMediaModalOpen(true), setMessageId(messageId!);
          }}
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className={!message ? "scale-0" : "scale-100"}
        >
          <PaperAirplaneIcon
            className={`animate-large -ml-8 h-7 w-7 text-blue-700 ${
              !message && "w-0 scale-0"
            }`}
          />
        </button>
        {showEmojis && (
          <Picker
            searchDisabled={true}
            skinTonesDisabled={true}
            defaultSkinTone={SkinTones.MEDIUM_LIGHT}
            previewConfig={{ showPreview: false }}
            height={250}
            width={280}
            onEmojiClick={({ emoji }) => {
              setMessage(message + emoji);
            }}
          />
        )}
      </form>
    </footer>
  );
};

export default MessageInput;
