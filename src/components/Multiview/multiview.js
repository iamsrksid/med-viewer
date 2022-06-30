import React from "react";
import { BsLayoutSplit } from "react-icons/bs";
import ToolbarButton from "../ViewerToolbar/button";
import IconSize from "../ViewerToolbar/IconSize";
import { useFabricOverlayState } from "../../state/store";

const Multiview = ({
  viewerId,
  isMultiview,
  setIsMultiview,
  setIsNavigatorActive,
}) => {
  const iconSize = IconSize();
  const { fabricOverlayState } = useFabricOverlayState();
  const { viewerWindow } = fabricOverlayState;

  const handleClick = () => {
    setIsNavigatorActive(false);
    setIsMultiview((state) => !state);
  };

  return (
    <ToolbarButton
      icon={<BsLayoutSplit size={iconSize} color="#151C25" />}
      label="Multiview"
      backgroundColor={isMultiview ? "#E4E5E8" : ""}
      outline={isMultiview ? " 0.5px solid rgba(0, 21, 63, 1)" : ""}
      onClick={handleClick}
      isDisabled={Object.keys(viewerWindow).length > 1}
    />
  );
};

export default Multiview;
