import styles from "../style/appLoader.module.scss";

export function AppLoader() {
  return (
    <div className={styles.scaler}>
      <div className={styles.bootWindow}>
        <div className={styles.titleBar}>
          <div className={styles.titleLeft}>
            <div className={styles.icon} />
            <span>System</span>
          </div>
          <div className={styles.closeBtn} />
        </div>

        <div className={styles.body}>
          <p className={styles.title}>Application Loading...</p>

          <div className={styles.spinner}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}
