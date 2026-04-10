import styles from "./style/screen.module.scss";
import { useEffect, useState } from "react";
import Glitch from "./ui/glitch";
import Navigation from "@/widgets/navigation";
import { useDesktopAudio, useMouseAudio } from "@/features/audio/useAudio";
import { usePostMessage } from "./lib/usePostMessage";
import Applications from "@/widgets/applications";
import { Win98Window } from "@/widgets/win98Window";
import { useAPPListOnNav } from "@/shares/zustand";
import {
  type APPName,
  type AppOpenStatus,
  INITIAL_APP_STATUS,
  APP_NAMES,
  APP_IFRAME_SRCS,
} from "@/shares/types";

export default function Screen() {
  const [onScreen, setOnScreen] = useState<boolean>(false);
  const [onControl, setOnControl] = useState<boolean>(false);
  const [isOpenApp, setIsOpenApp] = useState<AppOpenStatus>(INITIAL_APP_STATUS);

  const { removeAPPListOnNav } = useAPPListOnNav();
  const mouseAudio = useMouseAudio();
  const screenOnOffAudio = useDesktopAudio();

  const wallPaperStyles = [
    styles.wallPaper,
    onScreen ? styles.screenOn : styles.screenOff,
    onControl && styles.onControl,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClose = (name: APPName) => {
    removeAPPListOnNav(name);
    setIsOpenApp((prev) => ({ ...prev, [name]: false }));
  };

  usePostMessage(onScreen, setOnScreen, setOnControl);

  useEffect(() => {
    if (onScreen) screenOnOffAudio();
  }, [onScreen, screenOnOffAudio]);

  return (
    <div onMouseDown={mouseAudio} onMouseUp={mouseAudio}>
      <Glitch />
      {/*<div className={oldEffectStyles} /> oldEffect 일단 꺼둠 테마상*/}

      <div className={wallPaperStyles}>
        <div className={styles.stillWork}>
          This project is still a work in progress...
        </div>
        <Applications isOpenApp={isOpenApp} setIsOpenApp={setIsOpenApp} />
        <Navigation isOpenApp={isOpenApp} setOnScreen={setOnScreen} />

        {APP_NAMES.map((name) =>
          isOpenApp[name] ? (
            <Win98Window
              key={name}
              name={name}
              onClose={() => handleClose(name)}
              onIframe
              iframeSrc={APP_IFRAME_SRCS[name]}
            />
          ) : null
        )}
      </div>
    </div>
  );
}
