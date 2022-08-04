import React, { Fragment, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { followersModalState } from '../../atoms/modalAtom';
import { userIdState } from '../../atoms/idAtom';
import { Dialog, Transition } from '@headlessui/react';
import { UserGroupIcon, XIcon } from '@heroicons/react/outline';
import { getFollowers } from '../../services/firebase';
import { Link } from 'react-router-dom';

function FollowersModal() {
  const [open, setOpen] = useRecoilState(followersModalState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (open) {
      //to fetch the users who have followed that user
      const getUsers = async () => {
        const result = await getFollowers(userId);
        result.map((res) => {
          setUsers((users) => [...users, res[0]]);
        });
      };
      // to show the list of users who follow the user if his userId is present
      if (userId !== '') {
        getUsers();
      }
    } else {
      setUserId(''), setUsers([]);
    }
  }, [userId, open, setUserId]);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-[60] overflow-y-auto" onClose={setOpen}>
        <div className="m-2 flex min-h-screen items-center  justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0 ">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opactiy-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opactiy-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in-out duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-full max-w-sm transform space-y-4 overflow-hidden rounded-lg bg-white p-6 text-left align-bottom shadow-xl transition-all sm:my-8 sm:align-middle">
              <button className="float-right outline-none" onClick={() => setOpen(false)}>
                <XIcon className=" h-6  w-6 cursor-pointer text-gray-300" />
              </button>
              <div as="h3" className="flex items-center space-x-4  text-2xl ">
                <div className=" flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                  <UserGroupIcon className="mt-[2px] h-8 w-8 text-red-600" />
                </div>
                <span>Followers</span>
              </div>
              <hr />
              <div className="max-h-96 space-y-3 overflow-y-scroll scrollbar-hide">
                {users?.map((user) => (
                  <div className="flex items-center" key={user.id}>
                    <img
                      src={user.image}
                      alt={user.username}
                      className="mr-3 h-14 w-14 rounded-full border-2 border-gray-300 object-cover p-[2px] text-center"
                    />
                    <Dialog.Title as="h3" className="font-bold text-gray-800">
                      <Link to={`/profile/${user.username}`} onClick={() => setOpen(false)}>
                        {user.username}
                      </Link>
                      <p className="-mt-[2px] font-medium text-gray-600 ">{user.fullName}</p>
                    </Dialog.Title>
                  </div>
                ))}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default FollowersModal;
