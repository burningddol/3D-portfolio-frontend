import { useEffect } from "react";

type UseResizeWindowParams = {
  resizingBtnRef: React.RefObject<HTMLButtonElement | null>;
  resizingBorderRef: React.RefObject<HTMLDivElement | null>;
  windowRef: React.RefObject<HTMLDivElement | null>;
  setIsSetting: (isActive: boolean) => void;
};

export default function useResizeWindow({
  resizingBtnRef,
  resizingBorderRef,
  windowRef,
  setIsSetting,
}: UseResizeWindowParams) {
  useEffect(() => {
    const btn = resizingBtnRef?.current;
    const border = resizingBorderRef?.current;
    const windowbox = windowRef?.current;
    if (!btn || !border || !windowbox) return;

    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ가독성용ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ가독성용ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    const onMouseDown = (e: MouseEvent) => {
      setIsSetting(true);
      border.style.opacity = "1";

      const startX = e.clientX;
      const startY = e.clientY;
      const currentWidth = windowbox.offsetWidth;
      const currentHeight = windowbox.offsetHeight;

      // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ가독성용ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
      const onMove = (ev: MouseEvent) => {
        const dx = startX - ev.clientX;
        const dy = startY - ev.clientY;

        border.style.width = `${currentWidth - dx}px`;
        border.style.height = `${currentHeight - dy}px`;
      };

      // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ가독성용ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
      const onUp = () => {
        const newWidth = border.offsetWidth;
        const newHeight = border.offsetHeight;

        windowbox.style.width = `${newWidth}px`;
        windowbox.style.height = `${newHeight}px`;

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

    btn.addEventListener("mousedown", onMouseDown);

    return () => {
      btn.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  return null;
}
