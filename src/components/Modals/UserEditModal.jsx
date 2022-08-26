import React, { Fragment, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userEditModal } from '../../atoms/modalAtom';
import { Dialog, Transition } from '@headlessui/react';
import { CameraIcon, PencilAltIcon, TrashIcon, XIcon } from '@heroicons/react/outline';
import useUser from '../../hooks/use-user';
import {
  doesUsernameExist,
  updateUserAuthDetails,
  updateUserCommentsDetails,
  updateUserDetails,
  updateUserPostDetails
} from '../../services/firebase';
import { useNavigate } from 'react-router-dom';

function UserEditModal() {
  const [open, setOpen] = useRecoilState(userEditModal);
  const [editfullName, setFullName] = useState('');
  const [edituserName, setUserName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [editBio, setEditBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {
    user: { username, fullName, userId, bio, id }
  } = useUser();
  const navigate = useNavigate();
  const filePickerRef = useRef(null);
  // to display the image to be posted in the modal
  const addImageToPost = (event) => {
    const reader = new FileReader();
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  // update users details in firebase
  const updateDetails = async (event) => {
    event.preventDefault();
    const usernameExists = await doesUsernameExist(edituserName);
    if (loading) return;
    else {
      setEditBio(editBio.trim());
      setFullName(editfullName.trim());
      setUserName(edituserName.trim());
      if (!/^[A-Za-z ]+$/.test(editfullName) && editfullName !== '') {
        setError('Invalid Name.');
        setFullName('');
      } else if (!/^[A-Za-z0-9_.]+$/.test(edituserName) && edituserName !== '') {
        setError("Invalid Username. Only alphanumeric characters and '_' and '.' are allowed.");
        setUserName('');
      } else if (!usernameExists.length || editfullName !== '') {
        setLoading(true);
        setUserName(edituserName.toLowerCase());
        await updateUserPostDetails(username, edituserName, selectedFile);
        await updateUserCommentsDetails(username, edituserName, selectedFile);
        await updateUserDetails(
          id,
          userId,
          username,
          fullName,
          bio,
          edituserName,
          editfullName,
          editBio,
          selectedFile
        );

        await updateUserAuthDetails(username, edituserName);
        setTimeout(() => {
          setSelectedFile(null);
          setLoading(false);
          setOpen(false);
          edituserName
            ? (navigate(`/profile/${edituserName}`), document.location.reload())
            : document.location.reload();
        }, 4000);
      } else {
        setUserName('');
        setError('Username already exists. Please choose another one');
      }
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-[60] overflow-y-auto" onClose={setOpen}>
        <div className="m-2 flex min-h-screen items-center  justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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
            <div className="inline-block w-[90%] transform space-y-4 overflow-hidden rounded-lg bg-white p-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:max-w-lg sm:p-6 sm:align-middle">
              <button
                className="float-right outline-none"
                onClick={() => {
                  setOpen(false),
                    setLoading(false),
                    setSelectedFile(null),
                    setFullName(''),
                    setEditBio(''),
                    setUserName(''),
                    setError('');
                }}
              >
                <XIcon className=" h-6  w-6 cursor-pointer text-gray-300" />
              </button>
              <div as="h3" className="flex items-center space-x-3 text-xl sm:text-2xl ">
                <div className=" flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                  <PencilAltIcon className="mt-[2px] h-8 w-8 text-red-600" />
                </div>
                <span>Edit Your Profile</span>
              </div>
              <hr />
              <div className="max-h-96 space-y-3 overflow-y-scroll scrollbar-hide">
                {error && <p className="error-text mx-1 mt-0">{error}</p>}
                <form>
                  <div className="flex space-x-1 xxs:flex-col xxs:space-x-0 ">
                    <input
                      type="text"
                      required
                      aria-label="Enter Your Full Name"
                      placeholder="Edit Full Name"
                      className="mb-1 h-2 w-full rounded-md border-2 border-gray-300 bg-gray-100 bg-opacity-50 py-6 px-2 text-lg text-black scrollbar-hide hover:border-gray-500 focus:outline-none"
                      onChange={({ target }) => {
                        setFullName(target.value), setError();
                      }}
                      value={editfullName}
                    />
                    <input
                      type="text"
                      required
                      aria-label="Enter Your User Name"
                      placeholder="Edit Username"
                      className=" mb-1 h-2 w-full rounded-md border-2 border-gray-300 bg-gray-100 bg-opacity-50 py-6 px-2 text-lg text-black scrollbar-hide hover:border-gray-500 focus:outline-none"
                      onChange={({ target }) => {
                        setUserName(target.value), setError();
                      }}
                      value={edituserName}
                    />
                  </div>
                  <div>
                    <textarea
                      type="text"
                      required
                      aria-label="Enter Your Bio"
                      placeholder="Edit Bio..."
                      className="h-40 w-full resize-none rounded-md border-2 border-gray-300 bg-gray-100 bg-opacity-50 p-2 text-sm text-black scrollbar-hide placeholder:text-lg hover:border-gray-500 focus:outline-none"
                      onChange={({ target }) => {
                        setEditBio(target.value), setError();
                      }}
                      value={editBio}
                      maxLength={200}
                    />
                    <p className="text-sm text-green-600 ">{editBio.length} / 200</p>
                  </div>
                  <div>
                    <p className="mx-1 my-3 text-center text-xl ">
                      Upload / Edit Your Profile Image
                    </p>
                    {selectedFile ? (
                      <img
                        src={selectedFile}
                        alt="Posting Image"
                        className="aspect-square w-full cursor-pointer object-contain"
                        onClick={() => setSelectedFile(null)}
                      />
                    ) : (
                      <div
                        onClick={() => filePickerRef.current.click()}
                        className="mx-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-red-100"
                      >
                        <CameraIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                      </div>
                    )}
                    <div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-semibold leading-6 text-gray-500"
                        >
                          {selectedFile ? (
                            <div className="flex items-center justify-center space-x-2">
                              <div
                                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-red-100"
                                onClick={() => {
                                  setSelectedFile(null);
                                }}
                              >
                                <TrashIcon className="h-5 w-5 text-red-600" aria-hidden="true" />
                              </div>
                              <p className="text-sm">Click here to Remove and Reselect</p>
                            </div>
                          ) : (
                            'Click on the Icon to Select An Image.'
                          )}
                        </Dialog.Title>
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={addImageToPost}
                            ref={filePickerRef}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mx-1 mt-5 mb-1 sm:mt-6">
                      <button
                        className="disables:bg-gray-400 inline-flex w-full justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-base font-medium text-white shadow-sm duration-200 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 enabled:hover:scale-[1.03] enabled:active:scale-95 disabled:cursor-not-allowed sm:text-sm "
                        onClick={updateDetails}
                        type="button"
                        disabled={error}
                      >
                        {loading ? 'Saving Your Details...' : 'Save Details'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default UserEditModal;
