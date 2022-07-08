import React, { useEffect, useState } from "react";
import { BsSquare } from "react-icons/bs";
import axios from "axios";
import { fabric } from "openseadragon-fabricjs-overlay";
import { IconButton, Image } from "@chakra-ui/react";
import TypeButton from "../typeButton";
import { useFabricOverlayState } from "../../state/store";
import { updateTool } from "../../state/actions/fabricOverlayActions";
import MagicWandIcon from "../../assets/images/magicWandIcon.svg";

const MagicWandTool = ({ viewerId }) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { color, viewerWindow, activeTool } = fabricOverlayState;
  const { fabricOverlay, viewer, activityFeed, slideId } =
    viewerWindow[viewerId];

  const isActive = activeTool === "MagicWand";

  useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    if (isActive) {
      canvas.defaultCursor = "crosshair";

      // Disable OSD mouseclicks
      viewer.setMouseNavEnabled(false);
      viewer.outerTracker.setTracking(false);
    } else {
      // Enable OSD mouseclicks
      viewer.setMouseNavEnabled(true);
      viewer.outerTracker.setTracking(true);
    }
  }, [isActive, fabricOverlay]);

  useEffect(() => {
    if (!fabricOverlay || !isActive) return null;
    const canvas = fabricOverlay.fabricCanvas();

    const bounds = viewer.viewport.getBounds();
    const {
      x: left,
      y: top,
      width,
      height,
    } = viewer.viewport.viewportToImageRectangle(
      bounds.x,
      bounds.y,
      bounds.width,
      bounds.height
    );

    const initiateAnalysis = async (body) => {
      const resp = await axios.post("http://localhost:8080/wand", body);
      console.log(resp);
    };

    console.log({ left, top, width, height });
    initiateAnalysis({ x: left, y: top, width, height });

    const handleMouseDown = (options) => {
      if (!options) return;
      const { x, y } = canvas.getPointer(options.e);
      console.log({ x, y, left, top });
      const createContours = async (body) => {
        const resp = await axios.post("http://localhost:8080/click_xy", body);
        console.log(resp);

        if (resp && typeof resp.data === "object") {
          const points = resp.data.map((point) => ({
            x: point[0][0] + left,
            y: point[0][1] + top,
          }));
          const polygon = new fabric.Polygon(points, {
            stroke: "black",
            strokeWidth: 1.2,
            fill: `${color.hex}80`,
            strokeUniform: true,
          });
          console.log(polygon);
          canvas.add(polygon).renderAll();
        }
      };

      createContours({ x: x - left, y: y - top });
    };

    canvas.on("mouse:down", handleMouseDown);

    return () => {
      canvas.off("mouse:down", handleMouseDown);
    };
  }, [isActive, fabricOverlay]);

  const handleClick = () => {
    setFabricOverlayState(updateTool({ tool: "MagicWand" }));
  };

  return (
    <IconButton
      onClick={handleClick}
      borderRadius={0}
      bg="#F6F6F6"
      title="Magic Wand"
    >
      <Image src={MagicWandIcon} />
    </IconButton>
  );
};

export default MagicWandTool;
