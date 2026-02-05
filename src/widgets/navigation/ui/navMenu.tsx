import shutdown from "/shutdown.png";
import styles from "../style/navMenu.module.scss";
import { useDesktopAudio } from "@/features/audio/useAudio";

type NavMenuProps = {
  setOnScreen: (isActive: boolean) => void;
  setIsShowMenu: (isActive: boolean) => void;
};

export default function NavMenu({ setOnScreen, setIsShowMenu }: NavMenuProps) {
  const screenOnOffAudio = useDesktopAudio();
  const handleClick = () => {
    setIsShowMenu(false);
    screenOnOffAudio();
    setOnScreen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.osName}>
        <span>JUNSEOK</span>
        <span className={styles.os}>OS</span>
      </div>
      <div className={styles.menuList}>
        <button className={styles.menuItem} onClick={handleClick}>
          <img src={shutdown} />
          종료하기
        </button>
      </div>
    </div>
  );
}
