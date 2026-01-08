import { createPortal } from "react-dom";
import styles from "./style/loader.module.scss";
import { useState, useEffect } from "react";
import ProgressBar from "./ui/progressBar";
import { useProgress } from "@react-three/drei";

export default function Loader() {
  const [isShowModel, setIsShowModel] = useState<boolean>(true);
  const [filteredProgress, setFilteredProgress] = useState<number>(0);
  const { progress, active } = useProgress();
  const percent: number = Math.floor(filteredProgress);

  const handleClick = (): void => {
    setIsShowModel(false);
  };

  useEffect(() => {
    setFilteredProgress((prev) => Math.max(prev, progress));
  }, [progress]);

  if (!isShowModel) return;
  return createPortal(
    <div className={styles.modalBackground}>
      <div className={styles.dosModal}>
        <div className={styles.borderBox}>
          <span>welcome to junseok's portfolio</span>

          <ProgressBar percent={percent} />

          {!active && (
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
