import React, { Fragment, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { photoDisplayModalState } from "../../atoms/modalAtom";
import { photoIdState } from "../../atoms/idAtom";
import { Dialog, Transition } from "@headlessui/react";
import { HeartIcon, XIcon } from "@heroicons/react/outline";
import { getLikedUsers } from "../../services/firebase";
import { Link } from "react-router-dom";

function PhotoDisplayModal() {
  const [open, setOpen] = useRecoilState(photoDisplayModalState);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[60] overflow-y-auto"
        onClose={setOpen}
      >
        <div className="m-2 flex min-h-screen items-center  justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opactiy-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opactiy-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-full transform space-y-4 overflow-hidden rounded-lg bg-white p-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:max-w-sm sm:p-6 sm:align-middle">
              <button
                className="float-right outline-none"
                onClick={() => setOpen(false)}
              >
                <XIcon className=" h-6  w-6 cursor-pointer text-gray-300" />
              </button>
              <div as="h3" className="flex items-center space-x-4  text-2xl ">
                <div className=" flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                  <HeartIcon className="mt-[2px] h-8 w-8 text-red-600" />
                </div>
                <span>Likes</span>
              </div>
              <hr />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default PhotoDisplayModal;