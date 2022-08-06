import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { photoDisplayModalState } from '../../atoms/modalAtom';
import { photoIdState } from '../../atoms/idAtom';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { getPhoto } from '../../services/firebase';
import Header from '../Feed/Header';
import Image from '../Feed/Image';
import Buttons from '../Feed/Buttons';
import Captions from '../Feed/Captions';
import Comments from '../Feed/Comments';
import useUser from '../../hooks/use-user';

function PhotoDisplayModal() {
  const [open, setOpen] = useRecoilState(photoDisplayModalState);
  const [photoId, setPhotoId] = useRecoilState(photoIdState);
  const [photo, setPhoto] = useState(null);
  const {
    user: { userId = '' }
  } = useUser();
  useEffect(() => {
    if (open) {
      const photoObject = async () => {
        const photos = await getPhoto(photoId, userId);
        setPhoto(photos);
        // photo && setToggledLiked(photo.userLikedPhoto);
        // photo && setLikes(photo.likes.length);
      };
      if (photoId) {
        photoObject();
      }
    } else {
      setPhotoId('');
      setPhoto(null);
    }
  }, [photoId, open, setPhotoId, userId]);
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
            <div className="inline-block w-full max-w-sm transform space-y-4 overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:align-middle md:max-w-2xl ">
              <button
                className="float-right -ml-8 cursor-pointer p-2 outline-none "
                onClick={() => {
                  setOpen(false), setPhoto(null);
                }}
              >
                <XIcon className=" h-6 w-6 text-gray-300" />
              </button>
              {photo && <Photo photoId={photoId} photo={photo} />}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default PhotoDisplayModal;

export function Photo({ photoId, photo }) {
  const [toggledLiked, setToggledLiked] = useState(photo.userLikedPhoto);
  const [likes, setLikes] = useState(photo.likes?.length);
  const handleFocus = () => commentInput.current.focus();
  const commentInput = useRef(null);
  return (
    <div className="divide-y md:flex md:space-y-6 md:divide-y-0">
      <div className="md:-mr-1 md:border-r">
        <Header id={photoId} username={photo.username} userImage={photo.userImage} />
        <Image
          src={photo.imageSrc}
          caption={photo.caption}
          id={photoId}
          toggledLiked={toggledLiked}
          setToggledLiked={setToggledLiked}
          likes={likes}
          setLikes={setLikes}
        />
        <Buttons
          id={photoId}
          handleFocus={handleFocus}
          toggledLiked={toggledLiked}
          setToggledLiked={setToggledLiked}
          likes={likes}
          setLikes={setLikes}
        />
        <Captions caption={photo.caption} username={photo.username} />
      </div>
      <div className="items-end md:ml-1 md:flex">
        <Comments id={photoId} postedAt={photo.timestamp} commentInput={commentInput} />
      </div>
    </div>
  );
}
