import React, { Fragment, ReactNode } from "react";
import { SetterOrUpdater } from "recoil";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  children: ReactNode;
  open: boolean;
  setOpen: SetterOrUpdater<boolean>;
  clickXIcon?: () => void;
  icon: {
    icon: JSX.Element;
    name: string;
  };
}

const Modal = ({ children, open, setOpen, clickXIcon, icon }: ModalProps) => {
  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => {
        setOpen(false), clickXIcon && clickXIcon();
      }}
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-[60] overflow-y-auto"
        onClose={setOpen}
      >
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
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
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
                  setOpen(false), clickXIcon && clickXIcon();
                }}
              >
                <XMarkIcon className="h-6 w-6 cursor-pointer text-gray-300" />
              </button>
              <h1 className="flex items-center gap-x-4 text-2xl ">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                  {icon.icon}
                </span>
                {icon.name}
              </h1>
              <hr />
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
