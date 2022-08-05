import React, { Fragment, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { postModalState } from '../../atoms/modalAtom';
import { Dialog, Transition } from '@headlessui/react';
import { CameraIcon, CloudUploadIcon, TrashIcon, XIcon } from '@heroicons/react/outline';
import useUser from '../../hooks/use-user';
import { addPostsToFirestore } from '../../services/firebase';

function PostModal() {
  const [open, setOpen] = useRecoilState(postModalState);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const {
    user: { username, image, userId }
  } = useUser();
  // to push the post to firebase
  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);
    const caption = captionRef.current.value;
    await addPostsToFirestore(userId, username, image, caption, selectedFile);
    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
    document.location.reload();
  };
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

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="absolute inset-0 z-[60] overflow-y-auto" onClose={setOpen}>
        <div className="m-2 flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0 ">
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
              <button
                className="float-right outline-none"
                onClick={() => {
                  setOpen(false), setLoading(false), setSelectedFile(null);
                }}
              >
                <XIcon className=" h-6  w-6 cursor-pointer text-gray-300" />
              </button>
              <div as="h3" className="flex items-center space-x-4  text-2xl ">
                <div className=" flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                  <CloudUploadIcon className="mt-[2px] h-8 w-8 text-red-600" />
                </div>
                <span>Upload Post</span>
              </div>
              <hr />
              <div>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    alt="Posting Image"
                    className="w-full cursor-pointer object-contain"
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
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-500">
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
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Please Enter a Caption"
                        ref={captionRef}
                        className=" w-full border-none text-center focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    className="disables:bg-gray-400 inline-flex w-full justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-base font-medium text-white shadow-sm duration-200 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 enabled:hover:scale-[1.03] enabled:active:scale-95 disabled:cursor-not-allowed sm:text-sm "
                    onClick={uploadPost}
                    type="button"
                    disabled={!selectedFile}
                  >
                    {loading ? 'Uploading...' : 'Upload Post'}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default PostModal;
