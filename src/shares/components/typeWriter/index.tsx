import { useEffect, useState, useMemo } from "react";
import styles from "./style/typeWriter.module.scss";
import camera from "/camera.svg";
import manual from "/manual.svg";
import { useControlOrbit } from "@/shares/zustand";

type Props = {
  text: string;
  speed?: number;
  info?: boolean;
};

export default function Typewriter({ text, speed = 50, info = false }: Props) {
  const { onControl, setOnControl } = useControlOrbit();
  const chars = useMemo(() => Array.from(text ?? ""), [text]);
  const [i, setI] = useState(0);

  useEffect(() => {
    setI(0);
  }, [text]);

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
      {info && (
        <button onClick={() => setOnControl(!onControl)}>
          <img src={onControl ? manual : camera} className={styles.img} />
        </button>
      )}
    </span>
  );
}
