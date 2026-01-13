import { createPortal } from "react-dom";
import styles from "./style/loader.module.scss";
import { useState, useEffect } from "react";
import ProgressBar from "./ui/progressBar";
import { useProject } from "@/shares/zustand";
import { useAtmosphereAudio, useWhooshAudio } from "@/features/audio/useAudio";
import useDebouncedLoader from "./lib/useDebouncedLoader";

export default function Loader() {
  const [isShowLoader, setIsShowLoader] = useState<boolean>(true);
  const [filteredProgress, setFilteredProgress] = useState<number>(0);

  const { isShowBtn, progress } = useDebouncedLoader(700);
  const { setOnProject } = useProject();

  const percent: number = Math.floor(filteredProgress);

  const playAtmosphereAudio = useAtmosphereAudio();
  const playWhooshAudio = useWhooshAudio();

  const handleClick = (): void => {
    setIsShowLoader(false);
    setOnProject(true);
    playAtmosphereAudio();
    playWhooshAudio();
  };

  useEffect(() => {
    setFilteredProgress((prev) => Math.max(prev, progress));
  }, [progress]);

  if (!isShowLoader) return;
  return createPortal(
    <div className={styles.modalBackground}>
      <div className={styles.dosModal}>
        <div className={styles.borderBox}>
          <span>welcome to junseok's portfolio</span>

          <ProgressBar percent={percent} />

          {isShowBtn && (
            <>
              <span>Press the button to continue... </span>
              <button onClick={handleClick} className={styles.pressBtn}>
                PRESS
              </button>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
