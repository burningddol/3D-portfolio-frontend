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

interface APP {
  toDo: boolean;
  junseokBook: boolean;
}
interface Props {
  setIsOpenApp: Dispatch<SetStateAction<APP>>;
}

interface Touch {
  toDo: boolean;
  junseokBook: boolean;
}

const RESET_TOUCH: Touch = {
  toDo: false,
  junseokBook: false,
};

export default function Applications({ setIsOpenApp }: Props) {
  const [isTouched, setIsTouched] = useState<Touch>(RESET_TOUCH);

  const toDoRef = useRef<HTMLButtonElement>(null);
  const junseokBookRef = useRef<HTMLButtonElement>(null);

  const handleDoubleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;
    setIsOpenApp((prev) => ({
      ...prev,
      [name]: true,
    }));
    setIsTouched(RESET_TOUCH);
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
        name="toDo"
        ref={toDoRef}
        className={`${styles.app} ${isTouched.toDo ? styles.touched : ""} ${styles.index1}`}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleDown}
      >
        <img src={toDoList} />
        <span>ToDoList Scheduler</span>
      </button>

      <button
        name="junseokBook"
        ref={junseokBookRef}
        className={`${styles.app} ${isTouched.junseokBook ? styles.touched : ""} ${styles.index2} `}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleDown}
      >
        <img src={junseokBook} />
        <span>Junseok's Book</span>
      </button>
    </div>
  );
}
