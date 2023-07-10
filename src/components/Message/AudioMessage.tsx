import React, {
  LegacyRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Message } from "../../../typings";
import WaveSurfer from "wavesurfer.js";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";

const AudioMessage = ({ message, id: audioId }: Message) => {
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState("");
  const [waveFormLoaded, setWaveFormLoaded] = useState(false);
  const waveform = useRef<WaveSurfer | null>(null);
  useEffect(() => {
    if (!waveform.current && audioId) return;

    waveform.current = WaveSurfer.create({
      container: `#${audioId}`,
      height: 30,
      barWidth: 2.5,
      barRadius: 3,
      barGap: 2,
      barHeight: 1,
      hideScrollbar: true,
      progressColor: "#ffffff",
      waveColor: "#D9DCFF",
      cursorColor: "transparent",
      autoScroll: true,
    });

    waveform.current.load(message!);
    waveform.current.on("ready", () => {
      setWaveFormLoaded(true);
      setDuration(timeCalculator(waveform.current?.getDuration() ?? 0));
    });
    waveform.current.on("audioprocess", () => {
      setDuration(timeCalculator(waveform.current?.getCurrentTime() ?? 0));
    });
    waveform.current.on("finish", () => {
      setDuration(timeCalculator(waveform.current?.getDuration() ?? 0));
      waveform.current?.stop();
      setPlaying(false);
    });

    return () => {
      waveform.current?.destroy();
    };
  }, [audioId]);

  useEffect(() => {
    if (!waveform) return;

    setDuration("0");
    setPlaying(false);

    const subscriptions = [
      waveform.current?.on("play", () => setPlaying(true)),
      waveform.current?.on("pause", () => setPlaying(false)),
      waveform.current?.on("timeupdate", (currentTime) =>
        setDuration(timeCalculator(currentTime ?? 0))
      ),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub?.());
    };
  }, [waveform.current]);

  const timeCalculator = (value: number): string => {
    let second = Math.floor(value % 60);
    const minute = Math.floor((value / 60) % 60);
    return minute + ":" + (second < 10 ? "0" + second : second);
  };

  const playAudio = useCallback(() => {
    waveform.current?.isPlaying()
      ? waveform.current?.pause()
      : waveform.current?.play();
  }, [waveform.current]);

  return (
    <div
      className={`relative w-48 flex-shrink-0 bg-blue-800 px-1 py-2 pb-4 ${
        !waveFormLoaded && "hidden"
      }`}
    >
      <div className="flex items-center space-x-1">
        <button className="outline-none" onClick={playAudio}>
          {!playing ? (
            <PlayIcon className="animate-large h-8 w-8 text-white drop-shadow-lg" />
          ) : (
            <PauseIcon className="animate-large h-8 w-8 text-white drop-shadow-lg" />
          )}
        </button>
        <div
          className="flex-1"
          ref={waveform as LegacyRef<HTMLDivElement>}
          id={audioId}
        ></div>
      </div>
      <span className="absolute -bottom-1 left-9 select-none p-1 align-top text-[11px] leading-4 tracking-wide text-white ">
        {duration}
      </span>
    </div>
  );
};

export default AudioMessage;
