import type { ReactNode } from "react";
import styles from "./style/win98Window.module.scss";
import close from "/close.png";
import minimize from "/minimize.png";
import maximize from "/maximize.png";
import { useRef, useState } from "react";
import useResizeWindow from "./lib/useResizeWindow";
import useRelocateWindow from "./lib/useRelocateWindow";

type Win98WindowProps = {
  title: string;
  children: ReactNode;

  active?: boolean;

  iconSrc?: string;
  iconAlt?: string;

  onClose?: () => void;

  onMinimize?: () => void;

  setIsSetting: React.Dispatch<React.SetStateAction<boolean>>;

  className?: string;
  style?: React.CSSProperties;
};

export function Win98Window({
  title,
  children,
  active = true,
  iconSrc,
  iconAlt = "",

  onClose,
  onMinimize,

  setIsSetting,

  className = "",
  style,
}: Win98WindowProps) {
  //
  const resizingBtnRef = useRef<HTMLButtonElement | null>(null);
  const resizingBorderRef = useRef<HTMLDivElement | null>(null);
  const windowRef = useRef<HTMLDivElement | null>(null);

  const titleRef = useRef<HTMLDivElement | null>(null);
  const controlsRef = useRef<HTMLDivElement | null>(null);

  const [isMax, setIsMax] = useState<boolean>(false);

  useResizeWindow({
    resizingBtnRef,
    resizingBorderRef,
    windowRef,
    setIsSetting,
  });

  useRelocateWindow({
    titleRef,
    resizingBorderRef,
    windowRef,
    controlsRef,
    setIsSetting,
  });

  const onMaximize = () => {
    setIsMax((prev) => !prev);
  };

  return (
    <div
      className={`${styles.windowWrapper} ${isMax ? styles.max : ""}`}
      ref={windowRef}
    >
      <div className={styles.resizeBorder} ref={resizingBorderRef} />
      <div
        className={[styles.window, !active ? styles.inactive : "", className]
          .filter(Boolean)
          .join(" ")}
        style={style}
      >
        <div className={styles.titleBar} ref={titleRef}>
          <div className={styles.titleLeft}>
            {iconSrc ? (
              <img className={styles.titleIcon} src={iconSrc} alt={iconAlt} />
            ) : null}
            <div className={styles.titleText}>{title}</div>
          </div>

          <div className={styles.controls} ref={controlsRef}>
            <button
              type="button"
              className={styles.controlBtn}
              aria-label="Minimize"
              onClick={onMinimize}
            >
              <img src={minimize} />
            </button>
            <button
              type="button"
              className={styles.controlBtn}
              aria-label="Maximize"
              onClick={onMaximize}
            >
              <img src={maximize} />
            </button>
            <button
              type="button"
              className={styles.controlBtn}
              aria-label="Close"
              onClick={onClose}
            >
              <img src={close} />
            </button>
          </div>
        </div>

        <div className={styles.content}>{children}</div>

        <div className={styles.win98Statusbar}>
          <div className={styles.statusPane}>ⓘ Ready</div>

          <div className={styles.statusMiniPane} />
          <div className={styles.statusMiniPane}>
            <button
              type="button"
              className={styles.resizeHandle}
              ref={resizingBtnRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
