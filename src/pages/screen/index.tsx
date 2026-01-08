import styles from "./style/screen.module.scss";
import { useState, useEffect } from "react";
import Glitch from "./ui/glitch";
import Navigation from "@/widgets/navigation";

export default function Screen() {
  const [onScreen, setOnScreen] = useState<boolean>(false);
  const [onControl, setOnControl] = useState<boolean>(false);

  const wallPaperStyles = `${styles.wallPaper} ${
    onScreen ? styles.screenOn : styles.screenOff
  } ${onControl && styles.onControl}`;

  const oldEffectStyles = `${styles.oldEffect} ${
    onScreen ? styles.screenOn : styles.screenOff
  } ${onControl && styles.onControl}`;

  //송신
  useEffect(() => {
    window.parent.postMessage(
      {
        type: "SET_SCREEN",
        payload: {
          on: onScreen,
        },
      },
      window.location.origin
    );
  }, [onScreen]);

  //수신
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type !== "DESKTOP_STATE") return;
      if (e.data.payload.on === true) {
        setOnScreen(true);
      }

      setOnControl(e.data.payload.onControl);
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <>
      <Glitch />
      <div className={oldEffectStyles} />
      <div className={wallPaperStyles}>
        <Navigation setOnScreen={setOnScreen} />
      </div>
    </>
  );
}
