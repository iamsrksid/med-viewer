import React, { useState, useEffect } from "react";
import { FiRotateCw } from "react-icons/fi";
import ToolbarButton from "../ViewerToolbar/button";
import IconSize from "../ViewerToolbar/IconSize";
import { useFabricOverlayState } from "../../state/store";

const Rotate = ({ viewerId }) => {
  const { fabricOverlayState } = useFabricOverlayState();
  const { viewer } = fabricOverlayState?.viewerWindow[viewerId];
  const [active, setActive] = useState(false);

  const handleRotate = (e) => {
    try {
      if (viewer.viewport) {
        let currRotation = viewer.viewport.getRotation();
        currRotation += 90;
        viewer.viewport.setRotation(currRotation);
      }
    } catch (e) {
      console.error("Error handling rotate button click", e);
    }
  };

  return (
    <ToolbarButton
      icon={
        <FiRotateCw size={IconSize()} color={active ? "#3B5D7C" : "#151C25"} />
      }
      label="Rotate"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => {
        handleRotate();
      }}
    />
  );
};

export default Rotate;
