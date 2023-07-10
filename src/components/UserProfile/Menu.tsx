import { Menu, Transition } from "@headlessui/react";
import {
  EllipsisHorizontalIcon,
  ExclamationTriangleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import React, { Fragment, useState } from "react";
import { createUserMessage, getChatId } from "../../services/firebase";
import { useRouter } from "next/router";

type Props = {
  activeUserUserId?: string;
  userId?: string;
};

const RenderMenu = ({ activeUserUserId, userId }: Props) => {
  const [messageId, setMessageId] = useState<string>();
  const router = useRouter();
  const chatWithUser = async () => {
    await createUserMessage(activeUserUserId, userId);
    const result = await getChatId(activeUserUserId, userId);
    router.push(`/direct/${result}`);
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button>
        <EllipsisHorizontalIcon
          className="h-6 w-6 text-gray-600"
          aria-hidden="true"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-in-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 -mt-1 max-w-fit origin-top-right divide-y rounded-md border border-gray-300 bg-white shadow-md  focus:outline-none sm:right-1">
          <Menu.Item>
            <Menu.Button className="flex items-center justify-center gap-x-2 px-4 py-2 text-sm font-semibold text-red-400 hover:text-red-500">
              <ExclamationTriangleIcon className="h-6 w-6" />
              Report
            </Menu.Button>
          </Menu.Item>
          <Menu.Item>
            <Menu.Button
              className="flex items-center justify-center gap-x-2 px-4 py-2 text-sm font-semibold text-red-400 hover:text-red-500"
              onClick={chatWithUser}
            >
              <PaperAirplaneIcon className="-mt-1 h-6 w-6 rotate-[-20deg]" />
              Message
            </Menu.Button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default RenderMenu;
