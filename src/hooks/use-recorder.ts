import { useEffect, useState } from "react";
import { RecorderState } from "../../typings";
import {
  blobToBase64,
  getBase64,
  saveRecording,
  startRecording,
} from "../utils";

const initialState: RecorderState = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false, // to initialize the recorder
  mediaStream: null, // media device provided by mediaDevices.getUserMedia()
  mediaRecorder: null, // instance of MediaReorder
  audio: null, // url of the audio
  type: null, // type of the audio
};

const useRecorder = () => {
  const [recorderState, setRecorderState] =
    useState<RecorderState>(initialState);

  // time management of the recording
  useEffect(() => {
    const maxRecorderTime = 5;
    let recordingInterval: string | number | NodeJS.Timeout | undefined =
      undefined;
    if (recorderState.initRecording) {
      recordingInterval = setInterval(() => {
        setRecorderState((prevState) => {
          if (
            prevState.recordingSeconds >= 0 &&
            prevState.recordingSeconds < 59
          ) {
            return {
              ...prevState,
              recordingSeconds: prevState.recordingSeconds + 1,
            };
          } else if (prevState.recordingSeconds === 59) {
            return {
              ...prevState,
              recordingMinutes: prevState.recordingMinutes + 1,
              recordingSeconds: 0,
            };
          } else if (prevState.recordingMinutes === maxRecorderTime) {
            prevState.mediaRecorder?.stop();
          }
          return prevState;
        });
      }, 1000);
    } else clearInterval(recordingInterval);
    return () => clearInterval(recordingInterval);
  }, [recorderState.initRecording, recorderState.mediaRecorder]);

  // sets the mediaRecorder
  useEffect(() => {
    recorderState.mediaStream &&
      setRecorderState((prevState) => ({
        ...prevState,
        mediaRecorder: new MediaRecorder(prevState.mediaStream!),
      }));
  }, [recorderState.mediaStream]);

  // sets the audio
  useEffect(() => {
    const recorder = recorderState.mediaRecorder;
    let chunks: BlobPart[] = [];
    if (recorder && recorder.state === "inactive") {
      recorder.start();
      // gets the chunks of voice and pushes into the array
      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      // create the Blob through chunks, encode it to base64 and store it in audio
      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        const base64 = await blobToBase64(blob);
        chunks = [];
        setRecorderState((prevState) => {
          if (prevState.mediaRecorder) {
            return {
              ...initialState,
              audio: base64,
              type: "audio/ogg",
            };
          } else return initialState;
        });
      };
    }
    return () => {
      if (recorder) {
        recorder.stream.getAudioTracks().forEach((track) => track.stop());
      }
    };
  }, [recorderState.mediaRecorder]);

  return {
    recorderState,
    startRecording: () => startRecording(setRecorderState),
    cancelRecording: () => setRecorderState(initialState),
    saveRecording: () => saveRecording(recorderState.mediaRecorder),
  };
};

export default useRecorder;
