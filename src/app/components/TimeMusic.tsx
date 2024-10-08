import React, { useState, useEffect, useRef } from 'react';

type TimeMusicProps = {
  audioRef: React.RefObject<HTMLAudioElement>;
};

const TimeMusic: React.FC<TimeMusicProps> = ({ audioRef }) => {
  
  const [currentTime, setCurrentTime] = useState<string>('0:00');
  const [duration, setDuration] = useState<string>('0:00');
  const [progress, setProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Reference for progress bar
  const progressRef = useRef<HTMLDivElement>(null);

  const formatZero = (n: number) => (n < 10 ? '0' + n : n);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateTime = () => {
    if (audioRef.current) {
      const currentMinutes: number = Math.floor(audioRef.current.currentTime / 60);
      const currentSeconds: number = Math.floor(audioRef.current.currentTime % 60);
      setCurrentTime(currentMinutes + ':' + formatZero(currentSeconds));

      const durationFormatted: number = isNaN(audioRef.current.duration) ? 0 : audioRef.current.duration;
      const durationMinutes: number = Math.floor(durationFormatted / 60);
      const durationSeconds: number = Math.floor(durationFormatted % 60);
      setDuration(durationMinutes + ':' + formatZero(durationSeconds));

      const progressWidth: number = durationFormatted
        ? (audioRef.current.currentTime / durationFormatted) * 100
        : 0;
      setProgress(progressWidth);
    }
  };
  

  useEffect(() => {
    const currentAudio = audioRef.current;
    if (currentAudio) {
      currentAudio.addEventListener('timeupdate', updateTime);
      currentAudio.addEventListener('loadedmetadata', updateTime);
    }

    return () => {
      if (currentAudio) {
        currentAudio.removeEventListener('timeupdate', updateTime);
        currentAudio.removeEventListener('loadedmetadata', updateTime);
      }
    };
  }, [audioRef, isDragging, updateTime]);


  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('Progress bar clicked');
    if (audioRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      console.log('Progress bar bounding rect:', rect);
      const clickX = e.clientX - rect.left; // X position within the element
      const width = rect.width;
      const newTime = (clickX / width) * (audioRef.current.duration || 0);
      console.log('New time from click:', newTime);
      audioRef.current.currentTime = newTime; // Update audio time
      console.log('Audio currentTime after click:', audioRef.current.currentTime);
      updateTime(); // Manually update time after seek
    }
  };

  //ta legal
  const handleMouseDown = () => {
    setIsDragging(true);
  };
  //ta legal
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && audioRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const offsetX = Math.min(Math.max(e.clientX - rect.left, 0), rect.width); // Constrain within progress bar
      const width = rect.width;
      const newTime = (offsetX / width) * (audioRef.current.duration || 0);
      audioRef.current.currentTime = newTime;
      updateTime();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && audioRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const touchX = e.touches[0].clientX - rect.left;
      const offsetX = Math.min(Math.max(touchX, 0), rect.width); // Constrain within progress bar
      const width = rect.width;
      const newTime = (offsetX / width) * (audioRef.current.duration || 0);
      audioRef.current.currentTime = newTime;
      updateTime();
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleTouchMove]);

  return (
    <div className="flex-row items-end md:translate-y-6">
      <div className="time-song md:hidden flex items-center justify-between px-2 mx-2 translate-y-1 mb-4 md:mb-0">
        <span className="current-time text-white select-none">{currentTime}</span>
        <span className="duration-time text-white select-none">{duration}</span>
      </div>

      <div
        ref={progressRef}
        className="line-song w-full bg-white h-2 text-white flex relative cursor-pointer"
        onClick={handleProgressClick}
      >
        <div
          className="bg-brand-color h-2 absolute left-0 top-0 hover:shadow-[0px_0px_15px_1px_rgba(235,72,72,1)]"
          style={{ width: `${progress}%` }}
        ></div>

        <span
          className="ball-song bg-brand-color h-4 w-4 rounded-full -translate-y-1 hover:shadow-[0px_0px_15px_1px_rgba(235,72,72,1)] absolute cursor-pointer"
          style={{ left: `clamp(0px, calc(${progress}% - 8px), calc(100% - 16px))` }} // Ensure the ball stays within the bar
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        ></span>
      </div>

      <div className="time-song md:flex items-center justify-between px-2 mx-2 translate-y-1 mb-4 md:mb-0 hidden">
        <span className="current-time text-white select-none">{currentTime}</span>
        <span className="duration-time text-white select-none">{duration}</span>
      </div>
    </div>
  );
};

export default TimeMusic;
