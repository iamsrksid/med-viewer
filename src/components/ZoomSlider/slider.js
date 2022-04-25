import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Text } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import { getFontSize } from "../../utility/utility";
import { useFabricOverlayState } from "../../state/store";
import { updateZoomValue } from "../../state/actions/fabricOverlayActions";

const ZoomSlider = ({ viewerId }) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { viewer, zoomValue, fabricOverlay } =
    fabricOverlayState?.viewerWindow[viewerId];

  const screenSize = useMediaQuery([
    "(max-width: 1280px)",
    "(max-width: 1440px)",
    "(max-width: 1920px)",
    "(max-width: 2560px)",
  ]);

  const handleSlider = (val) => {
    viewer.viewport.zoomTo(viewer.viewport.getMaxZoom() * val * 2.5 * 0.01);
    setFabricOverlayState(updateZoomValue({ id: viewerId, value: val }));
  };

  const handleLabel = (val) => {
    viewer.viewport.zoomTo(viewer.viewport.getMaxZoom() * val * 2.5 * 0.01);
    setFabricOverlayState(updateZoomValue({ id: viewerId, value: val }));
  };

  const adjustAnnotations = (value) => {
    const scaleFactor = value !== 0 ? value / 40 : 1 / 40;
    const canvas = fabricOverlay.fabricCanvas();
    const strokeWidth = 1 / scaleFactor;
    const fontSize = getFontSize(screenSize, zoomValue);
    for (let object of canvas.getObjects()) {
      if (object.type === "group") {
        object.item(0).set("strokeWidth", strokeWidth);
        // object.item(1).set("fontSize", fontSize);
      } else {
        object.set("strokeWidth", strokeWidth);
      }
      canvas.renderAll();
    }
  };

  useEffect(() => {
    if (!viewer) return;
    viewer.addHandler("zoom", (e) => {
      const value = parseInt((e.zoom * 40) / viewer.viewport.getMaxZoom());
      setFabricOverlayState(updateZoomValue({ id: viewerId, value: value }));
      adjustAnnotations(value);
    });
  }, [viewer]);

  const label = ["1", "5", "10", "20", "30", "40"];

  return (
    <Box
      onChange={(val) => handleSlider(val)}
      valueRenderer={(value) => `${value}%`}
      markersLabel={label}
      viewerId={viewerId}
      // ml="7px"
    >
      <Text>{zoomValue}x</Text>
    </Box>
  );
};

export default ZoomSlider;
