import { UserPlusIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PostsType, UserProfileProps } from "../../../typings";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";
import Image from "next/image";
import { useRecoilState } from "recoil";
import {
  followersModalState,
  followingModalState,
  suggestionsListState,
} from "../../atoms/modalAtom";
import { userIdState } from "../../atoms/idAtom";
import SuggestionsList from "./SuggestionsList";
import { UserProfileHeaderLoader } from "../Loader";
import ActionButtion from "./ActionButtion";
import RenderMenu from "./Menu";

type Props = {
  postsCount: number;
  setFollowerCount: Dispatch<UserProfileProps>;
  show: PostsType;
  setShow: Dispatch<SetStateAction<PostsType>>;
} & UserProfileProps;

const Header = ({
  postsCount,
  profile,
  followerCount,
  followingCount,
  setFollowerCount,
  show,
  setShow,
}: Props) => {
  const activeUser = useUser();
  const activeButtonFollow =
    activeUser?.username && activeUser?.username !== profile?.username;
  const [, setFollowersModalOpen] = useRecoilState(followersModalState);
  const [, setFollowingModalOpen] = useRecoilState(followingModalState);
  const [isSuggestionsListOpen, setSuggestionsListOpen] =
    useRecoilState(suggestionsListState);
  const [, setUserId] = useRecoilState(userIdState);
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        activeUser?.username,
        profile?.userId
      );
      setIsFollowingProfile(!!isFollowing);
    };
    activeUser?.username && profile?.userId && isLoggedInUserFollowingProfile();
  }, [activeUser?.username && profile?.userId]);
  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile
        ? followerCount! - 1
        : followerCount! + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      activeUser?.id,
      profile?.id,
      profile?.userId,
      activeUser?.userId
    );
  };
  return profile?.imageUrl && profile.username ? (
    <section className="flex flex-col space-y-4 py-2">
      <div className="flex space-x-6">
        <div className="relative h-20 w-20 rounded-full sm:h-24 sm:w-24 md:h-32 md:w-32">
          <Image
            src={profile.imageUrl!}
            alt={profile.username!}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="flex items-center justify-between text-xl sm:font-light md:text-2xl">
              {profile.username}
              {profile.username !== activeUser?.username && (
                <div className="sm:hidden">
                  <RenderMenu
                    activeUserUserId={activeUser?.userId}
                    userId={profile.userId}
                  />
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                className={`w-48 rounded-md border-2  py-1 text-sm font-semibold ${
                  !activeButtonFollow || isFollowingProfile
                    ? "border-gray-200 bg-white text-black hover:bg-gray-200/40"
                    : "border-sky-400 bg-sky-400 text-white hover:border-sky-500 hover:bg-sky-500"
                }`}
                onClick={handleToggleFollow}
              >
                {activeButtonFollow
                  ? isFollowingProfile
                    ? "Unfollow"
                    : "Follow"
                  : "Edit Profile"}
              </button>
              <button
                className="flex w-9 items-center justify-center rounded-md border-2 border-gray-200 bg-white hover:bg-gray-200 hover:bg-opacity-40"
                type="button"
                onClick={() => setSuggestionsListOpen(!isSuggestionsListOpen)}
              >
                {!isSuggestionsListOpen ? (
                  <UserPlusIcon className="h-5 w-5" />
                ) : (
                  <ChevronUpIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {profile.username !== activeUser?.username && (
              <div className="hidden sm:inline-flex ">
                <RenderMenu
                  activeUserUserId={activeUser?.userId}
                  userId={profile.userId}
                />
              </div>
            )}
          </div>
          <div className="hidden flex-col space-y-4 sm:inline-flex">
            <p className="text-xl font-semibold ">{profile.name}</p>
            <p className="whitespace-pre-line text-sm">{profile.description}</p>
            <div className="flex max-w-sm justify-between text-base text-gray-400">
              <p>
                <span className="text-xl font-semibold text-black">
                  {postsCount}
                </span>{" "}
                {postsCount === 1 ? `Post` : `Posts`}
              </p>
              <p
                className=" cursor-pointer"
                onClick={() => {
                  setFollowersModalOpen(true), setUserId(profile.id!);
                }}
              >
                <span className="text-xl font-semibold text-black">
                  {followerCount}
                </span>{" "}
                {followerCount === 1 ? `Follower` : `Followers`}
              </p>
              <p
                className=" cursor-pointer"
                onClick={() => {
                  setFollowingModalOpen(true), setUserId(profile.id!);
                }}
              >
                <span className="text-xl font-semibold text-black">
                  {followingCount}
                </span>{" "}
                Following
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:inline">
        <SuggestionsList
          userId={activeUser?.userId}
          following={activeUser?.following}
          activeUserDocId={activeUser?.id}
        />
      </div>
      <div className="hidden justify-between border-y px-10 pb-1 text-center text-lg font-semibold text-gray-700 sm:inline-flex">
        <ActionButtion
          show={show}
          setShow={setShow}
          activeUserUsername={activeUser?.username}
          profileUsername={profile.username}
        />
      </div>
      <div className="space-y-2 sm:hidden">
        <p className="font-semibold">{profile.name}</p>
        <p className="whitespace-pre-line pb-2 text-sm">
          {profile.description}
        </p>
        <SuggestionsList
          userId={activeUser?.userId}
          following={activeUser?.following}
          activeUserDocId={activeUser?.id}
        />
        <div className="flex justify-between border-t px-10 py-2 text-center text-sm font-semibold text-gray-400">
          <p className="flex flex-col">
            <span className="-mb-1 text-lg font-bold text-black">
              {postsCount}
            </span>
            {postsCount === 1 ? `Post` : `Posts`}
          </p>
          <p
            className="flex cursor-pointer flex-col"
            onClick={() => {
              setFollowersModalOpen(true), setUserId(profile.id!);
            }}
          >
            <span className="-mb-1 text-lg font-bold text-black">
              {followerCount}
            </span>
            {followerCount === 1 ? `Follower` : `Followers`}
          </p>
          <p
            className="flex cursor-pointer flex-col"
            onClick={() => {
              setFollowingModalOpen(true), setUserId(profile.id!);
            }}
          >
            <span className="-mb-1 text-lg font-bold text-black">
              {followingCount}
            </span>
            Following
          </p>
        </div>
        <div className="flex justify-between border-y px-10 pb-1 text-center text-lg font-semibold text-gray-700">
          <ActionButtion
            show={show}
            setShow={setShow}
            activeUserUsername={activeUser?.username}
            profileUsername={profile.username}
          />
        </div>
      </div>
    </section>
  ) : (
    <UserProfileHeaderLoader />
  );
};

export default Header;
