import React, { KeyboardEvent, FormEvent, useState, RefObject } from "react";
import Picker, { SkinTones } from "emoji-picker-react";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { addComment } from "../../services/firebase";

type Props = {
  commentInput: RefObject<HTMLTextAreaElement>;
  postId?: string;
  activeUserUserId?: string;
};

const CommentInput = ({ commentInput, postId, activeUserUserId }: Props) => {
  const [showEmojis, setShowEmojis] = useState(false);
  const [comment, setComment] = useState("");

  const sendComment = async (event: FormEvent) => {
    event.preventDefault();
    commentInput.current!.style.height = "56px";
    const commentToSend = comment;
    setComment("");
    setShowEmojis(false);
    await addComment(postId, commentToSend.trim(), activeUserUserId);
  };
  const increaseHeight = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    (event.target as HTMLTextAreaElement).style.height = "20px";
    (event.target as HTMLTextAreaElement).style.height =
      (event.target as HTMLTextAreaElement).scrollHeight + "px";
  };
  return (
    <form
      onSubmit={sendComment}
      className="relative flex items-center border-b px-4 bg-white"
    >
      <FaceSmileIcon
        className="h-7 w-7 cursor-pointer text-gray-700"
        onClick={() => setShowEmojis(!showEmojis)}
      />
      <textarea
        placeholder="Add a comment..."
        className="h-14 max-h-32 max-w-full flex-1 resize-none overflow-y-scroll border-none p-4 outline-none scrollbar-hide focus:ring-0"
        value={comment}
        aria-label="Add a comment"
        autoComplete="off"
        onChange={(event) => setComment(event.target.value)}
        ref={commentInput}
        onKeyUp={increaseHeight}
      />
      <button
        className={`font-semibold ${
          !comment.trim() && "text-opacity-75"
        } text-blue-400`}
        type="submit"
        disabled={!comment.trim()}
      >
        Post
      </button>
      {showEmojis && (
        <Picker
          searchDisabled={true}
          skinTonesDisabled={true}
          defaultSkinTone={SkinTones.MEDIUM_LIGHT}
          previewConfig={{ showPreview: false }}
          height={250}
          onEmojiClick={({ emoji }) => {
            setComment(comment + emoji);
          }}
        />
      )}
    </form>
  );
};

export default CommentInput;
