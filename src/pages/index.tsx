import { type NextPage } from "next";
import React, { useRef, useState } from "react";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { PlayIcon, PauseIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

const sound = {
  title: "Oceans by Reaps",
  waveType: "Ocean.mp3",
  imageUrl: "/CalmOceanWaves.png",
};

const Home: NextPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false)
  const [volume, setVolume] = useState(0.6)
  const audioRef = useRef<HTMLAudioElement>(null);
  const Max = 20;


  const toggleAudio = (): void => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false)
    }
    else {
      audioRef.current.play();
      setIsPlaying(true)
    }
  }


  function handleVolume(e: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = e.target;
    const volume = Number(value) / Max;
    console.log(value, volume);
    audioRef.current.volume = volume;

  }

  function handleMute() {
    setIsMute(prev => !prev)
    audioRef.current.muted = isMute;
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="bg-accent flex h-fit max-w-fit flex-col rounded-lg border-2 border-cyan-700 pb-4 text-center shadow">
          <div className="relative flex flex-col space-y-0">
            <Image
              width={200}
              height={200}
              className="mx-auto max-h-48 w-full flex-shrink-0 rounded-t-lg pb-2"
              src={sound.imageUrl}
              alt="waves"
            />
            <button
              onClick={toggleAudio}
              type="button"
              className="absolute right-5 left-0 top-[15%] m-auto w-9 rounded-full p-2 text-white shadow-sm"
            >
              {
                isPlaying ? <PauseIcon className="h-12 w-12" aria-hidden="true" /> : <PlayIcon className="h-12 w-12" aria-hidden="true" />
              }
            </button>
            <dl className="mt-1 flex flex-col p-4 ">
              <dd className="text-lg text-white">{sound.title}</dd>
            </dl>
            <div className="mx-4 flex">
              <input
                type="range"
                className="mr-2 w-full accent-cyan-700"
                min={0}
                max={Max}
                onChange={handleVolume}
              />
              <SpeakerWaveIcon
                className="h-5 w-5 text-white hover:cursor-pointer"
                aria-hidden="true"
                onClick={handleMute}
              />
            </div>
          </div>
        </div>
        <audio ref={audioRef} loop src={"/Ocean.mp3"} />
      </main>
    </>
  )
};

export default Home;
