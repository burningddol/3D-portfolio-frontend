import styles from "./style/screen.module.scss";
import { useState, useEffect } from "react";

export default function Screen() {
  const [onScreen, setOnScreen] = useState<boolean>(false);

  const wallPaperStyles = `${styles.wallPaper} ${
    onScreen ? styles.screenOn : styles.screenOff
  }`;

  const oldEffectStyles = `${styles.oldEffect} ${
    onScreen ? styles.screenOn : styles.screenOff
  }`;

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type !== "DESKTOP_STATE") return;

      setOnScreen(e.data.payload.on);
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  console.log(onScreen);
  return (
    <>
      <div className={oldEffectStyles} />
      <div className={wallPaperStyles}>
        <div className={styles.nav}>d</div>
      </div>
    </>
  );
}
