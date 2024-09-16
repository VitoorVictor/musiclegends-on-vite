/* eslint-disable react-hooks/exhaustive-deps */
import TimeMusic from "./TimeMusic";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IMusicData } from "../data";

interface IFooterProps {
  songId: number;
}

const Footer: React.FC<IFooterProps> = ({ songId }) => {
  const [musics, setMusics] = useState<IMusicData | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [volumeOld, setVolumeOld] = useState<number>(volume);
  const [repeatMusic, setRepeatMusic] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const serverBaseURL = "http://127.0.0.1:8000/";

  // Fetch music list
  useEffect(() => {
    const fetchMusics = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/musics/${songId}`
        );
        setMusics(response.data);
      } catch (error) {
        console.error("Erro ao buscar as músicas:", error);
      }
    };
    fetchMusics();
  }, [songId]);

  // Play selected song
  // useEffect(() => {
  //   if (audioRef.current && musics.length) {
  //     audioRef.current.src = `${serverBaseURL}${musics[indexMusic].audio_path}`;
  //     audioRef.current.play();
  //   }
  // }, [indexMusic, musics]);

  // Handle end of song
  useEffect(() => {
    if (!audioRef.current || !musics) return;

    const handleSongEnd = () => {
      if (repeatMusic) {
        audioRef.current?.play();
      }
    };

    audioRef.current.addEventListener("ended", handleSongEnd);
    return () => {
      audioRef.current?.removeEventListener("ended", handleSongEnd);
    };
  }, [repeatMusic, musics]);

  // Play/pause functionality
  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Volume and mute control
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  const handleMutedToggle = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      setVolume(volumeOld);
    } else {
      audioRef.current.muted = true;
      setVolumeOld(volume);
      setVolume(0);
    }
    setIsMuted(!isMuted);
  };

  return (
    <footer className="flex flex-col ">
      {musics && (
        <audio
          ref={audioRef}
          preload="auto"
          src={`${serverBaseURL}${musics.audio_path}`}
        ></audio>
      )}
      <TimeMusic audioRef={audioRef} />
      {musics && (
        <main className="bg-dark-10/90 md:h-24 h-36 md:pb-0 md:pt-0 pt-2 pb-4 w-screen flex md:flex-row flex-col justify-around md:items-center text-lg">
          <div className="Infos flex justify-between px-10 md:px-0 md:justify-center gap-2 items-center text-white md:w-80 w-screen h-full ">
            <img
              className="hidden md:flex"
              src="/img/button-favorite.svg"
              alt=""
            />
            <div className="flex justify-start items-center gap-1 group md:hidden w-20">
              <img src="/img/button-favorite.svg" alt="" />
            </div>
            <div className="flex-row items-start md:items-center h-auto text-end md:text-start">
              <h2 className="font-bold text-xl lg:text-2xl">{musics.title}</h2>
              <p className="text-sm">{musics.artist.toUpperCase()}</p>
            </div>
          </div>

          <div className="commands flex justify-center lg:gap-10 md:gap-4 gap-6 items-center w-auto px-4 h-full">

            {/* Play Button*/}
            <button
              onClick={handlePlayPause}
              className="transition duration-300 ease-in-out transform hover:scale-110  flex items-center justify-center"
            >
              {isPlaying ? (
                <svg
                  width="49px"
                  height="49px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-opacity duration-300 ease-in-out"
                >
                  <path
                    d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z"
                    fill="#929292"
                  />
                  <path
                    d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z"
                    fill="#929292"
                  />
                </svg>
              ) : (
                <svg
                  width="49"
                  height="48"
                  viewBox="0 0 49 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-opacity duration-300 ease-in-out"
                >
                  <path
                    d="M14 7.47751V40.5225C14.0049 40.7862 14.0792 41.044 14.2155 41.2698C14.3518 41.4956 14.5452 41.6814 14.7762 41.8086C15.0073 41.9358 15.2678 41.9999 15.5314 41.9943C15.7951 41.9887 16.0527 41.9138 16.2781 41.7769L43.2931 25.2544C43.5089 25.1238 43.6874 24.9397 43.8112 24.72C43.9351 24.5002 44.0001 24.2523 44.0001 24C44.0001 23.7478 43.9351 23.4998 43.8112 23.2801C43.6874 23.0603 43.5089 22.8762 43.2931 22.7456L16.2781 6.22314C16.0527 6.08628 15.7951 6.01128 15.5314 6.00571C15.2678 6.00013 15.0073 6.06418 14.7762 6.19139C14.5452 6.3186 14.3518 6.50448 14.2155 6.73028C14.0792 6.95608 14.0049 7.21382 14 7.47751Z"
                    fill="#EB4848"
                    stroke="#EB4848"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="md:flex justify-center lg:gap-10 gap-4 items-center  w-80 hidden h-full">
             {/* Repeat Button*/}
             <button
              className="hover:scale-110  flex items-center justify-center"
              onClick={() => setRepeatMusic(!repeatMusic)}
            >
              {!repeatMusic ? (
                <svg width="40" height="40" viewBox="0 0 49 48" fill="none">
                  <g clip-path="url(#clip0_299593_4708)">
                    <path
                      d="M39.1667 13.3333V21.3333H31.1667"
                      stroke="#929292"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M35.82 28.0001C34.9533 30.4533 33.3127 32.5584 31.1455 33.9981C28.9784 35.4378 26.4019 36.1342 23.8046 35.9822C21.2072 35.8303 18.7295 34.8383 16.745 33.1557C14.7605 31.4731 13.3766 29.1911 12.8018 26.6535C12.2271 24.116 12.4926 21.4603 13.5585 19.0869C14.6243 16.7134 16.4327 14.7506 18.7111 13.4943C20.9896 12.238 23.6146 11.7562 26.1906 12.1216C28.7667 12.487 31.1542 13.6798 32.9933 15.5201L39.1667 21.3334"
                      stroke="#929292"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_299593_4708">
                      <rect
                        width="32"
                        height="32"
                        fill="white"
                        transform="translate(8.5 8)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              ) : (
                <svg width="40" height="40" viewBox="0 0 49 48" fill="none">
                  <g clip-path="url(#clip0_299593_4708)">
                    <path
                      d="M39.1667 13.3333V21.3333H31.1667"
                      stroke="#EB4848"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M35.82 28.0001C34.9533 30.4533 33.3127 32.5584 31.1455 33.9981C28.9784 35.4378 26.4019 36.1342 23.8046 35.9822C21.2072 35.8303 18.7295 34.8383 16.745 33.1557C14.7605 31.4731 13.3766 29.1911 12.8018 26.6535C12.2271 24.116 12.4926 21.4603 13.5585 19.0869C14.6243 16.7134 16.4327 14.7506 18.7111 13.4943C20.9896 12.238 23.6146 11.7562 26.1906 12.1216C28.7667 12.487 31.1542 13.6798 32.9933 15.5201L39.1667 21.3334"
                      stroke="#EB4848"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_299593_4708">
                      <rect
                        width="32"
                        height="32"
                        fill="white"
                        transform="translate(8.5 8)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </button>
            <div className="flex items-center gap-1 group">
              <button onClick={handleMutedToggle} className="hover:scale-110">
                {!isMuted && volume > 0.01 ? (
                  <svg
                    className="hover:scale-110"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.6665 14.6667L15.9998 20.0001H10.6665V28.0001H15.9998L22.6665 33.3334V14.6667Z"
                      stroke="#929292"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M28.7202 19.2799C29.97 20.5301 30.6721 22.2255 30.6721 23.9932C30.6721 25.761 29.97 27.4564 28.7202 28.7066M33.4269 14.5732C35.5002 17.4999 37.3307 20.4644 37.3307 23.9999C37.3307 27.5354 35.5002 30.4999 33.4269 33.4266C33.4269 33.4266 37.5002 28.0102 37.5002 23.9999C37.5002 19.9896 33.4269 14.5732 33.4269 14.5732Z"
                      stroke="#929292"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    className="hover:scale-110"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M 22.6665 14.6667 L 15.9998 20.0001 H 10.6665 V 28.0001 H 15.9998 L 22.6665 33.3334 V 14.6667 Z Z M 26 27 L 26 27 L 28 29 L 31 26 L 34 29 L 36 27 L 33 24 L 36 21 L 34 19 L 31 22 L 28 19 L 26 21 L 29 24 L 26 27 L 26 27 M 28 27 L 31 24 L 34 27 L 31 24 L 34 21 L 31 24 L 28 21 L 31 24 L 28 27 L 28 27"
                      stroke="#EB4848"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                )}
              </button>
              <input
                className="h-2 
                            appearance-none
                            bg-gray-10 
                            rounded-lg
                            focus:outline-none
                            group-hover:flex 
                            hover:cursor-pointer
                            hover:bg-gray-10/80
                            lg:flex
                            z-50
                            hidden"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
          </div>
        </main>
      )}
    </footer>
  );
};
export default Footer;
