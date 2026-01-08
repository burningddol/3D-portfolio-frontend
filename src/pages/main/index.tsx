import RenderModel from "@/widgets/render-model";
import Tooltip from "@/widgets/tooltip/tooltip";
import Loader from "@/widgets/loader";
import Typewriter from "@/shares/components/typeWriter";
import { useDesktop, useProject } from "@/shares/zustand";
import { useEffect, useState } from "react";

const Main = () => {
  const [isShowManual, setIsShowManual] = useState<boolean>(false);
  const onProject = useProject((s) => s.onProject);
  const onDesktop = useDesktop((s) => s.onDesktop);

  const isShowIntro: boolean = isShowManual && !onDesktop;

  useEffect(() => {
    if (onProject) {
      setTimeout(() => setIsShowManual(true), 1700);
    }
  }, [onProject]);

  return (
    <>
      <RenderModel />
      {isShowIntro && <Typewriter text="Hover over the desktop" speed={50} />}
      {onProject && <Typewriter text="JunSeok Kim, enjoy it" speed={50} info />}
      <Tooltip />
      <Loader />
    </>
  );
};

export default Main;
