import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "../../../typings";
import { SetterOrUpdater } from "recoil";

type Props = {
  users: User[];
  setOpen: SetterOrUpdater<boolean>;
};

const DisplayUsers = ({ users, setOpen }: Props) => {
  return (
    <div className="max-h-96 space-y-3 overflow-y-scroll scrollbar-hide">
      {users.length > 0 ? (
        users
          .filter(
            (user, i) => i === users.findIndex((usr) => usr.id === user.id)
          )
          .map(
            ({ id, imageUrl, username, name }) =>
              imageUrl &&
              username && (
                <div className="flex items-center space-x-2" key={id}>
                  <div className="h-14 w-14 rounded-full border-2 border-gray-300 p-px">
                    <Image
                      src={imageUrl!}
                      alt={username!}
                      className="rounded-full object-cover"
                      width={56}
                      height={56}
                    />
                  </div>
                  <div className="font-bold text-gray-800">
                    <Link
                      href={`/profile/${username}`}
                      onClick={() => setOpen(false)}
                    >
                      {username}
                    </Link>
                    <h2 className="font-medium text-gray-600 ">{name}</h2>
                  </div>
                </div>
              )
          )
      ) : (
        <h1 className="text-center text-xl font-medium text-gray-400">
          No Users To Show
        </h1>
      )}
    </div>
  );
};

export default DisplayUsers;
