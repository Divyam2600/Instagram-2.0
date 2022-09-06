import React, { useContext } from 'react';
import {
  HomeIcon,
  LoginIcon,
  LogoutIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  SearchIcon
} from '@heroicons/react/outline';
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useRecoilState } from 'recoil';
import { postModalState, searchBarModalState } from '../atoms/modalAtom';
import useUser from '../hooks/use-user';

function Header() {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useRecoilState(postModalState);
  const [isOpen, setIsOpen] = useRecoilState(searchBarModalState);
  const auth = getAuth();
  const {
    user: { username, image, userId, following }
  } = useUser();
  return (
    <div className="fixed top-0 z-50 w-screen border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-evenly">
        {/* Left Side */}
        <Link to={ROUTES.DASHBOARD} className="hidden w-32 cursor-pointer sm:inline-grid">
          <img src="/images/logo.png" alt="Logo" />
        </Link>
        <Link to={ROUTES.DASHBOARD} className="w-12 cursor-pointer sm:hidden">
          <img src="/images/logo-icon.png" alt="Logo" />
        </Link>
        {/* Middle Part */}
        <div className="-mr-1 max-w-[140px] sm:max-w-xs">
          <div className="relative mt-1 mb-1 rounded-md p-3" onClick={() => setIsOpen(true)}>
            <div className="pointer-events-none absolute inset-y-0 flex items-center pl-3">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search for a User ..."
              className="block w-full rounded-md border-2 border-gray-300 bg-gray-100 bg-opacity-50 p-2 pl-10 caret-transparent hover:border-gray-500 focus:outline-none sm:text-base"
            />
          </div>
        </div>
        {/* Right Side */}
        <div className="flex items-center justify-end space-x-1 lg:space-x-3">
          <Link to={ROUTES.DASHBOARD}>
            <HomeIcon className="navButton hidden sm:flex" />
          </Link>
          {user ? (
            <>
              <div className="relative">
                <Link to={`/messages/${userId}`}>
                  <PaperAirplaneIcon className="navButton mb-[6px] rotate-50" />
                </Link>
                {following && (
                  <div className="absolute -top-1 -right-1 h-5 w-5 animate-pulse rounded-full bg-red-500 text-center text-sm text-white">
                    {following.length}
                  </div>
                )}
              </div>
              <PlusCircleIcon onClick={() => setOpen(true)} className="navButton" />
              <Link to={ROUTES.LOGIN}>
                <button
                  type="button"
                  aria-label="Log Out"
                  onClick={() => signOut(auth)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      signOut(auth);
                    }
                  }}
                >
                  <LogoutIcon className="navButton mt-[6px] sm:mt-[1px] " />
                </button>
              </Link>
              <div className="items-center">
                <Link to={`/profile/${username}`}>
                  <img
                    src={image}
                    alt={username}
                    className="mt-1 aspect-square h-10 w-10 rounded-full border-2 border-gray-200 object-cover p-[1px]"
                  />
                </Link>
              </div>
            </>
          ) : (
            <Link
              to={ROUTES.LOGIN}
              className="mt-[6px] flex items-center space-x-2 rounded-md p-2 text-lg font-semibold transition ease-in-out hover:bg-gray-300 hover:bg-opacity-50 sm:mt-[1px]"
            >
              <LoginIcon className="navButton" />
              <span>Log In</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
