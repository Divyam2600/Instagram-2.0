import {
  BookmarkIcon,
  RadioIcon,
  Squares2X2Icon,
  TagIcon,
} from "@heroicons/react/24/outline";
import React, { Dispatch, Fragment, SetStateAction } from "react";
import { PostsType } from "../../../typings";

type Props = {
  show: PostsType;
  setShow: Dispatch<SetStateAction<PostsType>>;
  activeUserUsername?: string;
  profileUsername?: string;
};

const ActionButtion = ({
  show,
  setShow,
  activeUserUsername,
  profileUsername,
}: Props) => {
  return (
    <Fragment>
      <p className="action-button group" onClick={() => setShow("posts")}>
        <Squares2X2Icon
          className={`nav-icon ${show !== "posts" && "text-gray-400"}`}
        />
        <span className="hidden sm:inline-flex">Posts</span>
      </p>
      <p className="action-button group" onClick={() => setShow("tagged")}>
        <TagIcon
          className={`nav-icon ${show !== "tagged" && "text-gray-400"}`}
        />
        <span className="hidden sm:inline-flex">Tagged</span>
      </p>
      {activeUserUsername === profileUsername ? (
        <p className="action-button group" onClick={() => setShow("saved")}>
          <BookmarkIcon
            className={`nav-icon ${show !== "saved" && "text-gray-400"}`}
          />
          <span className="hidden sm:inline-flex">Saved</span>
        </p>
      ) : (
        <p className="action-button group" onClick={() => setShow("reels")}>
          <RadioIcon
            className={`nav-icon ${show !== "reels" && "text-gray-400"}`}
          />
          <span className="hidden sm:inline-flex">Reels</span>
        </p>
      )}
    </Fragment>
  );
};

export default ActionButtion;
