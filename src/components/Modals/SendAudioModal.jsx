import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { sendAudioModalState } from '../../atoms/modalAtom';
import { Dialog, Transition } from '@headlessui/react';
import {
  MicrophoneIcon,
  PaperAirplaneIcon,
  SaveAsIcon,
  TrashIcon,
  UploadIcon,
  XIcon
} from '@heroicons/react/outline';
import useUser from '../../hooks/use-user';
import { sendAudio } from '../../services/firebase';
import { messageIdState } from '../../atoms/idAtom';
import useRecorder from '../../hooks/use-recorder';
import { formatMinutes, formatSeconds } from '../../helpers/format-time';

function SendAudioModal() {
  const [messageId, setMessageId] = useRecoilState(messageIdState);
  const [open, setOpen] = useRecoilState(sendAudioModalState);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const {
    user: { username, image, id }
  } = useUser();
  const audioFileRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const { recorderState, startRecording, saveRecording, cancelRecording } = useRecorder();

  // to push the media message to firebase
  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);
    await sendAudio(messageId, username, image, id, selectedFile);
    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };
  // to display the media to be posted in the modal
  const addMedia = (event) => {
    const reader = new FileReader();
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };
  // for voice recorder
  useEffect(() => {
    if (recorderState.audio) {
      setSelectedFile(recorderState.audio);
    }
  }, [recorderState.audio]);
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
                  setRecording(false);
                  cancelRecording();
                }}
              >
                <XIcon className=" h-6  w-6 cursor-pointer text-gray-300" />
              </button>
              <div as="h3" className="flex items-center space-x-4  text-2xl ">
                <div className=" flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                  <MicrophoneIcon className="mt-[2px] h-8 w-8 text-red-600" />
                </div>
                <span>Send Audio</span>
              </div>
              <hr />
              <div>
                {selectedFile ? (
                  <audio
                    src={selectedFile}
                    controls
                    className="w-full cursor-pointer"
                    controlsList="nodownload"
                  />
                ) : recording ? (
                  <>
                    <h1 className="text-center text-2xl">🎙️Voice Recorder</h1>
                    <div className="mx-auto my-4 flex w-[50%] items-center justify-center space-x-2 text-xl">
                      {recorderState.initRecording && (
                        <div className="h-2 w-2 animate-pulse rounded-full bg-red-400" />
                      )}
                      <p className="flex-1">
                        {`${formatMinutes(recorderState.recordingMinutes)} : ${formatSeconds(
                          recorderState.recordingSeconds
                        )}`}
                      </p>
                      {recorderState.initRecording ? (
                        <button
                          title="Save Recording"
                          onClick={saveRecording}
                          disabled={recorderState.recordingSeconds === 0}
                        >
                          <SaveAsIcon className="box-content h-6 w-6 cursor-pointer rounded-full bg-red-200 p-2 text-red-600" />
                        </button>
                      ) : (
                        <button title="Start Recording" onClick={startRecording}>
                          <MicrophoneIcon className="box-content h-6 w-6 cursor-pointer rounded-full bg-red-200 p-2 text-red-600" />
                        </button>
                      )}
                    </div>
                    {recorderState.initRecording ? (
                      <p className="semibold text-center text-gray-500">
                        Note: Click on the Icon to Save Recording
                      </p>
                    ) : (
                      <p className="semibold text-center text-gray-500">
                        Note: Click on the Icon to Start Recording
                      </p>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center font-semibold">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div
                        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-red-100"
                        onClick={() => setRecording(true)}
                      >
                        <MicrophoneIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                      </div>
                      <p className="text-center text-sm">Click Here to Record your Audio</p>
                    </div>
                    <div className="h-20 w-[1px] bg-gray-400" />
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div
                        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-red-100"
                        onClick={() => {
                          audioFileRef.current.click();
                        }}
                      >
                        <UploadIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                      </div>
                      <p className="text-center text-sm">Click Here to Upload your Audio</p>
                    </div>
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
                              cancelRecording();
                              setRecording(false);
                            }}
                          >
                            <TrashIcon className="h-5 w-5 text-red-600" aria-hidden="true" />
                          </div>
                          <p className="text-sm">Click here to Remove and Reselect</p>
                        </div>
                      ) : null}
                    </Dialog.Title>
                    <div>
                      <input
                        type="file"
                        accept="audio/*"
                        hidden
                        onChange={addMedia}
                        ref={audioFileRef}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    className="disables:bg-gray-400 flex w-full justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-base font-medium text-white shadow-sm duration-200 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 enabled:hover:scale-[1.03] enabled:active:scale-95 disabled:cursor-not-allowed sm:text-sm "
                    onClick={uploadPost}
                    type="button"
                    disabled={!selectedFile}
                  >
                    <PaperAirplaneIcon className="-mt-1 mr-1 h-6 w-6 rotate-50" />
                    {loading ? 'Sending...' : 'Send'}
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

export default SendAudioModal;
