import "./style/tooltip.scss";
import useReversedHoverRef from "./lib/useReversedHoverRef";

export default function TooltipReversed() {
  const tooltipRef = useReversedHoverRef();

  return (
    <div id="tooltip" ref={tooltipRef}>
      <span className="balloon"></span>
      <span className="text">Click outside to return to full view</span>
    </div>
  );
}
