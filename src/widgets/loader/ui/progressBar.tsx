import styles from "../style/progressBar.module.scss";

interface Props {
  percent: number;
}

export default function ProgressBar({ percent }: Props) {
  const progressItems: undefined[] = Array.from({ length: percent });

  return (
    <>
      <div className={styles.info}>model loading...</div>
      <div className={styles.flexBox}>
        <div className={styles.progressBox}>
          {progressItems.map((_, index) => (
            <div key={index} className={styles.progressItem} />
          ))}
        </div>
        <span>{percent}%</span>
      </div>
    </>
  );
}
