import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { useFabricOverlayState } from "../../state/store";
import { getScaleFactor } from "../../utility/utility";

const ZoomSlider = ({ viewerId }) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { viewer, fabricOverlay } = fabricOverlayState.viewerWindow[viewerId];
  const [zoomValue, setZoomValue] = useState(1);

  const screenSize = useMediaQuery([
    "(max-width: 1280px)",
    "(max-width: 1440px)",
    "(max-width: 1920px)",
    "(max-width: 2560px)",
  ]);

  const adjustAnnotations = (value) => {
    // const value = parseInt((e.zoom * 40) / viewer.viewport.getMaxZoom(), 10);
    // const scaleFactor = value !== 0 ? value / 40 : 1 / 40;
    const scaleFactor = getScaleFactor(viewer);
    const canvas = fabricOverlay.fabricCanvas();
    const strokeWidth = 1 / scaleFactor;
    const objs = canvas.getObjects();
    objs.forEach((object) => {
      if (object.type === "group") {
        object.item(0).set("strokeWidth", strokeWidth);
      } else {
        object.set("strokeWidth", strokeWidth);
      }
    });
    canvas.requestRenderAll();
  };

  useEffect(() => {
    if (!viewer) return;
    viewer.addHandler("zoom", (e) => {
      const value = parseInt((e.zoom * 40) / viewer.viewport.getMaxZoom(), 10);
      setZoomValue(value > 40 ? 40 : value);
      adjustAnnotations(value);
    });
  }, [viewer]);

  const label = ["1", "5", "10", "20", "30", "40"];

  return (
    <Box
      markersLabel={label}
      // ml="7px"
    >
      <Text>{zoomValue}x</Text>
    </Box>
  );
};

export default ZoomSlider;
