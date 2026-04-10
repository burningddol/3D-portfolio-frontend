import Win98Button from "@/shares/components/button";
import styles from "./style/navigation.module.scss";
import start from "/start.png";
import { useState, useEffect, useRef } from "react";
import NavMenu from "./ui/navMenu";
import { useAPPListOnNav, useFocusing } from "@/shares/zustand";
import { type APPName, type AppOpenStatus } from "@/shares/types";
import imageProvider from "@/shares/utils/imageProvider";

type NavigationProps = {
  setOnScreen: (isActive: boolean) => void;
  isOpenApp: AppOpenStatus;
};

export default function Navigation({ isOpenApp, setOnScreen }: NavigationProps) {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const { APPListOnNav } = useAPPListOnNav();
  const { onFocusing, toggleOnFocusing, addOnFocusing } = useFocusing();

  const handleClick = () => {
    setIsShowMenu((prev) => !prev);
  };

  const handleAPPClick = (app: APPName) => {
    const isFocusing = onFocusing[app];
    // 포커싱 안 돼 있을 때
    if (!isFocusing) {
      addOnFocusing(app);
      return;
    }
    // 이미 포커싱 돼 있을 때
    const windowEl = document.getElementById(app);
    if (!windowEl) return;

    windowEl.style.display = "none";
    toggleOnFocusing(app);
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
              icon={<img src={imageProvider(app)} className={styles.icon} />}
              size="responsive"
              onClick={() => handleAPPClick(app)}
              key={app}
            >
              {app}
            </Win98Button>
          ),
      )}
      <div className={styles.navInfo}>
        <span>{now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true })}</span>
        <span>{now.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })}</span>
      </div>
      {isShowMenu && (
        <div ref={menuRef}>
          <NavMenu setOnScreen={setOnScreen} setIsShowMenu={setIsShowMenu} />
        </div>
      )}
    </div>
  );
}
