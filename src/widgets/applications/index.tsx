import styles from "./style/applications.module.scss";
import {
  useState,
  useEffect,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useAPPListOnNav, useFocusing } from "@/shares/zustand";
import {
  type APPName,
  type AppOpenStatus,
  APP_NAMES,
  APP_CONFIG,
} from "@/shares/types";
import imageProvider from "@/shares/utils/imageProvider";

type ApplicationsProps = {
  setIsOpenApp: Dispatch<SetStateAction<AppOpenStatus>>;
  isOpenApp: AppOpenStatus;
};

export default function Applications({
  isOpenApp,
  setIsOpenApp,
}: ApplicationsProps) {
  const [touchedApp, setTouchedApp] = useState<APPName | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { addAPPListOnNav } = useAPPListOnNav();
  const { addOnFocusing } = useFocusing();

  const handleDoubleClick = (name: APPName) => {
    addOnFocusing(name); // Win98Window의 onFocusing useEffect가 display:block 복원 처리
    setIsOpenApp((prev) => ({ ...prev, [name]: true }));
    setTouchedApp(null);
    if (!isOpenApp[name]) addAPPListOnNav(name);
  };

  const handleDown = (name: APPName) => {
    setTouchedApp(name);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setTouchedApp(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      {APP_NAMES.map((name, index) => (
        <button
          key={name}
          name={name}
          className={[
            styles.app,
            touchedApp === name ? styles.touched : "",
            styles[`index${index + 1}`],
          ]
            .filter(Boolean)
            .join(" ")}
          onDoubleClick={() => handleDoubleClick(name)}
          onMouseDown={() => handleDown(name)}
        >
          <img src={imageProvider(name)} alt={name} />
          <span>{APP_CONFIG[name].label}</span>
        </button>
      ))}
    </div>
  );
}
