import React, { useState, useEffect } from "react";
import { User } from "../../../typings";
import { getUserByUserId } from "../../services/firebase";
import Image from "next/image";
import { useRouter } from "next/router";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Stories as StoriesLoader } from "../Loader";

const Stories = ({ userId: activeUserId, following }: User) => {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
  useEffect(() => {
    const getUsers = async () => {
      following?.map(async (followingUserId) => {
        const otherUsers: User = await getUserByUserId(followingUserId);
        setUsers((users) => [...users, otherUsers]);
      });
      const activeUser: User = await getUserByUserId(activeUserId);
      setUsers((users) => [activeUser, ...users]);
    };
    users.length <= following!.length && getUsers();
  }, [following, activeUserId]);

  return users ? (
    <div className="flex w-full space-x-2 overflow-x-scroll rounded-md border bg-white p-2 shadow-sm overflow-y-hidden scrollbar-hide">
      {users
        .filter((user, i) => i === users.findIndex((usr) => usr.id === user.id))
        .map(
          ({ id, imageUrl, username, userId }) =>
            imageUrl &&
            username && (
              <div
                className="relative flex flex-col whitespace-nowrap"
                key={id}
              >
                <div className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 border-solid border-transparent border-gradient-t-insta-gray-50">
                  <Image
                    src={imageUrl!}
                    width={58}
                    height={58}
                    alt={username!}
                    className="rounded-full object-cover"
                  />
                </div>
                {userId === activeUserId && (
                  <span className="absolute bottom-1/4 -right-1 cursor-pointer rounded-full border-2 border-white bg-blue-500 text-white shadow-md">
                    <PlusIcon className="h-5 w-5 stroke-[2.5] p-px " />
                  </span>
                )}
                <h1
                  className="mt-1 w-16 cursor-pointer truncate text-center text-xs text-gray-500"
                  onClick={() => router.push(`/profile/${username}`)}
                >
                  {username}
                </h1>
              </div>
            )
        )}
    </div>
  ) : (
    <StoriesLoader />
  );
};

export default Stories;
