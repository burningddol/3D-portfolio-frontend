import { useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

export default function useDebouncedLoader(delayMs = 250) {
  const { active, progress } = useProgress();
  const [isShowBtn, setIsShowBtn] = useState<boolean>(false);
  const t = useRef<number | null>(null);

  useEffect(() => {
    // active 중간에 계속 바껴서 디바운싱 적용
    if (active) {
      if (t.current) window.clearTimeout(t.current);
      setIsShowBtn(false);
      return;
    }

    // active 중간에 false되도 바로 안보여줌
    t.current = window.setTimeout(() => {
      setIsShowBtn(true);
    }, delayMs);

    return () => {
      if (t.current) window.clearTimeout(t.current);
    };
  }, [active, delayMs]);

  return { isShowBtn, progress };
}
