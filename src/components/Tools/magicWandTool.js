import React, { useEffect, useState } from "react";
import { BsSquare } from "react-icons/bs";
import axios from "axios";
import { fabric } from "openseadragon-fabricjs-overlay";
import { IconButton, Image } from "@chakra-ui/react";
import md5 from "md5";
import { VscWand } from "react-icons/vsc";
import TypeButton from "../typeButton";
import { useFabricOverlayState } from "../../state/store";
import {
  updateTool,
  addToActivityFeed,
} from "../../state/actions/fabricOverlayActions";
import MagicWandIcon from "../../assets/images/magicWandIcon.svg";
import { getFileBucketFolder, getZoomValue } from "../../utility/utility";

const MagicWandTool = ({ viewerId, saveAnnotationsHandler, setTotalCells }) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { color, viewerWindow, activeTool } = fabricOverlayState;
  const { fabricOverlay, viewer, activityFeed, slideId, tile } =
    viewerWindow[viewerId];
  const [zoomValue, setZoomValue] = useState(1);

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
    if (!viewer) return null;
    viewer.addHandler("zoom", () => setZoomValue(getZoomValue(viewer)));
    return () => {
      viewer.removeHandler("zoom", () => setZoomValue(getZoomValue(viewer)));
    };
  }, [viewer]);

  useEffect(() => {
    if (!fabricOverlay || !isActive) return null;
    const canvas = fabricOverlay.fabricCanvas();

    // get viewport bounds
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

    // get s3 folder key of tile
    const key = getFileBucketFolder(tile);

    // initiate analysis, sending viewport coordinates and s3 folder key
    const initiateAnalysis = async (body) => {
      await axios.post("https://development-morphometry-api.prr.ai/wand", body);
    };

    initiateAnalysis({ x: left, y: top, width, height, key });

    // create annotation of cell
    const createContours = async (body) => {
      // get cell data from the clicked position in viewer
      const resp = await axios.post(
        "https://development-morphometry-api.prr.ai/click_xy",
        body
      );

      // if the click positon is a cell, create annotation
      // also add it the annotation feed
      if (resp && typeof resp.data === "object") {
        const { con, area, centroid, perimeter, end_points } = resp.data;
        const points = con.map((point) => ({
          x: point[0][0] + left,
          y: point[0][1] + top,
        }));
        const polygon = new fabric.Polygon(points, {
          stroke: "black",
          strokeWidth: 1.2,
          fill: `${color.hex}80`,
          strokeUniform: true,
        });
        const message = {
          username: "",
          color: color.hex,
          action: "added",
          timeStamp: Date.now(),
          type: "cell",
          object: polygon,
          image: null,
        };

        const hash = md5(polygon + message.timeStamp);

        message.object.set({
          id: message.timeStamp,
          hash,
          zoomLevel: viewer.viewport.getZoom(),
          area,
          perimeter,
          centroid,
          end_points,
        });

        const annotations = canvas.toJSON([
          "hash",
          "text",
          "zoomLevel",
          "points",
          "area",
          "perimeter",
          "centroid",
          "end_points",
        ]);
        if (annotations.objects.length > 0) {
          saveAnnotationsHandler(slideId, annotations.objects);
        }
        canvas.add(polygon).requestRenderAll();
        setTotalCells((state) => state + 1);
        setFabricOverlayState(
          addToActivityFeed({
            id: viewerId,
            feed: message,
          })
        );
      }
    };

    const handleMouseDown = (options) => {
      if (!options) return;
      const { x, y } = canvas.getPointer(options.e);

      createContours({
        x: left,
        y: top,
        width,
        height,
        key,
        click_x: x - left,
        click_y: y - top,
      });
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
      icon={<VscWand size={20} />}
      onClick={handleClick}
      borderRadius={0}
      bg="#F6F6F6"
      title="Magic Wand"
      disabled={zoomValue < 40}
    />
  );
};

export default MagicWandTool;
