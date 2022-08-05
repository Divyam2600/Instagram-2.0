import { useEffect, useState } from 'react';
import startRecording from '../handlers/startRecording';
import saveRecording from '../handlers/saveRecording';

const initialState = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false, // to initialize the recorder
  mediaStream: null, // media device provided by mediaDevices.getUserMedia()
  mediaRecorder: null, // instance of MediaReorder
  audio: null // url of the audio
};
function useRecorder() {
  const [recorderState, setRecorderState] = useState(initialState);
  // time management of the recording
  useEffect(() => {
    const maxRecorderTime = 5;
    let recordingInterval = null;
    if (recorderState.initRecording) {
      recordingInterval = setInterval(() => {
        setRecorderState((prevState) => {
          if (prevState.recordingMinutes === maxRecorderTime && prevState.recordingSeconds === 0) {
            clearInterval(recordingInterval);
            return prevState;
          }
          if (prevState.recordingSeconds >= 0 && prevState.recordingSeconds < 59) {
            return {
              ...prevState,
              recordingSeconds: prevState.recordingSeconds + 1
            };
          }
          if (prevState.recordingSeconds === 59) {
            return {
              ...prevState,
              recordingMinutes: prevState.recordingMinutes + 1,
              recordingSeconds: 0
            };
          }
        });
      }, 1000);
    } else clearInterval(recordingInterval);
    return () => clearInterval(recordingInterval);
  });

  // sets the mediaRecorder
  useEffect(() => {
    if (recorderState.mediaStream) {
      setRecorderState((prevState) => ({
        ...prevState,
        mediaRecorder: new MediaRecorder(prevState.mediaStream)
      }));
    }
  }, [recorderState.mediaStream]);

  // convert the blob url to a base64 code
  const blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  // sets the audio
  useEffect(() => {
    const recorder = recorderState.mediaRecorder;
    let chunks = [];
    if (recorder && recorder.state === 'inactive') {
      recorder.start();
      // gets the chunks of voice and pushes into the array
      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      // create the Blob through chunks, encode it to base64 and store it in audio
      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
        const base64 = await blobToBase64(blob);
        chunks = [];
        setRecorderState((prevState) => {
          if (prevState.mediaRecorder) {
            return {
              ...initialState,
              audio: base64
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
    saveRecording: () => saveRecording(recorderState.mediaRecorder)
  };
}

export default useRecorder;
