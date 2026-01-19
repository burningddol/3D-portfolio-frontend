import { useEffect } from "react";

interface Props {
  titleRef: React.RefObject<HTMLDivElement | null>;
  resizingBorderRef: React.RefObject<HTMLDivElement | null>;
  windowRef: React.RefObject<HTMLDivElement | null>;
  controlsRef: React.RefObject<HTMLDivElement | null>;
  setIsSetting: (isActive: boolean) => void;
}

export default function useRelocateWindow({
  titleRef,
  resizingBorderRef,
  windowRef,
  controlsRef,
  setIsSetting,
}: Props) {
  useEffect(() => {
    const titleBar = titleRef?.current;
    const border = resizingBorderRef?.current;
    const windowbox = windowRef?.current;
    if (!titleBar || !border || !windowbox) return;

    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ가독성용ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ가독성용ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();

      if (controlsRef.current?.contains(e.target as Node)) return;

      setIsSetting(true);
      border.style.opacity = "1";

      const startX = e.clientX;
      const startY = e.clientY;

      const currentLeft = windowbox.offsetLeft;
      const currentTop = windowbox.offsetTop;

      // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ가독성용ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
      const onMove = (ev: MouseEvent) => {
        const dx = startX - ev.clientX;
        const dy = startY - ev.clientY;

        border.style.left = `${-dx}px`;
        border.style.top = `${-dy}px`;
      };

      // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ가독성용ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
      const onUp = () => {
        const newLeft = currentLeft + border.offsetLeft;
        const newTop = currentTop + border.offsetTop;

        windowbox.style.left = `${newLeft}px`;
        windowbox.style.top = `${newTop}px`;

        border.style.left = `0px`;
        border.style.top = `0px`;

        setIsSetting(false);
        border.style.opacity = "0";

        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };

      // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ가독성용ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    };
    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ가독성용ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ가독성용ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

    titleBar.addEventListener("mousedown", onMouseDown);

    return () => {
      titleBar.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  return null;
}
