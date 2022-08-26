import { MicrophoneIcon } from '@heroicons/react/solid';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { PlayIcon } from '../../../assets/icons/PlayIcon';
import { PauseIcon } from '../../../assets/icons/PauseIcon';
import WaveSurfer from 'wavesurfer.js';
import { useLocation } from 'react-router-dom';

function AudioMessage({ message, image, username, audioId }) {
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState('');
  const [waveFormLoaded, setWaveFormLoaded] = useState(false);
  const waveform = useRef(null);
  const location = useLocation();
  useEffect(() => {
    if (!waveform.current && audioId) {
      waveform.current = WaveSurfer.create({
        container: `#${audioId}`,
        barWidth: 2.8,
        mediaType: 'audio',
        hideScrollbar: true,
        height: 36,
        progressColor: '#ffffff',
        responsive: true,
        waveColor: '#D9DCFF',
        cursorColor: 'transparent',
        scrollParent: true,
        barRadius: 3,
        barGap: 2,
        barMinHeight: 1,
        pixelRatio: 1
      });
      waveform.current.load(message);
      waveform.current.on('ready', () => {
        setWaveFormLoaded(true);
        setDuration(timeCalculator(waveform.current.getDuration()));
      });
      waveform.current.on('audioprocess', () => {
        setDuration(timeCalculator(waveform.current.getCurrentTime()));
      });
      waveform.current.on('finish', () => {
        setDuration(timeCalculator(waveform.current.getDuration()));
        waveform.current.stop();
        setPlaying(false);
      });
    }
  }, [audioId]);
  useEffect(() => {
    waveform.current.pause();
    setPlaying(false);
  }, [location]);
  const timeCalculator = (value) => {
    let second = Math.floor(value % 60);
    const minute = Math.floor((value / 60) % 60);
    if (second < 10) {
      second = '0' + second;
    }
    return minute + ':' + second;
  };
  const playAudio = () => {
    // Check if the audio is already playing
    if (waveform.current.isPlaying()) {
      waveform.current.pause();
      setPlaying(false);
    } else {
      waveform.current.play();
      setPlaying(true);
    }
  };
  return (
    <div
      className={`mb-1 flex h-12 w-[70%] items-center space-x-1 rounded-full bg-blue-800 py-1 px-1 xxs:h-10 xs:h-10 sm:w-[60%] xl:w-[50%] ${
        !waveFormLoaded && 'hidden'
      }`}
    >
      <div className="relative mr-1">
        <img
          src={image}
          alt={username}
          className="aspect-square h-10 w-10 cursor-pointer rounded-full object-cover xxs:h-8 xxs:w-8 xs:h-8 xs:w-8"
        />
        <MicrophoneIcon className="absolute -bottom-[2px] -right-1 h-5 w-5 rounded-full border-2 border-blue-800 bg-white p-[1px] text-blue-800" />
      </div>
      <p onClick={playAudio}>
        {!playing ? (
          <PlayIcon className="-ml-1 mr-1 h-7 w-7 cursor-pointer text-white duration-150 active:scale-0 xxs:h-5 xxs:w-5 xs:h-5 xs:w-5" />
        ) : (
          <PauseIcon className="-ml-1 -mr-2 h-10 w-10 cursor-pointer text-white duration-150 active:scale-0 xxs:h-8 xxs:w-8 xs:h-8 xs:w-8" />
        )}
      </p>

      <div className="flex-1" id={audioId}></div>
      <p className="select-none p-1 text-sm text-white">{duration}</p>
    </div>
  );
}

export default AudioMessage;

AudioMessage.propType = {
  message: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  audioId: PropTypes.string.isRequired
};
