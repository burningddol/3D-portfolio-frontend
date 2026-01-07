import "./style/tooltip.scss";
import useHoverRef from "./lib/activateHoverSystem";

export default function Tooltip() {
  const tooltipRef = useHoverRef();

  return (
    <div id="tooltip" ref={tooltipRef}>
      <span className="balloon"></span>
      <span className="text">Click to activate deskTop</span>
    </div>
  );
}
