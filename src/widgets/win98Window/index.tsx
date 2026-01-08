import type { ReactNode } from "react";
import styles from "./win98-window.module.scss";

type Win98WindowProps = {
  title: string;
  children: ReactNode;

  /** 활성/비활성 타이틀바 */
  active?: boolean;

  /** 타이틀바 아이콘 (선택) */
  iconSrc?: string;
  iconAlt?: string;

  /** 타이틀바 버튼 표시 여부 */
  showControls?: boolean;

  /** 버튼 핸들러(선택) */
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;

  /** 상태바(선택) */
  status?: ReactNode;

  className?: string;
  style?: React.CSSProperties;
};

export function Win98Window({
  title,
  children,
  active = true,
  iconSrc,
  iconAlt = "",
  showControls = true,
  onClose,
  onMinimize,
  onMaximize,
  status,
  className = "",
  style,
}: Win98WindowProps) {
  return (
    <div
      className={[styles.window, !active ? styles.inactive : "", className]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      <div className={styles.titleBar}>
        <div className={styles.titleLeft}>
          {iconSrc ? (
            <img className={styles.titleIcon} src={iconSrc} alt={iconAlt} />
          ) : null}
          <div className={styles.titleText}>{title}</div>
        </div>

        {showControls ? (
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.controlBtn}
              aria-label="Minimize"
              onClick={onMinimize}
            >
              _
            </button>
            <button
              type="button"
              className={styles.controlBtn}
              aria-label="Maximize"
              onClick={onMaximize}
            >
              □
            </button>
            <button
              type="button"
              className={styles.controlBtn}
              aria-label="Close"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        ) : null}
      </div>

      <div className={styles.content}>{children}</div>

      {status ? <div className={styles.statusBar}>{status}</div> : null}
    </div>
  );
}
