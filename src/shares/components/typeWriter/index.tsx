import { useEffect, useState, useMemo } from "react";
import styles from "./style/typeWriter.module.scss";

type Props = {
  text: string;
  speed?: number; // ms
  info?: boolean;
};

export default function Typewriter({ text, speed = 50, info = false }: Props) {
  const chars = useMemo(() => Array.from(text ?? ""), [text]); // 이모지 포함 안전
  const [i, setI] = useState(0);

  // text 바뀌면 리셋
  useEffect(() => {
    setI(0);
  }, [text]);

  // i가 증가할 때마다 "한 글자"씩만 예약
  useEffect(() => {
    if (i >= chars.length) return;

    const id = setTimeout(() => {
      setI((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(id);
  }, [i, chars.length, speed]);

  return (
    <span className={`${styles.container} ${info ? styles.info : ""}`}>
      {chars.slice(0, i).join("")}
      <span className={styles.cursor}>ㅣ</span>
    </span>
  );
}
