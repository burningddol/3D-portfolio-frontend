import styles from "./style/applications.module.scss";
import internet from "/internet.ico";
import {
  useState,
  useEffect,
  type Dispatch,
  type SetStateAction,
  useRef,
} from "react";

type AppsState = Record<string, boolean>;
interface Props {
  setIsOpenApp: Dispatch<SetStateAction<AppsState>>;
}

interface Touch {
  [key: string]: boolean;
}

const resetTouch: Touch = {
  internet: false,
};

export default function Applications({ setIsOpenApp }: Props) {
  const [isTouched, setIsTouched] = useState<{ [key: string]: boolean }>({
    internet: false,
  });

  const internetRef = useRef<HTMLButtonElement>(null);

  const handleDoubleClick = () => {
    setIsOpenApp({ internet: true });
    setIsTouched(resetTouch);
  };

  const handleDownInternet = () => {
    setIsTouched(() => ({ ...resetTouch, internet: true })); // 어플마다 만들어야함  고차함수로 구현 ㄱㄱ
  };

  // 어플 외 밖 클릭하면 touched 취소
  useEffect(() => {
    const handleDown = (e: MouseEvent) => {
      const isActive = !internetRef.current?.contains(e.target as Node);

      if (isActive) setIsTouched(resetTouch);
    };
    document.addEventListener("mousedown", handleDown);
    return () => {
      document.removeEventListener("mousedown", handleDown);
    };
  }, []);

  return (
    <div className={styles.container}>
      <button
        ref={internetRef}
        className={`${styles.app} ${isTouched.internet ? styles.touched : ""}`}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleDownInternet}
      >
        <img src={internet} />
        <span>Internet Exploler</span>
      </button>
    </div>
  );
}
