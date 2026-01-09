import styles from "./style/screen.module.scss";
import { useState } from "react";
import Glitch from "./ui/glitch";
import Navigation from "@/widgets/navigation";
import { useMouseAudio } from "./lib/useAudio";
import { usePostMessage } from "./lib/usePostMessage";

export default function Screen() {
  const [onScreen, setOnScreen] = useState<boolean>(false);
  const [onControl, setOnControl] = useState<boolean>(false);

  const mouseAudio = useMouseAudio();

  const wallPaperStyles = `${styles.wallPaper} ${
    onScreen ? styles.screenOn : styles.screenOff
  } ${onControl && styles.onControl}`;

  const oldEffectStyles = `${styles.oldEffect} ${
    onScreen ? styles.screenOn : styles.screenOff
  } ${onControl && styles.onControl}`;

  usePostMessage(onScreen, setOnScreen, setOnControl);

  return (
    <div onMouseDown={mouseAudio} onMouseUp={mouseAudio}>
      <Glitch />
      <div className={oldEffectStyles} />
      <div className={wallPaperStyles}>
        <Navigation setOnScreen={setOnScreen} />
      </div>
    </div>
  );
}
