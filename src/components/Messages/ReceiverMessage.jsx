import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { PauseIcon, PlayIcon } from '@heroicons/react/solid';
import AudioMessage from './AudioMessage';

function ReceiverMessage({ message, image, username, sentAt, isImage, isVideo, isAudio, audioId }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  function playVideo(event) {
    event.preventDefault();
    setPlaying(true);
    videoRef.current.setAttribute('loop', true);
    videoRef.current.play();
  }
  function pauseVideo(event) {
    event.preventDefault();
    setPlaying(false);
    videoRef.current.pause();
  }
  return (
    <>
      <div className="message-container">
        {!isAudio ? (
          <>
            <img
              src={image}
              alt=""
              className="aspect-square h-6 w-6 self-end rounded-full object-cover"
            />
            {!isImage && !isVideo && (
              <span className="absolute top-0 left-[26px] h-0 w-0 border-8 border-blue-500 border-x-transparent border-b-transparent" />
            )}
            <div
              className={`message bg-blue-500 text-white ${
                (isImage || isVideo) &&
                'mb-0 aspect-auto max-w-[50%] cursor-pointer bg-opacity-0 xxs:max-w-[60%] xs:max-w-[60%] lg:max-w-[35%]'
              }`}
            >
              {!isImage && !isVideo && message}
              {isImage && (
                <img
                  src={message}
                  alt={`Sent By ${username}`}
                  className="-ml-2 aspect-square rounded-2xl object-cover"
                />
              )}
              {isVideo && (
                <>
                  <video
                    src={message}
                    preload="true"
                    alt={`Sent By ${username}`}
                    className="-ml-2 rounded-2xl object-cover hover:opacity-80"
                    ref={videoRef}
                  />
                  {!playing ? (
                    <PlayIcon
                      className="absolute top-2 left-[50px] h-9 w-9 cursor-pointer stroke-2 text-white opacity-95 drop-shadow-lg"
                      onClick={playVideo}
                    />
                  ) : (
                    <PauseIcon
                      className="absolute top-2 left-[50px] h-9 w-9 cursor-pointer stroke-2 text-white opacity-95 drop-shadow-lg"
                      onClick={pauseVideo}
                    />
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <AudioMessage message={message} image={image} username={username} audioId={audioId} />
        )}
      </div>
      <p className="message-time ml-11">{moment(sentAt?.toDate()).format('LT')}</p>
    </>
  );
}

export default ReceiverMessage;

ReceiverMessage.propType = {
  message: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  sentAt: PropTypes.object.isRequired,
  isImage: PropTypes.bool.isRequired,
  isVideo: PropTypes.bool.isRequired,
  isAudio: PropTypes.bool.isRequired,
  audioId: PropTypes.string.isRequired
};
