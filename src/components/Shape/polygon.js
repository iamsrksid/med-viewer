import React, { useState, useEffect, useRef } from "react";
import { FaDrawPolygon } from "react-icons/fa";
import { fabric } from "openseadragon-fabricjs-overlay";
import { useDisclosure } from "@chakra-ui/react";
import md5 from "md5";
import TypeButton from "../typeButton";
import useFabricHelpers from "../../utility/use-fabric-helpers";
import { getCanvasImage, getScaleFactor } from "../../utility/utility";
import EditText from "../Feed/editText";
import { useFabricOverlayState } from "../../state/store";
import {
  updateActivityFeed,
  updateTool,
} from "../../state/actions/fabricOverlayActions";

const MAX = 999999;
const MIN = 99;

const Polygon = ({ viewerId, saveAnnotationsHandler }) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { color, viewerWindow, activeTool } = fabricOverlayState;

  const { fabricOverlay, viewer, activityFeed, slideId } =
    viewerWindow[viewerId];
  const { deselectAll } = useFabricHelpers();

  const isActive = activeTool === "Polygon";

  const [shape, setShape] = useState(null);
  const [textbox, setTextbox] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const arrayRef = useRef({
    pointArray: [],
    lineArray: [],
  });
  const myStateRef = useRef({
    activeLine: null,
    activeShape: null,
    color,
  });

  const setState = (data) => {
    myStateRef.current = { ...myStateRef.current, ...data };
  };
  const setArrayRef = (data) => {
    arrayRef.current = { ...arrayRef, ...data };
  };

  useEffect(() => {
    setState({ color });
  }, [color.hex]);

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

    const generatePolygon = async () => {
      const points = [];
      arrayRef.current.pointArray.forEach((point) => {
        points.push({
          x: point.left,
          y: point.top,
        });
        canvas.remove(point);
      });
      arrayRef.current.lineArray.forEach((line) => {
        canvas.remove(line);
      });
      canvas
        .remove(myStateRef.current.activeShape)
        .remove(myStateRef.current.activeLine);

      const scaleFactor = getScaleFactor(viewer);
      const polygon = new fabric.Polygon(points, {
        stroke: "black",
        strokeWidth: 1 / scaleFactor,
        fill: `${myStateRef.current.color.hex}40`,
        strokeUniform: true,
      });
      canvas.add(polygon);
      setState({
        activeLine: null,
        activeShape: null,
      });

      setArrayRef({ pointArray: [], lineArray: [] });
      canvas.renderAll();
      setShape(polygon);
      onOpen();
    };

    const addPoints = (options) => {
      const random = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
      const id = new Date().getTime() + random;
      const pointer = canvas.getPointer(options.e);
      const scaleFactor = getScaleFactor(viewer);

      const circle = new fabric.Circle({
        radius: 4 / scaleFactor,
        fill: "#ffffff",
        stroke: "#333333",
        strokeWidth: 1 / scaleFactor,
        left: pointer.x,
        top: pointer.y,
        selectable: false,
        hasBorders: false,
        hasControls: false,
        originX: "center",
        originY: "center",
        id,
        objectCaching: false,
      });
      if (arrayRef.current.pointArray.length === 0) {
        circle.set({
          fill: "red",
        });
      }
      const points = [pointer.x, pointer.y, pointer.x, pointer.y];
      const line = new fabric.Line(points, {
        strokeWidth: 1 / scaleFactor,
        fill: `${myStateRef.current.color.hex}40`,
        stroke: "black",
        class: "line",
        originX: "center",
        originY: "center",
        selectable: false,
        hasBorders: false,
        hasControls: false,
        evented: false,
        objectCaching: false,
      });

      let polygon = null;

      if (myStateRef.current.activeShape) {
        const points = myStateRef.current.activeShape.get("points");
        points.push({
          x: pointer.x,
          y: pointer.y,
        });
        polygon = new fabric.Polygon(points, {
          stroke: "black",
          strokeWidth: 1 / scaleFactor,
          fill: `${myStateRef.current.color.hex}40`,
          selectable: false,
          hasBorders: false,
          hasControls: false,
          evented: false,
          objectCaching: false,
        });
        canvas.remove(myStateRef.current.activeShape);
      } else {
        const polyPoint = [
          {
            x: pointer.x,
            y: pointer.y,
          },
        ];
        polygon = new fabric.Polygon(polyPoint, {
          stroke: "black",
          strokeWidth: 1 / scaleFactor,
          fill: `${myStateRef.current.color.hex}40`,
          selectable: false,
          hasBorders: false,
          hasControls: false,
          evented: false,
          objectCaching: false,
        });
      }

      setState({ activeShape: polygon, activeLine: line });
      setArrayRef({
        pointArray: [...arrayRef.current.pointArray, circle],
        lineArray: [...arrayRef.current.lineArray, line],
      });

      canvas.add(polygon);
      canvas.add(line);
      canvas.add(circle);
      canvas.selection = false;
      canvas.renderAll();
    };

    const handleMouseDown = (options) => {
      if (
        arrayRef.current.pointArray.length !== 0 &&
        options.target &&
        options.target.id === arrayRef.current.pointArray[0].id
      ) {
        canvas.selection = true;
        generatePolygon();
      } else {
        addPoints(options);
      }
    };

    const handleMouseMove = (options) => {
      if (
        myStateRef.current.activeLine &&
        myStateRef.current.activeLine.class === "line"
      ) {
        const pointer = canvas.getPointer(options.e);
        myStateRef.current.activeLine.set({ x2: pointer.x, y2: pointer.y });

        const points = myStateRef.current.activeShape.get("points");
        points[arrayRef.current.pointArray.length] = {
          x: pointer.x,
          y: pointer.y,
        };
        myStateRef.current.activeShape.set({
          points,
        });
        canvas.renderAll();
      }
    };

    const handleMouseDblClick = (options) => {
      if (arrayRef.current.pointArray.length === 0) return;
      if (
        options.target &&
        options.target.id !== arrayRef.current.pointArray[0].id
      ) {
        addPoints(options);
      }
      canvas.selection = true;
      generatePolygon();
    };

    canvas.on("mouse:down", handleMouseDown);
    canvas.on("mouse:move", handleMouseMove);
    canvas.on("mouse:dblclick", handleMouseDblClick);
    return () => {
      canvas.off("mouse:down", handleMouseDown);
      canvas.off("mouse:move", handleMouseMove);
      canvas.off("mouse:dblclick", handleMouseDblClick);
    };
  }, [fabricOverlay, isActive]);

  useEffect(() => {
    if (!shape || !textbox) return;

    const timeStamp = Date.now();

    const addToFeed = async (shape) => {
      const message = {
        username: "",
        color: myStateRef.current.color,
        action: "added",
        text: textbox,
        timeStamp,
        type: "polygon",
        object: shape,
        image: null,
      };

      const hash = md5(shape + timeStamp);
      shape.set({ hash, zoomLevel: viewer.viewport.getZoom() });

      message.image = await getCanvasImage(viewerId);
      message.object.set({ id: message.timeStamp });

      const canvas = fabricOverlay.fabricCanvas();
      const annotations = canvas.toJSON(["hash", "text", "zoomLevel"]);
      if (annotations.objects.length > 0) {
        saveAnnotationsHandler(slideId, annotations.objects);
      }

      setFabricOverlayState(
        updateActivityFeed({ id: viewerId, feed: [...activityFeed, message] })
      );

      setShape(null);
      setTextbox(false);
    };

    addToFeed(shape);
  }, [textbox]);

  const handleClick = () => {
    setFabricOverlayState(updateTool({ tool: "Polygon" }));
  };

  const handleSave = ({ text, tag }) => {
    shape.set({ isExist: true, text, tag });
    setTextbox(true);
    onClose();
  };

  const handleClose = () => {
    shape.set({ isExist: true, text: "" });
    setTextbox(true);
    onClose();
  };

  return (
    <>
      <TypeButton
        icon={<FaDrawPolygon />}
        backgroundColor={isActive ? "#E4E5E8" : ""}
        borderRadius="0px"
        label="Polygon"
        onClick={handleClick}
      />
      <EditText
        isOpen={isOpen}
        onClose={onClose}
        handleClose={handleClose}
        handleSave={handleSave}
      />
    </>
  );
};

export default Polygon;
