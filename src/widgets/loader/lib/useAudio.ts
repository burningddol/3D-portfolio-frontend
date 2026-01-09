import { useMemo } from "react";

export function useAtmosphereAudio(): () => void {
  const audio = useMemo(() => {
    const desktopOnOff = new Audio("/audio/atmosphere/atmosphere.mp3");
    desktopOnOff.volume = 0.19;
    desktopOnOff.loop = true;
    return desktopOnOff;
  }, []);

  const playEffect = () => {
    audio.play();
  };

  return playEffect;
}
