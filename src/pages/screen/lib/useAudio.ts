import { useMemo } from "react";
import React from "react";

export function useMouseAudio(): (e: React.MouseEvent) => void {
  const audios = useMemo(() => {
    const mousedown = new Audio("/audio/mouse/mouse_down.mp3");
    mousedown.volume = 0.35;
    const mouseup = new Audio("/audio/mouse/mouse_up.mp3");
    mouseup.volume = 0.35;
    return [mousedown, mouseup];
  }, []);

  const playEffect = (e: React.MouseEvent) => {
    audios.forEach((audio) => (audio.currentTime = 0));
    if (e.type === "mousedown") audios[0].play();
    else if (e.type === "mouseup") audios[1].play();
  };

  return playEffect;
}
