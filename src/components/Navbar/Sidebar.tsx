import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  ArrowLeftOnRectangleIcon,
  ChatBubbleBottomCenterTextIcon,
  Cog8ToothIcon,
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { User } from "../../../typings";
import useAuth from "../../hooks/use-auth";
import { useRecoilState } from "recoil";
import { postModalState, searchBarModalState } from "../../atoms/modalAtom";

const SideBar = ({ username, imageUrl }: User) => {
  const router = useRouter();
  const { logOut } = useAuth();
  const [, setPostModalOpen] = useRecoilState(postModalState);
  const [, setSearchBarOpen] = useRecoilState(searchBarModalState);

  return (
    <div className="fixed left-0 z-50 flex h-screen w-20 flex-col justify-between space-y-4 overflow-y-scroll border-r bg-white py-6 px-4 overflow-y-hidden scrollbar-hide lg:min-w-fit lg:px-2 xs:hidden">
      <button
        className="mx-auto opacity-80 lg:hidden"
        onClick={() => router.push("/")}
      >
        <Image
          loading="lazy"
          alt="Logo Icon"
          src={"/images/logo-icon.png"}
          width={32}
          height={32}
        />
      </button>
      <button
        className="mx-auto hidden lg:inline-flex"
        onClick={() => router.push("/")}
      >
        <Image
          loading="lazy"
          alt="Logo"
          src={"/images/logo.png"}
          width={150}
          height={40}
        />
      </button>
      <div className="space-y-2">
        <div onClick={() => router.push("/")} className="nav-item group">
          <HomeIcon className="nav-icon" />
          <h1 className="side-nav-text">Home</h1>
        </div>
        <div onClick={() => setSearchBarOpen(true)} className="nav-item group">
          <MagnifyingGlassIcon className="nav-icon" />
          <h1 className="side-nav-text">Search</h1>
        </div>
        <div
          onClick={() => router.push("/direct")}
          className="nav-item group"
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
          <h1 className="side-nav-text">Messages</h1>
        </div>
        <div
          // onClick={() => Notifications("")}
          className="nav-item group"
        >
          <div className="relative">
            <span className="absolute right-px top-px z-10 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
            </span>
            <HeartIcon className="nav-icon" />
          </div>
          <h1 className="side-nav-text">Notifications</h1>
        </div>
        <div onClick={() => setPostModalOpen(true)} className="nav-item group">
          <PlusCircleIcon className="nav-icon" />
          <h1 className="side-nav-text">Create Post</h1>
        </div>
        <div
          onClick={() => router.push("/settings")}
          className="nav-item group"
        >
          <Cog8ToothIcon className="nav-icon" />
          <h1 className="side-nav-text">Settings</h1>
        </div>
        <div onClick={logOut} className="nav-item group">
          <ArrowLeftOnRectangleIcon className="nav-icon" />
          <h1 className="side-nav-text">Logout</h1>
        </div>
      </div>
      {imageUrl && (
        <div
          onClick={() => router.push(`/profile/${username}`)}
          className="nav-item group"
        >
          <Image
            src={imageUrl}
            alt="Logo Image"
            height={32}
            loading="lazy"
            width={32}
            className="rounded-full"
          />
          <h1 className="side-nav-text">My Profile</h1>
        </div>
      )}
    </div>
  );
};

export default SideBar;
