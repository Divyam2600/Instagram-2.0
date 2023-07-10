import React, { useState } from "react";
import {
  updateActiveUserFollowing,
  updateFollowedUserFollowers,
} from "../../services/firebase";
import Image from "next/image";
import { useRouter } from "next/router";
import { User } from "../../../typings";

type Props = {
  profileDocId?: string;
  profileId?: string;
  activeUserId?: string;
  activeUserDocId?: string;
} & User;

const SuggestedProfile = ({
  profileDocId,
  username,
  name,
  imageUrl,
  profileId,
  activeUserId,
  activeUserDocId,
}: Props) => {
  const router = useRouter();
  const [followed, setFollowed] = useState(false);
  const handleFollowUser = async () => {
    setFollowed(true);
    await updateActiveUserFollowing(activeUserDocId, profileId, false);
    await updateFollowedUserFollowers(profileDocId, activeUserId, false);
  };
  return !followed && imageUrl && username ? (
    <div className="flex w-44 flex-col items-center space-y-2 rounded-lg border bg-gray-100 bg-opacity-30 p-4">
      <Image
        src={imageUrl!}
        height={80}
        width={80}
        alt={username!}
        className="cursor-pointer rounded-full object-cover"
      />
      <div
        onClick={() => router.push(`/profile/${username}`)}
        className="cursor-pointer text-center font-semibold"
      >
        {username}
        <h3 className="truncate text-sm text-gray-400">{name}</h3>
      </div>
      <button
        className="text-md w-28 rounded-md border bg-sky-400 py-1 font-semibold text-white hover:bg-sky-500"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
};

export default SuggestedProfile;
