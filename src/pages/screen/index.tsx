import styles from "./style/screen.module.scss";
import { useEffect, useState } from "react";
import Glitch from "./ui/glitch";
import Navigation from "@/widgets/navigation";
import { useDesktopAudio, useMouseAudio } from "@/features/audio/useAudio";
import { usePostMessage } from "./lib/usePostMessage";
import Applications from "@/widgets/applications";
import { Win98Window } from "@/widgets/win98Window";

export default function Screen() {
  const [onScreen, setOnScreen] = useState<boolean>(false);
  const [onControl, setOnControl] = useState<boolean>(false);
  const [isOpenApp, setIsOpenApp] = useState<{ [key: string]: boolean }>({
    internet: false,
  });
  const mouseAudio = useMouseAudio();
  const screenOnOffAudio = useDesktopAudio();

  const wallPaperStyles = `${styles.wallPaper} ${
    onScreen ? styles.screenOn : styles.screenOff
  } ${onControl && styles.onControl}`;

  const oldEffectStyles = `${styles.oldEffect} ${
    onScreen ? styles.screenOn : styles.screenOff
  } ${onControl && styles.onControl}`;

  const OnClose = () => {
    setIsOpenApp((prev) => ({
      ...prev,
      internet: false,
    }));
  };

  usePostMessage(onScreen, setOnScreen, setOnControl);
  console.log(onScreen);
  useEffect(() => {
    screenOnOffAudio();
  }, [onScreen]);

  return (
    <div onMouseDown={mouseAudio} onMouseUp={mouseAudio}>
      <Glitch />
      <div className={oldEffectStyles} />

      <div className={wallPaperStyles}>
        <div className={styles.stillWork}>
          This project is still a work in progress...
        </div>
        <Applications setIsOpenApp={setIsOpenApp} />
        <Navigation setOnScreen={setOnScreen} />

        {isOpenApp.internet && (
          <Win98Window title="To-do-list" onClose={OnClose}>
            <iframe
              id="iframe"
              style={{
                border: "none",
                pointerEvents: "auto",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
                userSelect: "none",
                width: "100%",
                height: "100%",
              }}
              src={`https://21-sprint-mission-xw9a.vercel.app/`}
            />
          </Win98Window>
        )}
      </div>
    </div>
  );
}
