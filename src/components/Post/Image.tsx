import { HeartIcon } from "@heroicons/react/24/solid";
import React, { useState, Dispatch, SetStateAction } from "react";
import { Post } from "../../../typings";
import { updateLikes } from "../../services/firebase";
import CarouselImage from "../CarouselImage";
import { PostImage as PostImageLoader } from "../Loader";

type Props = {
  postId?: string;
  toggledLiked?: boolean;
  setToggledLiked?: Dispatch<SetStateAction<boolean | undefined>>;
  numberOfLikes?: number;
  setLikes?: Dispatch<SetStateAction<number | undefined>>;
  activeUserUserId?: string;
} & Post;

const RenderFiles = ({
  files,
  caption,
  postId,
  toggledLiked,
  setToggledLiked,
  numberOfLikes,
  setLikes,
  activeUserUserId,
}: Props) => {
  const [visible, setVisible] = useState(false);
  const handleLikeAnimation = async () => {
    setVisible(true);
    if (!toggledLiked) {
      setLikes!(numberOfLikes! + 1);
      await updateLikes(postId, activeUserUserId, toggledLiked!);
    }
    setToggledLiked!(true);
    setTimeout(() => setVisible(false), 500);
  };
  return files ? (
    <div className="relative select-none" onDoubleClick={handleLikeAnimation}>
      <CarouselImage files={files} />
      <HeartIcon
        className={`absolute top-1/2 bottom-1/2 mx-auto my-auto h-28 w-28 min-w-full text-white drop-shadow-md duration-200 ease-in-out ${
          visible ? "scale-100" : "scale-0"
        }`}
      />
    </div>
  ) : (
    <PostImageLoader />
  );
};

export default RenderFiles;
