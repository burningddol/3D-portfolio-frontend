import { useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

export default function useDebouncedLoader(delayMs = 250) {
  const { active, progress } = useProgress();
  const [isShowBtn, setIsShowBtn] = useState<boolean>(false);
  const t = useRef<number | null>(null);

  useEffect(() => {
    // 로딩 시작하면 즉시 보여주기
    if (active) {
      if (t.current) window.clearTimeout(t.current);
      setIsShowBtn(false);
      return;
    }

    // 로딩 끝나도 바로 숨기지 말고 Nms 후에 숨기기
    t.current = window.setTimeout(() => {
      setIsShowBtn(true);
    }, delayMs);

    return () => {
      if (t.current) window.clearTimeout(t.current);
    };
  }, [active, delayMs]);

  return { isShowBtn, progress };
}
