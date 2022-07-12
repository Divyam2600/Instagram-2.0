import { DotsHorizontalIcon, TrashIcon } from "@heroicons/react/outline";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function Header({ username, userImage }) {
  // const deletePhoto = async (photoId) =>{
  //   await deletePost();
  //   document.location.reload();
  // }
  return (
    <div className="flex items-center p-3">
      <img
        src={userImage}
        alt={`${username}`}
        className="rounded-full w-14 h-14 object-cover border-2 border-gray-300 p-[2px] text-center mr-3"
      />
      <Link
        to={`/profile/${username}`}
        className="flex-1 font-semibold text-gray-800"
      >
        <p>{username}</p>
      </Link>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button>
          <DotsHorizontalIcon
            className="h-6 rotate-[90deg] text-gray-600 mr-2"
            aria-hidden="true"
          />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-2 border border-opacity-50 border-gray-100 mt-2 w-36 rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <Menu.Button
                className=" px-4 py-2 text-sm hover:text-red-500 text-red-400 font-semibold w-full flex items-center justify-center"
                // onClick={deletePhoto}
              >
                <TrashIcon className="h-6 w-6 mr-1 -mt-[1px]" />
                Delete Post
              </Menu.Button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default Header;

Header.propTypes = {
  username: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
};
