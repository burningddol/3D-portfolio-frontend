import type { ReactNode } from "react";
import styles from "./style/win98Window.module.scss";
import close from "/close.png";
import minimize from "/minimize.png";
import maximize from "/maximize.png";
import { useEffect, useRef, useState } from "react";
import useResizeWindow from "./lib/useResizeWindow";
import useRelocateWindow from "./lib/useRelocateWindow";
import { AppLoader } from "@/pages/screen/ui/appLoader";
import { useFocusing, useSetting, useZIndex } from "@/shares/zustand";
import { type APPName } from "@/shares/zustand";

type Win98WindowProps = {
  name: string;
  children?: ReactNode;

  active?: boolean;
  onIframe?: boolean;
  iframeSrc?: string;
  iconSrc?: string;
  iconAlt?: string;

  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;

  className?: string;
  style?: React.CSSProperties;
};

export function Win98Window({
  name,
  children,
  active = true,
  iconSrc,
  iconAlt = "",
  onIframe = false,
  iframeSrc = "",
  onClose,

  className = "",
  style,
}: Win98WindowProps) {
  //
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isSetting, setIsSetting } = useSetting();
  const nextZ = useZIndex((state) => state.next);
  const { onFocusing, addOnFocusing, removeOnFocusing } = useFocusing();

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

  const onMinimize = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as APPName;
    if (!windowRef.current || !name) return;
    windowRef.current.style.display = "none";
    removeOnFocusing(name);
  };

  const onMaximize = () => {
    setIsMax((prev) => !prev);
  };

  // 앱 클릭시 최상단 zindex 및 focus
  const handleMouseDown = () => {
    if (!windowRef.current) return;
    const nextZIndex: number = nextZ();
    windowRef.current.style.zIndex = String(nextZIndex);
    addOnFocusing(name);
  };

  // 첫 앱 open시  focus
  useEffect(() => {
    addOnFocusing(name);
  }, []);

  //  앱 open시 최상단 zindex 및 보이기
  useEffect(() => {
    if (!windowRef.current || !onFocusing[name]) return;

    const nextZIndex: number = nextZ();
    windowRef.current.style.zIndex = String(nextZIndex);
    windowRef.current.style.display = "block";
  }, [onFocusing[name]]);

  return (
    <div
      id={name}
      className={`${styles.windowWrapper} ${isMax ? styles.max : ""}`}
      ref={windowRef}
      onMouseDown={handleMouseDown}
    >
      <div className={styles.resizeBorder} ref={resizingBorderRef} />
      <div
        className={[styles.window, !active ? styles.inactive : "", className]
          .filter(Boolean)
          .join(" ")}
        style={style}
      >
        <div
          className={`${styles.titleBar} ${onFocusing[name] ? "" : styles.unFocused}`}
          ref={titleRef}
        >
          <div className={styles.titleLeft}>
            {iconSrc ? (
              <img className={styles.titleIcon} src={iconSrc} alt={iconAlt} />
            ) : null}
            <div className={styles.titleText}>{name}</div>
          </div>

          <div className={styles.controls} ref={controlsRef}>
            <button
              name={name}
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
              name={name}
              type="button"
              className={styles.controlBtn}
              aria-label="Close"
              onClick={onClose}
            >
              <img src={close} />
            </button>
          </div>
        </div>

        <div className={styles.content}>
          {onIframe ? (
            <>
              {isLoading && <AppLoader />}
              <iframe
                id="iframe"
                onLoad={() => setIsLoading(false)}
                style={{
                  border: "none",
                  pointerEvents:
                    isSetting || !onFocusing[name] ? "none" : "auto",
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  userSelect: "none",
                  width: "100%",
                  height: "100%",
                }}
                src={iframeSrc}
              />
            </>
          ) : (
            children
          )}
        </div>

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
