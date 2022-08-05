function saveRecording(recorder) {
  if (recorder.state !== 'inactive') {
    recorder.stop();
  }
}

export default saveRecording;
