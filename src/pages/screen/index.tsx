import styles from "./style/screen.module.scss";
import { useEffect, useState } from "react";
import Glitch from "./ui/glitch";
import Navigation from "@/widgets/navigation";
import { useDesktopAudio, useMouseAudio } from "@/features/audio/useAudio";
import { usePostMessage } from "./lib/usePostMessage";
import Applications from "@/widgets/applications";
import { Win98Window } from "@/widgets/win98Window";
import { useAPPListOnNav } from "@/shares/zustand";
import { type APPName } from "@/shares/zustand";

interface APP {
  ToDoSchedular: boolean;
  "Junseok's Book": boolean;
}

const INITIAL_IS_OPEN_APP: APP = {
  ToDoSchedular: false,
  "Junseok's Book": false,
};

export default function Screen() {
  const [onScreen, setOnScreen] = useState<boolean>(false);
  const [onControl, setOnControl] = useState<boolean>(false);
  const [isOpenApp, setIsOpenApp] = useState<APP>(INITIAL_IS_OPEN_APP);

  const { removeAPPListOnNav } = useAPPListOnNav();

  const mouseAudio = useMouseAudio();
  const screenOnOffAudio = useDesktopAudio();

  const wallPaperStyles = `${styles.wallPaper} ${
    onScreen ? styles.screenOn : styles.screenOff
  } ${onControl && styles.onControl}`;

  const oldEffectStyles = `${styles.oldEffect} ${
    onScreen ? styles.screenOn : styles.screenOff
  } ${onControl && styles.onControl}`;

  const OnClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as APPName;
    removeAPPListOnNav(name);
    setIsOpenApp((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  usePostMessage(onScreen, setOnScreen, setOnControl);

  useEffect(() => {
    if (onScreen) screenOnOffAudio();
  }, [onScreen]);

  return (
    <div onMouseDown={mouseAudio} onMouseUp={mouseAudio}>
      <Glitch />
      <div className={oldEffectStyles} />

      <div className={wallPaperStyles}>
        <div className={styles.stillWork}>
          This project is still a work in progress...
        </div>
        <Applications isOpenApp={isOpenApp} setIsOpenApp={setIsOpenApp} />
        <Navigation isOpenApp={isOpenApp} setOnScreen={setOnScreen} />

        {isOpenApp.ToDoSchedular && (
          <Win98Window
            name="ToDoSchedular"
            onClose={OnClose}
            onIframe
            iframeSrc="https://21-sprint-mission-xw9a.vercel.app/"
          />
        )}

        {isOpenApp["Junseok's Book"] && (
          <Win98Window
            name="Junseok's Book"
            onClose={OnClose}
            onIframe
            iframeSrc="https://win98-memobook.vercel.app/"
          />
        )}
      </div>
    </div>
  );
}
