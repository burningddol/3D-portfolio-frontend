import { useEffect } from "react";

export function usePostMessage(
  onScreen: boolean,
  setOnScreen: (a: boolean) => void,
  setOnControl: (a: boolean) => void
) {
  //송신
  useEffect(() => {
    window.parent.postMessage(
      {
        type: "SET_SCREEN",
        payload: {
          on: onScreen,
        },
      },
      window.location.origin
    );
  }, [onScreen]);

  //수신
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type !== "DESKTOP_STATE") return;
      if (e.data.payload.on === true) {
        setOnScreen(true);
      }

      setOnControl(e.data.payload.onControl);
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);
}
