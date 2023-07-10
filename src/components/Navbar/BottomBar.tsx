import {
  Cog8ToothIcon,
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { User } from "../../../typings";
import { searchBarModalState } from "../../atoms/modalAtom";

const BottomBar = ({ username, imageUrl }: User) => {
  const router = useRouter();
  const [, setSearchBarOpen] = useRecoilState(searchBarModalState);

  return (
    <div className="fixed bottom-0 z-10 hidden w-screen items-center justify-between border-t bg-white px-6 py-2 shadow-bottom xs:flex">
      <div
        onClick={() => router.push("/")}
        className="nav-item  group flex-col space-x-0"
      >
        <HomeIcon className="nav-icon" />
        <h1 className="bottom-nav-text">Home</h1>
      </div>
      <div
        onClick={() => setSearchBarOpen(true)}
        className="nav-item  group flex-col space-x-0"
      >
        <MagnifyingGlassIcon className="nav-icon" />
        <h1 className="bottom-nav-text">Search</h1>
      </div>
      <div
        onClick={() => router.push("/settings")}
        className="nav-item  group flex-col space-x-0"
      >
        <Cog8ToothIcon className="nav-icon" />
        <h1 className="bottom-nav-text">Settings</h1>
      </div>
      <div
        // onClick={() => Notifications("")}
        className="nav-item  group flex-col space-x-0"
      >
        <div className="relative">
          <span className="absolute right-px top-px z-10 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
          </span>
          <HeartIcon className="nav-icon" />
        </div>
        <h1 className="bottom-nav-text">Notifications</h1>
      </div>
      {imageUrl && username && (
        <div
          onClick={() => router.push(`/profile/${username}`)}
          className="nav-item  group flex-col space-x-0"
        >
          <Image
            src={imageUrl}
            height={32}
            loading="lazy"
            alt={username}
            width={32}
            className="rounded-full"
          />
          <h1 className="bottom-nav-text">My Profile</h1>
        </div>
      )}
    </div>
  );
};

export default BottomBar;
