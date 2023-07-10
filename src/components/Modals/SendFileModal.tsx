import {
  DocumentArrowUpIcon,
  DocumentCheckIcon,
  DocumentDuplicateIcon,
  DocumentPlusIcon,
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
import { sendFileModalState } from "../../atoms/modalAtom";
import Modal from "../Modal";
import {
  getListFiles,
  handleDrag,
  handleDragIn,
  handleDragOut,
  handleDragStart,
  handleDrop,
} from "../../utils";
import { UploadFile } from "../../../typings";
import { sendMediaChat } from "../../services/firebase";
import useUser from "../../hooks/use-user";

type Props = {};

const SendFileModal = (props: Props) => {
  const [open, setOpen] = useRecoilState(sendFileModalState);
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<UploadFile[]>([]);
  const [files, setFiles] = useState<
    {
      url: string;
      type: string;
      name?: string;
    }[]
  >([]);
  const [isDragging, setIsDragging] = useState(false);
  const messageId = useRecoilValue(messageIdState);
  const activeUser = useUser();

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
    await sendMediaChat(selectedFiles, messageId, activeUser?.userId,"file");
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
          name: file.file?.name,
        },
      ])
    );
  }, [selectedFiles]);

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      icon={{
        icon: <DocumentDuplicateIcon className="h-8 w-8" />,
        name: "Send File",
      }}
      clickXIcon={() => {
        setFiles([]);
        setSelectedFiles([]);
        setLoading(false);
      }}
    >
      <div className="space-y-4" {...dragProps}>
        {selectedFiles.length > 0 && files.length > 0 ? (
          <div className="overflow-y-scroll space-y-2 scrollbar-thin max-h-72 pr-1 ">
            {selectedFiles.map(({file}, i) => (
            <div
              key={i}
              className="flex items-center space-x-2 rounded-md border bg-gray-100 p-2"
            >
              <DocumentCheckIcon className="h-8 w-8" />
              <p className="line-clamp-1 w-full">{file?.name}</p>
            </div>
          ))}
          </div>
        ) : (
          <div
            className={`space-y-4 rounded-lg border-2 border-dashed p-4 ${
              isDragging && "border-red-300"
            }`}
          >
            <div className="mx-auto flex max-w-fit items-center justify-center rounded-full bg-red-100 p-2">
              <DocumentArrowUpIcon className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="mx-auto max-w-fit text-xl">Drag Files here</h2>
            <h1 className="mx-auto max-w-fit text-lg font-semibold">OR</h1>
            <div
              onClick={() => filePickerRef.current!.click()}
              className="mx-auto flex max-w-fit cursor-pointer items-center gap-x-2 rounded-full bg-red-100 px-4 py-2 text-lg text-red-500"
            >
              <DocumentPlusIcon className="h-8 w-8 text-red-600" />
              Select From Device
            </div>
          </div>
        )}
        <input
          type="file"
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

export default SendFileModal;
