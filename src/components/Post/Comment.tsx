import React, { useEffect, useState } from "react";
import { Comment as CommentInterface, User } from "../../../typings";
import { getUserByUserId, likeComment } from "../../services/firebase";
import Image from "next/image";
import { useRouter } from "next/router";
import ReactTimeAgo from "react-time-ago";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import { commentLikesModalState } from "../../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { commentIdState, postIdState } from "../../atoms/idAtom";

type Props = {
  postId?: string;
  activeUserUserId?: string;
} & CommentInterface;

const RenderComments = ({
  postId,
  id,
  activeUserUserId,
  userId,
  comment,
  postedAt,
  likes,
}: Props) => {
  const [toggledLiked, setToggledLiked] = useState<boolean | undefined>();
  const [totalLikes, setTotalLikes] = useState<number | undefined>(0);
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const [, setOpen] = useRecoilState(commentLikesModalState);
  const [, setCurrentCommentId] = useRecoilState(commentIdState);
  const [, setCurrentPostId] = useRecoilState(postIdState);

  useEffect(() => {
    setTotalLikes(likes?.length);
    setToggledLiked(likes?.findIndex((id) => id === activeUserUserId) !== -1);
  }, [likes, totalLikes]);

  useEffect(() => {
    getUser();
  }, [userId]);

  const getUser = async () => {
    const user: User = await getUserByUserId(userId);
    setUser(user);
  };

  const handleToggleLiked = async () => {
    setToggledLiked((toggledLiked) => !toggledLiked);
    await likeComment(postId, id, activeUserUserId, toggledLiked!);
  };
  const handleToggleActive = async () => {
    setOpen(true);
    setCurrentCommentId(id!);
    setCurrentPostId(postId!);
  };

  return user?.imageUrl && user.username ? (
    <div className="flex items-start space-x-2">
      <div className="h-10 w-10 cursor-pointer rounded-full border-2 border-gray-300 p-px">
        <Image
          src={user.imageUrl!}
          alt={user.username!}
          height={36}
          width={36}
          loading="lazy"
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex-1 space-y-1 text-sm">
        <p className="whitespace-pre-line">
          <span
            className="mr-2 flex-1 cursor-pointer font-semibold text-gray-800"
            onClick={() => router.push(`/profile/${user.username}`)}
          >
            {user.username}
          </span>
          {comment}
        </p>
        <div className="flex space-x-4 text-xs text-gray-400">
          {postedAt && (
            <ReactTimeAgo
              date={postedAt.toDate()}
              locale="en-US"
              timeStyle="mini"
            />
          )}
          {totalLikes && totalLikes > 0 ? (
            <p
              className="cursor-pointer font-semibold"
              onClick={handleToggleActive}
            >
              {totalLikes === 1 ? `${totalLikes} like` : `${totalLikes} likes`}
            </p>
          ) : null}
        </div>
      </div>
      <button
        onClick={handleToggleLiked}
      >
        {toggledLiked ? (
          <HeartIconFilled className="nav-icon h-5 w-5 text-red-500" />
        ) : (
          <HeartIcon className="nav-icon h-5 w-5" />
        )}
      </button>
    </div>
  ) : null;
};

export default RenderComments;
