import { createPortal } from "react-dom";
import styles from "./style/loader.module.scss";
import { useState, useEffect } from "react";
import ProgressBar from "./ui/progressBar";
import { useProgress } from "@react-three/drei";
import { useProject } from "@/shares/zustand";
import { useAtmosphereAudio, useWhooshAudio } from "@/features/audio/useAudio";

export default function Loader() {
  const [isShowLoader, setIsShowLoader] = useState<boolean>(true);
  const [filteredProgress, setFilteredProgress] = useState<number>(0);
  const { progress, active } = useProgress();
  const { setOnProject } = useProject();

  const percent: number = Math.floor(filteredProgress);

  const isActive: boolean = !active && percent == 100;
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

          {isActive && (
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
