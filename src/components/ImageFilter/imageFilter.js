import React, { useState } from "react";
import { MdFilter } from "react-icons/md";
import OpenSeadragon from "openseadragon";
import { useFabricOverlayState } from "../../state/store";
import ToolbarButton from "../ViewerToolbar/button";
import "./openseadragon-filtering";

const ImageFilter = ({ viewerId }) => {
  const { fabricOverlayState } = useFabricOverlayState();
  const { viewerWindow } = fabricOverlayState;
  const { viewer } = viewerWindow[viewerId];
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    if (!viewer) return;
    if (isActive) {
      viewer.setFilterOptions(null);
      setIsActive(false);
    } else {
      viewer.setFilterOptions({
        filters: {
          processors: OpenSeadragon.Filters.BRIGHTNESS(50),
        },
        loadMode: "async",
      });
      setIsActive(true);
    }
  };

  return (
    <ToolbarButton
      icon={<MdFilter />}
      label="Filter"
      backgroundColor={!isActive ? "" : "#E4E5E8"}
      outline={isActive ? " 0.5px solid rgba(0, 21, 63, 1)" : ""}
      boxShadow={
        isActive
          ? "inset -2px -2px 2px rgba(0, 0, 0, 0.1), inset 2px 2px 2px rgba(0, 0, 0, 0.1)"
          : null
      }
      onClick={handleClick}
      _hover={{ bgColor: "rgba(228, 229, 232, 1)" }}
    />
  );
};

export default ImageFilter;
