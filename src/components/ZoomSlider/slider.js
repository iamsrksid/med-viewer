import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { useFabricOverlayState } from "../../state/store";
import { getScaleFactor } from "../../utility/utility";
import { toggleLeading } from "../../state/actions/fabricOverlayActions";

const ZoomSlider = ({ viewerId }) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { viewerWindow, sync } = fabricOverlayState;
  const { viewer, fabricOverlay } = viewerWindow[viewerId];
  const [zoomValue, setZoomValue] = useState(1);

  const screenSize = useMediaQuery([
    "(max-width: 1280px)",
    "(max-width: 1440px)",
    "(max-width: 1920px)",
    "(max-width: 2560px)",
  ]);

  useEffect(() => {
    if (!viewer) return null;
    const adjustAnnotations = () => {
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
    const handler = (e) => {
      const value = parseInt((e.zoom * 40) / viewer.viewport.getMaxZoom(), 10);
      setZoomValue(value > 40 ? 40 : value);
      // const bounds = viewer.viewport.getBounds();
      // const { x, y, width, height } = viewer.viewport.viewportToImageRectangle(
      //   bounds.x,
      //   bounds.y,
      //   bounds.width,
      //   bounds.height
      // );
      // console.log({ x, y, width, height });
      adjustAnnotations(value);
    };
    viewer.addHandler("zoom", handler);
    return () => {
      viewer.removeHandler("zoom", handler);
    };
  }, [viewer]);

  return (
    <Box>
      <Text>{zoomValue}x</Text>
    </Box>
  );
};

export default ZoomSlider;
