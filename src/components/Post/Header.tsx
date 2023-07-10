import React, { useState, useEffect, Fragment } from "react";
import { User } from "../../../typings";
import { useRouter } from "next/router";
import { delPost, getUserByUserId } from "../../services/firebase";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PostHeader as PostHeaderLoader } from "../Loader";

type Props = {
  postId?: string;
  userId?: string;
  activeUserUsername?: string;
};

const Header = ({ postId, userId, activeUserUsername }: Props) => {
  const router = useRouter();
  const deletePost = async () => {
    await delPost(postId);
    document.location.reload();
  };
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const getUser = async () => {
      const user: User = await getUserByUserId(userId);
      setUser(user);
    };
    userId && getUser();
  }, [userId]);

  return user?.imageUrl && user.username ? (
    <div className="flex items-center space-x-4 p-3">
      <div className="h-14 w-14 cursor-pointer rounded-full border-2 border-gray-300 p-px">
        <Image
          src={user.imageUrl!}
          height={56}
          width={56}
          alt={user.username!}
          className="rounded-full object-cover"
        />
      </div>
      <h1
        className="flex-1 cursor-pointer font-semibold text-gray-800"
        onClick={() => router.push(`/profile/${user.username}`)}
      >
        {user.username}
      </h1>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button>
          <EllipsisVerticalIcon
            className="h-6 w-6 text-gray-600"
            aria-hidden="true"
          />
        </Menu.Button>
        {activeUserUsername === user.username && (
          <Transition
            as={Fragment}
            enter="transition ease-in-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-2 z-50 -mt-1 w-36 origin-top-right rounded-md border border-gray-300 bg-white shadow-md  focus:outline-none">
              <Menu.Item>
                <Menu.Button
                  className="flex items-center justify-center gap-1 px-4 py-2 text-sm font-semibold text-red-400 hover:text-red-500"
                  onClick={deletePost}
                >
                  <TrashIcon className="h-6 w-6" />
                  Delete Post
                </Menu.Button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        )}
      </Menu>
    </div>
  ) : (
    <PostHeaderLoader />
  );
};

export default Header;
