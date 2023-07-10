import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { User } from "../../../../typings";
import { MiniProfileLoader } from "../../Loader";

const MiniProfile = ({ username, name, imageUrl }: User) => {
  const router = useRouter();
  return !username || !name || !imageUrl ? (
    <MiniProfileLoader />
  ) : (
    <div
      className="flex items-center space-x-4"
      onClick={() => router.push(`/profile/${username}`)}
    >
      <div className="h-16 w-16 cursor-pointer rounded-full border-2 border-gray-300 p-px">
        <Image
          src={imageUrl!}
          height={64}
          width={64}
          alt={username!}
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex-1 text-sm text-gray-500">
        <h2 className="cursor-pointer font-semibold text-gray-700">
          {username}
        </h2>
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default MiniProfile;
