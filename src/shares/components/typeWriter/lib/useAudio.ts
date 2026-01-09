import { useMemo } from "react";

export function useKeyboardAudio() {
  const audio = useMemo(() => {
    const keyDown = new Audio("/audio/mouse/mouse_down.mp3");
    keyDown.volume = 0.3;
    return keyDown;
  }, []);

  return audio;
}
