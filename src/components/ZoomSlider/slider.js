import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Flex, Input, Text, useMediaQuery } from "@chakra-ui/react";
import { useFabricOverlayState } from "../../state/store";
import { getScaleFactor, getZoomValue } from "../../utility/utility";

const ZoomSlider = ({ viewerId, rightClickZoomValue }) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { viewerWindow, sync } = fabricOverlayState;
  const { viewer, fabricOverlay } = viewerWindow[viewerId];
  const [zoomValue, setZoomValue] = useState(1);
  const inputRef = useRef(null);

  const handleZoomLevel = (e) => {
    let { value } = e.target;
    // check if value is less than 1, then make it 1
    // and if value is greater than 40, then make it 40
    if (value && value < 1) {
      value = 1;
    } else if (value > 40) {
      value = 40;
    }

    // if value is empty, don't do anything
    if (value) {
      const level = value * (viewer.viewport.getMaxZoom() / 40);
      viewer.viewport.zoomTo(level);
    }

    setZoomValue(value);
  };

  const handleZoomLevelBlur = () => {
    if (zoomValue) return;
    const value = getZoomValue(viewer);
    setZoomValue(value);
  };

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
      const value = parseInt(
        Math.ceil((e.zoom * 40) / viewer.viewport.getMaxZoom()),
        10
      );
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
    <Flex>
      <Input
        ref={inputRef}
        type="number"
        value={zoomValue}
        onChange={handleZoomLevel}
        onBlur={handleZoomLevelBlur}
        variant="unstyled"
        w="20px"
        textAlign="center"
      />
      <Text>x</Text>
    </Flex>
  );
};

export default ZoomSlider;
