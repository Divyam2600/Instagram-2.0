import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  updateActiveUserFollowing,
  updateFollowedUserFollowers,
} from "../../../services/firebase";

type Props = {
  profileDocId?: string;
  username?: string;
  userImage?: string;
  profileId?: string;
  activeUserId?: string;
  activeUserDocId?: string;
};

const SuggestedProfile = ({
  profileDocId,
  username,
  userImage,
  profileId,
  activeUserId,
  activeUserDocId,
}: Props) => {
  const [followed, setFollowed] = useState(false);
  const router = useRouter();
  const handleFollowUser = async () => {
    setFollowed(true);
    await updateActiveUserFollowing(activeUserDocId, profileId, false);
    await updateFollowedUserFollowers(profileDocId, activeUserId, false);
  };
  return !followed && userImage && username ? (
    <div className="flex items-center space-x-4 text-start">
      <div className="h-12 w-12 cursor-pointer rounded-full border-2 border-gray-300 p-px">
        <Image
          src={userImage!}
          height={48}
          width={48}
          alt={username!}
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex-1 cursor-pointer text-sm font-semibold text-gray-800">
        <h1 onClick={() => router.push(`/profile/${username}`)}>{username}</h1>
        <h2 className="truncate text-xs font-normal text-gray-400">
          New To Instagram
        </h2>
      </div>
      <button
        className="text-xs font-semibold text-blue-500"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
};

export default SuggestedProfile;
