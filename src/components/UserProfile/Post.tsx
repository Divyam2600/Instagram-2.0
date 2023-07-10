import React, { useEffect, useState } from "react";
import { getCommentsLength } from "../../services/firebase";
import Image from "next/image";
import {
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  Square2StackIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { Post } from "../../../typings";

type Props = {
  postId?: string;
} & Post;

const RenderPost = ({ files, postId, likes, userId }: Props) => {
  const [comments, setComments] = useState(0);
  useEffect(() => {
    const commentsLength = async () => {
      const length = await getCommentsLength(postId);
      setComments(length);
    };
    if (postId) commentsLength();
  }, [postId]);
  const router = useRouter();
  return files && userId ? (
    <div
      onClick={() => router.push(`/post/${postId}`)}
      className="group relative aspect-square h-fit cursor-pointer overflow-hidden bg-black font-semibold text-white"
    >
      <Image
        src={files[0].url}
        alt={userId}
        fill
        className="object-cover opacity-90 group-hover:opacity-50"
      />
      <div className="absolute z-10 flex h-full w-full items-center justify-evenly opacity-0 transition-all duration-200 group-hover:opacity-100">
        <p className="flex items-center">
          <HeartIcon className="mr-1 h-5 w-5" />
          {likes?.length}
        </p>
        <p className="flex items-center">
          <ChatBubbleOvalLeftEllipsisIcon className="mr-1 h-5 w-5" />
          {comments}
        </p>
      </div>
      {files.length > 1 && (
        <Square2StackIcon className="absolute right-1 top-1 z-10 h-8 w-8 rotate-180 drop-shadow-lg" />
      )}
    </div>
  ) : null;
};

export default RenderPost;
