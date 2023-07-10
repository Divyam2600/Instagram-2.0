import {
  ArrowUpOnSquareStackIcon,
  BookmarkIcon,
  MicrophoneIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, {
  ChangeEvent,
  DragEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { messageIdState } from "../../atoms/idAtom";
import { sendAudioModalState } from "../../atoms/modalAtom";
import Modal from "../Modal";
import {
  formatMinutes,
  formatSeconds,
  getListFiles,
  handleDrag,
  handleDragIn,
  handleDragOut,
  handleDragStart,
  handleDrop,
} from "../../utils";
import { UploadFile } from "../../../typings";
import CarouselImage from "../CarouselImage";
import { sendMediaChat } from "../../services/firebase";
import useUser from "../../hooks/use-user";
import useRecorder from "../../hooks/use-recorder";

type Props = {};

const SendAudioModal = (props: Props) => {
  const [open, setOpen] = useRecoilState(sendAudioModalState);
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<UploadFile[]>([]);
  const [files, setFiles] = useState<
    {
      url: string;
      type: string;
    }[]
  >([]);
  const [isDragging, setIsDragging] = useState(false);
  const messageId = useRecoilValue(messageIdState);
  const activeUser = useUser();
  const { recorderState, startRecording, saveRecording, cancelRecording } =
    useRecorder();
  const [isRecording, setIsRecording] = useState(false);

  const dragProps = {
    onDragStart: handleDragStart,
    onDragOver: handleDrag,
    onDragEnter: (e: DragEvent<HTMLDivElement>) =>
      handleDragIn(e, setIsDragging),
    onDragLeave: (e: DragEvent<HTMLDivElement>) =>
      handleDragOut(e, setIsDragging),
    onDrop: (e: DragEvent<HTMLDivElement>) =>
      handleDrop(e, setIsDragging, addFilesToUpload),
  };

  const sendFiles = async () => {
    if (loading) return;
    setLoading(true);
    await sendMediaChat(selectedFiles, messageId, activeUser?.userId);
    setOpen(false);
    setLoading(false);
    setSelectedFiles([]);
    setFiles([]);
  };

  const addFilesToUpload = async (files: FileList | null) => {
    if (!files) return;
    setSelectedFiles(await getListFiles(files));
  };

  useEffect(() => {
    selectedFiles?.map((file) =>
      setFiles((files) => [
        ...files,
        {
          url: file.dataURL!,
          type: file.file?.type!,
        },
      ])
    );
  }, [selectedFiles]);

  useEffect(() => {
    if (recorderState.audio) {
      setSelectedFiles((files) => [
        ...files,
        {
          dataURL: String(recorderState.audio),
        },
      ]);
    }
  }, [recorderState]);

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      icon={{
        icon: <MicrophoneIcon className="h-8 w-8" />,
        name: "Send Audio",
      }}
      clickXIcon={() => {
        setFiles([]);
        setSelectedFiles([]);
        cancelRecording();
        setIsRecording(false);
        setLoading(false);
      }}
    >
      <div className="space-y-4" {...dragProps}>
        {selectedFiles.length > 0 && files.length > 0 ? (
          <audio
            src={selectedFiles[0].dataURL}
            controls
            className="w-full cursor-pointer"
            controlsList="nodownload"
          />
        ) : isRecording ? (
          <>
            <h1 className="text-center text-2xl">🎙️Voice Recorder</h1>
            <div className="mx-auto my-4 flex w-[50%] items-center justify-center space-x-2 text-xl">
              {recorderState.initRecording && (
                <div className="h-2 w-2 animate-pulse rounded-full bg-red-400" />
              )}
              <p className="flex-1">
                {`${formatMinutes(
                  recorderState.recordingMinutes
                )} : ${formatSeconds(recorderState.recordingSeconds)}`}
              </p>
              {recorderState.initRecording ? (
                <button
                  title="Save Recording"
                  onClick={saveRecording}
                  disabled={recorderState.recordingSeconds === 0}
                >
                  <BookmarkIcon className="box-content h-6 w-6 cursor-pointer rounded-full bg-red-200 p-2 text-red-600" />
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
          <div
            className={`space-y-4 rounded-lg border-2 border-dashed p-4 ${
              isDragging && "border-red-300"
            }`}
          >
            <div
              className="mx-auto flex max-w-fit cursor-pointer items-center justify-center rounded-full bg-red-100 p-2"
              onClick={() => setIsRecording(true)}
            >
              <MicrophoneIcon className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="mx-auto max-w-fit text-xl">Record Your Audio</h2>
            <h1 className="mx-auto max-w-fit text-lg font-semibold">OR</h1>
            <div
              onClick={() => filePickerRef.current!.click()}
              className="mx-auto flex max-w-fit cursor-pointer items-center gap-x-2 rounded-full bg-red-100 px-4 py-2 text-lg text-red-500"
            >
              <ArrowUpOnSquareStackIcon className="h-8 w-8 text-red-600" />
              Upload From Device
            </div>
          </div>
        )}
        <input
          type="file"
          accept="audio/*"
          hidden
          multiple
          onChange={({ target: { files } }: ChangeEvent<HTMLInputElement>) =>
            addFilesToUpload(files)
          }
          ref={filePickerRef}
        />
        {selectedFiles.length > 0 && files.length > 0 && (
          <Fragment>
            <button
              className="mx-auto flex items-center gap-x-2 rounded-lg bg-red-100 px-4 py-2 text-xl text-red-600"
              onClick={() => {
                setFiles([]);
                setSelectedFiles([]);
                cancelRecording();
                setIsRecording(false);
              }}
            >
              <TrashIcon className="h-8 w-8" />
              Remove All
            </button>
            <button className="submit" onClick={sendFiles} type="button">
              {loading ? "Sending..." : "Send"}
            </button>
          </Fragment>
        )}
      </div>
    </Modal>
  );
};

export default SendAudioModal;
