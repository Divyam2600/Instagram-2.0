import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  ChatBubbleBottomCenterTextIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { postModalState } from "../../atoms/modalAtom";

const TopBar = () => {
  const router = useRouter();
  const [, setPostModalOpen] = useRecoilState(postModalState);

  return (
    <div className="fixed top-0 z-10 hidden w-screen items-center justify-between border-b bg-white px-4 py-2 shadow-sm xs:flex">
      <Image
        alt="Logo"
        src={"/images/logo.png"}
        onClick={() => router.push("/")}
        width={100}
        loading="lazy"
        className="cursor-pointer"
        height={30}
      />
      <div className="mr-2 flex items-center">
        <div
          onClick={() => setPostModalOpen(true)}
          className="nav-item group flex-col space-x-0"
        >
          <PlusCircleIcon className="nav-icon" />
          <h1 className="top-nav-text">Create Post</h1>
        </div>
        <div
          onClick={() => router.push("/direct")}
          className="nav-item group flex-col space-x-0"
        >
          <div className="relative">
            <span className="absolute -right-0.5 -top-0.5 z-10 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                3
              </span>
            </span>
            <ChatBubbleBottomCenterTextIcon className="nav-icon" />
          </div>
          <h1 className="top-nav-text">Messages</h1>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
