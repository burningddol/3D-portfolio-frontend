import Win98Button from "@/shares/components/button";
import styles from "./style/navigation.module.scss";
import start from "/start.png";
import { useState, useEffect, useRef } from "react";
import NavMenu from "./ui/navMenu";

interface Props {
  setOnScreen: (isActive: boolean) => void;
}

export default function Navigation({ setOnScreen }: Props) {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const handleClick = () => {
    setIsShowMenu((prev) => !prev);
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
  }, [isShowMenu]);

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
      {isShowMenu && (
        <div ref={menuRef}>
          <NavMenu setOnScreen={setOnScreen} setIsShowMenu={setIsShowMenu} />
        </div>
      )}
    </div>
  );
}
