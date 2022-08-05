async function startRecording(setRecorderState) {
  try {
    // fetch user's consent to allow access to microphone
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setRecorderState((prevState) => ({
      ...prevState,
      initRecording: true,
      mediaStream: stream
    }));
  } catch (error) {
    console.log(error);
  }
}

export default startRecording;
