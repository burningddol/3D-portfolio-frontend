import styles from "./style/applications.module.scss";
import toDoList from "/toDoList.png";
import junseokBook from "/junseokBook.png";
import {
  useState,
  useEffect,
  type Dispatch,
  type SetStateAction,
  useRef,
} from "react";
import { useAPPListOnNav } from "@/shares/zustand";
import { type APPName } from "@/shares/zustand";

interface APP {
  ToDoSchedular: boolean;
  "Junseok's Book": boolean;
}
interface Props {
  setIsOpenApp: Dispatch<SetStateAction<APP>>;
  isOpenApp: APP;
}

interface Touch {
  ToDoSchedular: boolean;
  "Junseok's Book": boolean;
}

const RESET_TOUCH: Touch = {
  ToDoSchedular: false,
  "Junseok's Book": false,
};

export default function Applications({ isOpenApp, setIsOpenApp }: Props) {
  const [isTouched, setIsTouched] = useState<Touch>(RESET_TOUCH);

  const { addAPPListOnNav } = useAPPListOnNav();

  const toDoRef = useRef<HTMLButtonElement>(null);
  const junseokBookRef = useRef<HTMLButtonElement>(null);

  const handleDoubleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as APPName;

    setIsOpenApp((prev) => ({
      ...prev,
      [name]: true,
    }));
    setIsTouched(RESET_TOUCH);

    if (!isOpenApp[name]) addAPPListOnNav(name); // 앱을 처음 열 경우만 Nav에 추가
    console.log();
    // window창 DOM 생성 이후 조건으로
    if (!isOpenApp[name]) return;
    const el = document.getElementById(name);
    if (!el) return;
    el.style.display = "block"; //창 minimize 했다가 다시 누를경우 대비
  };

  const handleDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;

    setIsTouched(() => ({ ...RESET_TOUCH, [name]: true }));
  };

  // 어플 외 밖 클릭하면 touched 취소
  useEffect(() => {
    const handleDown = (e: MouseEvent) => {
      const isActive =
        !toDoRef.current?.contains(e.target as Node) &&
        !junseokBookRef.current?.contains(e.target as Node);

      if (isActive) setIsTouched(RESET_TOUCH);
    };
    document.addEventListener("mousedown", handleDown);
    return () => {
      document.removeEventListener("mousedown", handleDown);
    };
  }, []);

  return (
    <div className={styles.container}>
      <button
        name="ToDoSchedular"
        ref={toDoRef}
        className={`${styles.app} ${isTouched.ToDoSchedular ? styles.touched : ""} ${styles.index1}`}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleDown}
      >
        <img src={toDoList} />
        <span>ToDoList Scheduler</span>
      </button>

      <button
        name="Junseok's Book"
        ref={junseokBookRef}
        className={`${styles.app} ${isTouched["Junseok's Book"] ? styles.touched : ""} ${styles.index2} `}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleDown}
      >
        <img src={junseokBook} />
        <span>Junseok's Book</span>
      </button>
    </div>
  );
}
