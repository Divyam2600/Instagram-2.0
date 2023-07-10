import React, {
  ChangeEvent,
  DragEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowUpOnSquareStackIcon,
  CameraIcon,
  PhotoIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { postModalState } from "../../atoms/modalAtom";
import useUser from "../../hooks/use-user";
import Modal from "../Modal";
import { UploadFile } from "../../../typings";
import {
  getListFiles,
  handleDrag,
  handleDragIn,
  handleDragOut,
  handleDragStart,
  handleDrop,
} from "../../utils";
import CarouselImage from "../CarouselImage";
import { addPostsToFirestore } from "../../services/firebase";

const PostModal = () => {
  const [open, setOpen] = useRecoilState(postModalState);
  const filePickerRef = useRef<HTMLInputElement>(null);
  const captionRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<UploadFile[]>([]);
  const [files, setFiles] = useState<
    {
      url: string;
      type: string;
    }[]
  >([]);
  const [isDragging, setIsDragging] = useState(false);
  const activeUser = useUser();

  const dragProps = {
    onDragStart: handleDragStart,
    onDragOver: handleDrag,
    onDragEnter: (e: DragEvent<HTMLDivElement>) =>
      handleDragIn(e, setIsDragging),
    onDragLeave: (e: DragEvent<HTMLDivElement>) =>
      handleDragOut(e, setIsDragging),
    onDrop: (e: DragEvent<HTMLDivElement>) =>
      handleDrop(e, setIsDragging, addImageToPost),
  };

  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);
    const caption = captionRef.current!.value;
    await addPostsToFirestore(activeUser?.userId, caption, selectedFiles);
    setOpen(false);
    setLoading(false);
    setSelectedFiles([]);
    setFiles([]);
    document.location.reload();
  };

  const addImageToPost = async (files: FileList | null) => {
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
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      icon={{
        icon: <ArrowUpOnSquareStackIcon className="h-8 w-8" />,
        name: "Upload Post",
      }}
      clickXIcon={() => {
        setFiles([]);
        setSelectedFiles([]);
        setLoading(false);
      }}
    >
      <div className="space-y-4" {...dragProps}>
        {selectedFiles.length > 0 && files.length > 0 ? (
          <CarouselImage files={files} />
        ) : (
          <div
            className={`space-y-4 rounded-lg border-2 border-dashed p-4 ${
              isDragging && "border-red-300"
            }`}
          >
            <div className="mx-auto flex max-w-fit items-center justify-center rounded-full bg-red-100 p-2">
              <PhotoIcon className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="mx-auto max-w-fit text-xl">Drag Photos here</h2>
            <h1 className="mx-auto max-w-fit text-lg font-semibold">OR</h1>
            <div
              onClick={() => filePickerRef.current!.click()}
              className="mx-auto flex max-w-fit cursor-pointer items-center gap-x-2 rounded-full bg-red-100 py-2 px-4 text-lg text-red-500"
            >
              <CameraIcon className="h-8 w-8 text-red-600" />
              Select From Device
            </div>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          hidden
          multiple
          onChange={({ target: { files } }: ChangeEvent<HTMLInputElement>) =>
            addImageToPost(files)
          }
          ref={filePickerRef}
        />
        {selectedFiles.length > 0 && files.length > 0 && (
          <Fragment>
            <button
              className="mx-auto flex items-center gap-x-2 rounded-lg bg-red-100 py-2 px-4 text-xl text-red-600"
              onClick={() => {
                setFiles([]);
                setSelectedFiles([]);
              }}
            >
              <TrashIcon className="h-8 w-8" />
              Remove All
            </button>
            <input
              type="text"
              placeholder="Please Enter a Caption"
              ref={captionRef}
              className=" w-full border-none text-center focus:outline-none"
            />
            <button className="submit" onClick={uploadPost} type="button">
              {loading ? "Uploading..." : "Upload Post"}
            </button>
          </Fragment>
        )}
      </div>
    </Modal>
  );
};

export default PostModal;
