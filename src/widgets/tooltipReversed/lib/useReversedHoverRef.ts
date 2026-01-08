import { useDesktop, useHover } from "@/shares/zustand";
import { useEffect, useRef, useCallback } from "react";

interface Opacity {
  el: HTMLElement;
  attr: "opacity";
  value: string;
}

export default function useHoverRef() {
  const { onDesktop } = useDesktop();
  const { isHovered } = useHover();
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltip = tooltipRef.current as HTMLDivElement;

  const balloon = tooltip?.children[0] as HTMLSpanElement;
  const text = tooltip?.children[1] as HTMLSpanElement;

  const changeOpacity = ({ el, attr, value }: Opacity): void => {
    if (!el) return;
    el.style[attr] = value;
  };

  const hoverTooltip = useCallback(
    (isActive: boolean) => {
      changeOpacity({
        el: tooltip,
        attr: "opacity",
        value: `${isActive ? "0.9" : "0"}`,
      });
      changeOpacity({
        el: balloon,
        attr: "opacity",
        value: `${isActive ? "0.9" : "0"}`,
      });
      changeOpacity({
        el: text,
        attr: "opacity",
        value: `${isActive ? "0.9" : "0"}`,
      });
    },
    [tooltip, balloon, text]
  );

  const switchingCursor = useCallback(() => {
    document.body.style.cursor = !isHovered ? "pointer" : "";
  }, [isHovered]);

  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      if (!tooltip) return;

      if (onDesktop && !isHovered) {
        tooltip.style.top = `${e.clientY + 10}px`;
        tooltip.style.left = `${e.clientX + 25}px`;
      }
    },
    [tooltip, onDesktop, isHovered]
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    const isActive: boolean = onDesktop && !isHovered;
    hoverTooltip(isActive);
    switchingCursor();
  }, [onDesktop, isHovered, hoverTooltip]);

  return tooltipRef;
}
