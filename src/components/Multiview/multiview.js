import React, { useEffect, useState } from "react";
import { BsLayoutSplit } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import ToolbarButton from "../ViewerToolbar/button";
import IconSize from "../ViewerToolbar/IconSize";
import { useFabricOverlayState } from "../../state/store";
import {
  addViewerInstance,
  removeViewerInstance,
} from "../../state/actions/fabricOverlayActions";

const Multiview = ({
  viewerId,
  isMultiview,
  setIsMultiview,
  setIsNavigatorActive,
}) => {
  const iconSize = IconSize();
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { viewerWindow } = fabricOverlayState;
  const { tile, instance } = viewerWindow[viewerId];

  const handleClick = () => {
    // if (!isMultiview) {
    //   const id = uuidv4();
    //   setFabricOverlayState(addViewerInstance({ viewerId, id, tile }));
    // } else {
    //   setFabricOverlayState(removeViewerInstance({ viewerId, id: instance }));
    // }
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
    />
  );
};

export default Multiview;
