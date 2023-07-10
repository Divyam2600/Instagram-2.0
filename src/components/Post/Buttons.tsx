import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconFilled,
  BookmarkIcon as BookmarkIconFilled,
} from "@heroicons/react/24/solid";
import React, { Dispatch, SetStateAction } from "react";
import { useRecoilState } from "recoil";
import { postIdState } from "../../atoms/idAtom";
import { likesModalState } from "../../atoms/modalAtom";
import { updatedSavedPosts, updateLikes } from "../../services/firebase";

type Props = {
  postId?: string;
  handleFocus: () => any;
  toggledLiked?: boolean;
  setToggledLiked: Dispatch<SetStateAction<boolean | undefined>>;
  toggleSaved?: boolean;
  setToggleSaved: Dispatch<SetStateAction<boolean | undefined>>;
  likes?: number;
  setLikes: Dispatch<SetStateAction<number | undefined>>;
  activeUserUserId?: string;
  activeUserDocId?: string;
};

const Buttons = ({
  postId,
  handleFocus,
  toggledLiked,
  setToggledLiked,
  toggleSaved,
  setToggleSaved,
  likes,
  setLikes,
  activeUserUserId,
  activeUserDocId,
}: Props) => {
  const [, setOpen] = useRecoilState(likesModalState);
  const [, setPostId] = useRecoilState(postIdState);
  const handleToggleLiked = async () => {
    setToggledLiked((toggledLiked) => !toggledLiked);
    await updateLikes(postId, activeUserUserId, toggledLiked!);
    setLikes((likes) => (toggledLiked ? likes! - 1 : likes! + 1));
  };
  const handleToggleSaved = async () => {
    setToggleSaved((toggleSaved) => !toggleSaved);
    await updatedSavedPosts(postId, activeUserDocId, toggleSaved!);
  };
  const handleToggleActive = async () => {
    setOpen(true);
    setPostId(postId!);
  };
  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <button
            onClick={handleToggleLiked}
          >
            {toggledLiked ? (
              <HeartIconFilled className="nav-icon text-red-500" />
            ) : (
              <HeartIcon className="nav-icon" />
            )}
          </button>
          <ChatBubbleOvalLeftIcon
            className="nav-icon"
            style={{ transform: "scale(-1,1)" }}
            onClick={handleFocus}
          />
          <PaperAirplaneIcon className="nav-icon -mt-1 rotate-[-20deg]" />
        </div>
        <button
          onClick={handleToggleSaved}
        >
          {toggleSaved ? (
            <BookmarkIconFilled className="nav-icon text-gray-800" />
          ) : (
            <BookmarkIcon className="nav-icon" />
          )}
        </button>
      </div>
      {likes && likes > 0 ? (
        <p
          className="ml-1 mt-0.5 cursor-pointer font-bold"
          onClick={handleToggleActive}
        >
          {likes === 1 ? `${likes} like` : `${likes} likes`}
        </p>
      ) : null}
    </div>
  );
};

export default Buttons;
