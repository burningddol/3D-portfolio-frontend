import { useState, useEffect } from "react";

const DESKTOP_MIN_WIDTH = 1025;

function getIsMobileOrTablet(): boolean {
  const isTouchDevice =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  const isSmallScreen = window.innerWidth < DESKTOP_MIN_WIDTH;

  return isTouchDevice || isSmallScreen;
}

export default function useDeviceCheck() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState<boolean>(() =>
    getIsMobileOrTablet(),
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(getIsMobileOrTablet());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobileOrTablet };
}
