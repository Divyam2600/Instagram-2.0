import { Dispatch, DragEvent, SetStateAction } from "react";
import { RecorderState, UploadFile } from "../typings";

export const getBase64 = (file: File): Promise<string> => {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.addEventListener("load", () => resolve(String(reader.result)));
    reader.readAsDataURL(file);
  });
};

export const getListFiles = async (files: FileList) => {
  const promiseFiles: Array<Promise<string>> = [];
  for (let i = 0; i < files.length; i += 1) {
    promiseFiles.push(getBase64(files[i]));
  }
  return Promise.all(promiseFiles).then((fileListBase64: Array<string>) => {
    const fileList: UploadFile[] = fileListBase64.map((base64, index) => ({
      ["dataURL"]: base64,
      file: files[index],
    }));
    return fileList;
  });
};

export const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
  e.dataTransfer.clearData();
};
export const handleDrag = (e: DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
};
export const handleDragIn = (
  e: DragEvent<HTMLDivElement>,
  setIsDragging: Dispatch<SetStateAction<boolean>>
) => {
  e.preventDefault();
  e.stopPropagation();
  e.dataTransfer.items &&
    e.dataTransfer.items.length > 0 &&
    setIsDragging(true);
};
export const handleDragOut = (
  e: DragEvent<HTMLDivElement>,
  setIsDragging: Dispatch<SetStateAction<boolean>>
) => {
  e.preventDefault();
  e.stopPropagation();
  setIsDragging(false);
};

export const handleDrop = (
  e: DragEvent<HTMLDivElement>,
  setIsDragging: Dispatch<SetStateAction<boolean>>,
  addFiles: (files: FileList | null) => Promise<void>
) => {
  e.preventDefault();
  e.stopPropagation();
  setIsDragging(false);
  e.dataTransfer.files &&
    e.dataTransfer.files.length > 0 &&
    addFiles(e.dataTransfer.files);
};

export const startRecording = async (
  setRecorderState: Dispatch<SetStateAction<RecorderState>>
) => {
  try {
    // fetch user's consent to allow access to microphone
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setRecorderState((prevState) => ({
      ...prevState,
      initRecording: true,
      mediaStream: stream,
    }));
  } catch (error) {
    console.log(error);
  }
};

export const blobToBase64 = (
  blob: Blob
): Promise<string | ArrayBuffer | null> => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

export const saveRecording = (recorder: MediaRecorder | null) => {
  recorder?.state !== "inactive" && recorder?.stop();
};

export const formatMinutes = (minutes: number) => {
  return minutes < 10 ? `0${minutes}` : minutes;
};

export const formatSeconds = (seconds: number) => {
  return seconds < 10 ? `0${seconds}` : seconds;
};
