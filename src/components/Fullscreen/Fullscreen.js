import React from "react";
import { useSelector } from "react-redux";
import ToolbarButton from "../ViewerToolbar/button";
import { RiFullscreenFill } from "react-icons/ri";
import IconSize from "../ViewerToolbar/IconSize";

const Fullscreen = ({ viewerId }) => {
  const { viewerWindow } = useSelector((state) => state.fabricOverlayState);
  const { viewer } = viewerWindow[viewerId];

  const handleFullScreen = () => {
    if (viewer.isFullPage() && !viewer.isFullScreen()) {
      // Is fullPage but not fullScreen
      viewer.setFullPage(false);
    } else {
      viewer.setFullScreen(!viewer.isFullPage());
    }
  };
  return (
    <ToolbarButton
      icon={<RiFullscreenFill size={IconSize()} color="#151C25" />}
      label="Full screen"
      onClick={handleFullScreen}
    />
  );
};

export default Fullscreen;
