import { useMemo } from "react";

export function useDesktopAudio(): () => void {
  const audio = useMemo(() => {
    const desktopOnOff = new Audio("/audio/desktop/desktopStart.mp3");
    desktopOnOff.volume = 0.35;

    return desktopOnOff;
  }, []);

  const playEffect = () => {
    audio.currentTime = 0;
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 800);
  };

  return playEffect;
}
