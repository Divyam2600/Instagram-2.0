import { DotsHorizontalIcon, TrashIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import useUser from '../../hooks/use-user';
import { deletePost } from '../../services/firebase';

function Header({ id, username, userImage }) {
  const deletePhoto = async () => {
    await deletePost(id);
    document.location.reload();
  };
  const {
    user: { username: activeUsername, userId }
  } = useUser();
  return (
    <div className="flex items-center p-3">
      <img
        src={userImage}
        alt={username}
        className="mr-3 aspect-square h-14 w-14 rounded-full border-2 border-gray-300 object-cover p-[2px] text-center"
      />
      <Link to={`/profile/${username}`} className="flex-1 font-semibold text-gray-800">
        <p>{username}</p>
      </Link>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button>
          <DotsHorizontalIcon
            className="mr-2 h-6 rotate-[90deg] text-gray-600"
            aria-hidden="true"
          />
        </Menu.Button>
        {activeUsername === username && (
          <Transition
            as={Fragment}
            enter="transition ease-in-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-3 z-50 mt-1 w-36 origin-top-right rounded-md border border-gray-100 border-opacity-50 bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                <Menu.Button
                  className=" flex w-full items-center justify-center px-4 py-2 text-sm font-semibold text-red-400 hover:text-red-500"
                  onClick={deletePhoto}
                >
                  <TrashIcon className="mr-1 -mt-[1px] h-6 w-6" />
                  Delete Post
                </Menu.Button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        )}
      </Menu>
    </div>
  );
}

export default Header;

Header.propTypes = {
  id: PropTypes.string,
  username: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired
};
