import { useEffect } from "react";

export function useAtmophereAudio() {
  useEffect(() => {
    const audio = new Audio("/audio/atmosphere/atmosphere.mp3");

    audio.loop = true;
    audio.volume = 0.18;
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return null;
}
