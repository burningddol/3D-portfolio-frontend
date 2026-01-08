import styles from "../style/glitch.module.scss";

export default function Glitch() {
  return (
    <div className={styles.bgWrap} aria-hidden="true">
      <video
        className={styles.bgVideo}
        src="/glitch.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    </div>
  );
}
