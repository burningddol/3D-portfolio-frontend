import Win98Button from "@/shares/components/button";
import styles from "./style/navigation.module.scss";
import start from "/start.png";
import { useState, useEffect, useRef } from "react";
import NavMenu from "./ui/navMenu";
import { useAPPListOnNav, useFocusing } from "@/shares/zustand";
import { type APPName } from "@/shares/zustand";
interface APP {
  ToDoSchedular: boolean;
  "Junseok's Book": boolean;
}
interface Props {
  setOnScreen: (isActive: boolean) => void;
  isOpenApp: APP;
}

export default function Navigation({ isOpenApp, setOnScreen }: Props) {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const { APPListOnNav } = useAPPListOnNav();
  const { onFocusing, addOnFocusing } = useFocusing();

  const handleClick = () => {
    setIsShowMenu((prev) => !prev);
  };

  const handleAPPClick = (app: APPName) => {
    addOnFocusing(app);
  };

  useEffect(() => {
    if (!isShowMenu) return;

    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const isCloseMenu =
        !menuRef.current?.contains(target) &&
        !buttonRef.current?.contains(target);
      if (isCloseMenu) {
        setIsShowMenu(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [isShowMenu, setIsShowMenu]);

  return (
    <div className={styles.nav}>
      <div ref={buttonRef}>
        <Win98Button
          pressed={isShowMenu}
          icon={<img src={start} className={styles.icon} />}
          size="large"
          onClick={handleClick}
        >
          Start
        </Win98Button>
      </div>
      {APPListOnNav.map(
        (app) =>
          isOpenApp[app] === true && (
            <Win98Button
              pressed={onFocusing[app]}
              size="responsive"
              onClick={() => handleAPPClick(app)}
              key={app}
            >
              {app}
            </Win98Button>
          ),
      )}
      <span className={styles.navInfo}>El Psy Kongroo</span>
      {isShowMenu && (
        <div ref={menuRef}>
          <NavMenu setOnScreen={setOnScreen} setIsShowMenu={setIsShowMenu} />
        </div>
      )}
    </div>
  );
}
