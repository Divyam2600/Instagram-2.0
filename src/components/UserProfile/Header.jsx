import {
  BookmarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DotsHorizontalIcon,
  TagIcon,
  ViewGridIcon
} from '@heroicons/react/outline';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  followersModalState,
  followingModalState,
  suggestionsListState,
  userEditModal
} from '../../atoms/modalAtom';
import useUser from '../../hooks/use-user';
import { useRecoilState } from 'recoil';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';
import { userIdState } from '../../atoms/idAtom';
import SuggestionsList from './SuggestionsList';
import { HeadLoader } from './Loader';

function Header({ photosCount, profile, followerCount, followingCount, setFollowerCount }) {
  const { user } = useUser();
  const activeButtonFollow = user.username && user.username !== profile.username;
  const [open, setOpen] = useRecoilState(userEditModal);
  const [isopen, setIsOpen] = useRecoilState(followersModalState);
  const [nowOpen, setNowOpen] = useRecoilState(followingModalState);
  const [keepOpen, setKeepOpen] = useRecoilState(suggestionsListState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(user.username, profile.userId);
      setIsFollowingProfile(!!isFollowing);
    };
    if (user.username && profile.userId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.username, profile.userId]);
  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
    });
    await toggleFollow(isFollowingProfile, user.id, profile.id, profile.userId, user.userId);
  };
  return !profile.image ? (
    <HeadLoader />
  ) : (
    <div className="flex flex-col space-y-1 py-2">
      <div className="flex max-w-sm justify-evenly md:max-w-none md:py-2">
        <img
          src={profile.image}
          alt={profile.username}
          className="mx-4 aspect-square h-24 w-24 rounded-full object-cover sm:h-32 sm:w-32 md:h-40 md:w-40"
        />
        <div className="mr-2 flex flex-col space-y-3 md:ml-5">
          <div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
            <p className="flex items-center justify-between text-xl sm:text-2xl md:text-3xl md:font-light">
              {profile.username}
              <DotsHorizontalIcon className="mr-2 h-5 w-5 md:hidden" />
            </p>
            <div className="flex space-x-2">
              {activeButtonFollow ? (
                <>
                  {isFollowingProfile ? (
                    <button
                      className="text-md w-48 rounded-md border-2 border-gray-200 bg-white py-1 font-semibold text-black hover:bg-gray-200 hover:bg-opacity-40"
                      type="button"
                      onClick={handleToggleFollow}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="text-md w-48 rounded-md border bg-sky-400 py-1 font-semibold text-white hover:bg-sky-500"
                      type="button"
                      onClick={handleToggleFollow}
                    >
                      Follow
                    </button>
                  )}
                </>
              ) : (
                //
                <button
                  className="text-md w-48 rounded-md border-2 border-gray-200 bg-white py-1 font-semibold text-black hover:bg-gray-200 hover:bg-opacity-40 xxs:w-44"
                  type="button"
                  onClick={() => setOpen(true)}
                >
                  Edit Profile
                </button>
              )}
              <button
                className="flex w-9 items-center justify-center rounded-md border-2 border-gray-200 bg-white hover:bg-gray-200 hover:bg-opacity-40"
                type="button"
                onClick={() => setKeepOpen(!keepOpen)}
              >
                {!keepOpen ? (
                  <ChevronDownIcon className="h-5 w-5" />
                ) : (
                  <ChevronUpIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            <p className="hidden items-center md:flex ">
              <DotsHorizontalIcon className="h-5 w-5" />
            </p>
          </div>
          <div className="hidden flex-col space-y-2 md:inline-flex ">
            <p className="text-xl font-semibold ">{profile.fullName}</p>
            <p className="whitespace-pre-line pb-2 text-sm">{profile.bio}</p>
            <div className="flex max-w-sm justify-between text-base text-gray-400">
              <p>
                <span className="text-xl font-semibold text-black">{photosCount}</span>{' '}
                {photosCount === 1 ? `Post` : `Posts`}
              </p>
              <p
                className=" cursor-pointer"
                onClick={() => {
                  setIsOpen(true), setUserId(profile.id);
                }}
              >
                <span className="text-xl font-semibold text-black">{followerCount}</span>{' '}
                {followerCount === 1 ? `Follower` : `Followers`}
              </p>
              <p
                className=" cursor-pointer"
                onClick={() => {
                  setNowOpen(true), setUserId(profile.id);
                }}
              >
                <span className="text-xl font-semibold text-black">{followingCount}</span> Following
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex">
        <SuggestionsList
          userId={user.userId}
          following={user.following}
          loggedInUserDocId={user.id}
        />
      </div>
      <div className="hidden justify-between border-y px-20 pb-1 text-center text-lg font-semibold text-gray-700 md:inline-flex">
        <p className="-mb-1 flex w-16 cursor-pointer flex-col items-center py-1 transition ease-in-out hover:border-t-2 hover:border-gray-700">
          <ViewGridIcon className="-mb-1 h-7 w-7 text-gray-400" /> Posts
        </p>
        <p className="-mb-1 flex w-20 cursor-pointer flex-col items-center py-1 transition ease-in-out hover:border-t-2 hover:border-gray-700">
          <TagIcon className="-mb-1 h-7 w-7 text-gray-400" /> Tagged
        </p>
        <p className="-mb-1 flex w-16 cursor-pointer flex-col items-center py-1 transition ease-in-out hover:border-t-2 hover:border-gray-700">
          <BookmarkIcon className="-mb-1 h-7 w-7 text-gray-400" /> Saved
        </p>
      </div>
      <div className=" mx-6 space-y-2 md:hidden">
        <p className="-ml-2  font-semibold">{profile.fullName}</p>
        <p className=" -ml-2 whitespace-pre-line pb-2 text-sm">{profile.bio}</p>
        <SuggestionsList
          userId={user.userId}
          following={user.following}
          loggedInUserDocId={user.id}
        />
        <div className="-mx-6 flex justify-between border-y px-10 py-2 text-center text-sm font-semibold text-gray-400">
          <p className="flex flex-col">
            <span className="-mb-1 text-lg font-bold text-black">{photosCount}</span>
            {photosCount === 1 ? `Post` : `Posts`}
          </p>
          <p
            className="flex cursor-pointer flex-col"
            onClick={() => {
              setIsOpen(true), setUserId(profile.id);
            }}
          >
            <span className="-mb-1 text-lg font-bold text-black">{followerCount}</span>
            {followerCount === 1 ? `Follower` : `Followers`}
          </p>
          <p
            className="flex cursor-pointer flex-col"
            onClick={() => {
              setNowOpen(true), setUserId(profile.id);
            }}
          >
            <span className="-mb-1 text-lg font-bold text-black">{followingCount}</span>
            Following
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  followingCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    id: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
    image: PropTypes.string,
    bio: PropTypes.string,
    fullName: PropTypes.string,
    following: PropTypes.array
  }).isRequired
};
