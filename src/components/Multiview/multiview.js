import React, { useState } from "react";
import { BsLayoutSplit } from "react-icons/bs";
import ToolbarButton from "../ViewerToolbar/button";
import IconSize from "../ViewerToolbar/IconSize";
import { useFabricOverlayState } from "../../state/store";
import { MultiviewIcon, MultiviewSelectedIcon } from "../Icons/CustomIcons";

const Multiview = ({
  viewerId,
  isMultiview,
  setIsMultiview,
  setIsNavigatorActive,
}) => {
  const iconSize = IconSize();
  const { fabricOverlayState } = useFabricOverlayState();
  const { viewerWindow } = fabricOverlayState;
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsNavigatorActive(false);
    setIsMultiview((state) => !state);
  };

  return (
    <ToolbarButton
      icon={
        isActive ? (
          <MultiviewSelectedIcon mt={1} mr={2.5} />
        ) : (
          <MultiviewIcon mt={1} mr={2.5} />
        )
      }
      label="Multiview"
      backgroundColor={isMultiview ? "#E4E5E8" : ""}
      outline={isMultiview ? " 0.5px solid rgba(0, 21, 63, 1)" : ""}
      onClick={() => {
        handleClick();
        setIsActive(!isActive);
      }}
      boxShadow={
        isActive
          ? "inset -2px -2px 2px rgba(0, 0, 0, 0.1), inset 2px 2px 2px rgba(0, 0, 0, 0.1)"
          : null
      }
      isDisabled={Object.keys(viewerWindow).length > 1}
    />
  );
};

export default Multiview;
