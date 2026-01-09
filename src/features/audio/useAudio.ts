import { useMemo } from "react";
import React from "react";

export function useDesktopAudio(): () => void {
  const audio = useMemo(() => {
    const desktopOnOff = new Audio("/audio/desktop/desktopStart.mp3");
    desktopOnOff.volume = 0.38;

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

export function useKeyboardAudio() {
  const audio = useMemo(() => {
    const keyDown = new Audio("/audio/mouse/mouse_down.mp3");
    keyDown.volume = 0.3;
    return keyDown;
  }, []);

  return audio;
}

export function useAtmosphereAudio(): () => void {
  const audio = useMemo(() => {
    const desktopOnOff = new Audio("/audio/atmosphere/atmosphere.mp3");
    desktopOnOff.volume = 0.24;
    desktopOnOff.loop = true;
    return desktopOnOff;
  }, []);

  const playEffect = () => {
    audio.play();
  };

  return playEffect;
}
