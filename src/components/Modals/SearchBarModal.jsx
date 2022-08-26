import React, { Fragment, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { searchBarModalState } from '../../atoms/modalAtom';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/outline';
import { getAllUsers } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';

function SearchBarModal() {
  const [open, setOpen] = useRecoilState(searchBarModalState);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const filteredUsers = query
    ? users.filter((user) => user.username.toLowerCase().includes(query.toLowerCase()))
    : [];
  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getAllUsers();
      setUsers(result);
    };
    fetchUsers();
    function onKeydown(event) {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        setOpen(true);
      } else if (event.escKey) {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', onKeydown);
    return () => {
      window.removeEventListener('keydown', onKeydown);
    };
  }, [open, setOpen]);

  return (
    users && (
      <Transition.Root show={open} as={Fragment} afterLeave={() => setQuery('')}>
        <Dialog as="div" className="fixed inset-0 z-[60] overflow-y-auto" onClose={setOpen}>
          <div className="m-2 flex min-h-screen items-start justify-center px-4 pt-4 pb-20 text-center sm:p-0">
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
              <Combobox
                as="div"
                className="inline-block w-full transform divide-y overflow-hidden rounded-2xl bg-white text-left align-bottom shadow-2xl ring-2 ring-black ring-opacity-10 transition-all sm:my-8 sm:max-w-lg"
                onChange={(username) => {
                  // Navigate the user to the desired profile
                  navigate(`/profile/${username}`);
                  setOpen(false);
                }}
              >
                <div className="flex items-center space-x-3 px-4">
                  <SearchIcon className="h-6 w-6 text-gray-500" />
                  <Combobox.Input
                    className="mt-1 h-12 w-full flex-1 border-none text-base text-gray-900 outline-none placeholder:text-lg placeholder:text-gray-400 focus:ring-0"
                    placeholder="Start your Search ..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                  <button
                    className="h-8 w-10 rounded-lg border border-gray-200 bg-white text-xs font-semibold shadow-sm hover:bg-gray-100 hover:bg-opacity-40"
                    onClick={() => setOpen(false)}
                  >
                    ESC
                  </button>
                </div>
                {filteredUsers.length > 0 && (
                  <Combobox.Options static className="max-h-60 overflow-y-auto py-4">
                    {filteredUsers.map((user) => (
                      <Combobox.Option key={user.id} value={user.username}>
                        {({ active }) => (
                          <div
                            className={`flex items-center space-x-4 py-2 px-6 ${
                              active ? 'bg-gray-200 bg-opacity-40' : 'bg-white'
                            }`}
                          >
                            <img
                              src={user.image}
                              className="aspect-square h-12 w-12 rounded-full border border-gray-200 object-cover shadow-sm"
                              alt={user.username}
                            />
                            <p className="flex flex-col">
                              <span className="font-semibold">{user.username}</span>
                              <span className="-mt-1 font-normal text-gray-500">
                                {user.fullName}
                              </span>
                            </p>
                          </div>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}
                {query && filteredUsers.length === 0 && (
                  <p className="p-4 text-gray-500">No results found.</p>
                )}
              </Combobox>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    )
  );
}

export default SearchBarModal;
