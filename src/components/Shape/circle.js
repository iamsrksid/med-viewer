import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { fabric } from "openseadragon-fabricjs-overlay";
import { BsCircle } from "react-icons/bs";
import { useDisclosure, useMediaQuery } from "@chakra-ui/react";
import md5 from "md5";
import useFabricHelpers from "../../utility/use-fabric-helpers";
import { fonts } from "../Text/fontPicker";
import {
  getCanvasImage,
  getFontSize,
  getTimestamp,
} from "../../utility/utility";
import TypeButton from "../typeButton";
import EditText from "../Feed/editText";
import { useFabricOverlayState } from "../../state/store";
import {
  updateActivityFeed,
  updateTool,
} from "../../state/actions/fabricOverlayActions";

const Circle = ({ viewerId }) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { color, viewerWindow, activeTool } = fabricOverlayState;

  const { fabricOverlay, viewer, zoomValue, activityFeed } =
    viewerWindow[viewerId];

  const { deselectAll } = useFabricHelpers();
  const isActive = activeTool === "Circle";

  const [shape, setShape] = useState(null);
  const [textbox, setTextbox] = useState(false);

  const [myState, setState] = useState({
    activeShape: null, // active shape in Options Panel
    color: null,
    currentDragShape: null,
    isActive: false, // Is the Shape tool itself active
    isMouseDown: false,
    origX: null, // starting X point for drag creating an object
    origY: null,
  });
  const myStateRef = useRef(myState);
  const setMyState = (data) => {
    myStateRef.current = { ...myState, ...data };
    setState((state) => ({ ...state, ...data }));
  };
  const { isOpen, onClose, onOpen } = useDisclosure();

  const screenSize = useMediaQuery([
    "(max-width: 1280px)",
    "(max-width: 1440px)",
    "(max-width: 1920px)",
    "(max-width: 2560px)",
  ]);

  /**
   * Handle primary tool change
   */
  useEffect(() => {
    setMyState({ activeShape: null, isActive });
  }, [isActive]);

  /**
   * Handle color change
   */
  useEffect(() => {
    setMyState({ color });
  }, [color.hex]);

  /**
   * Handle an individual shape being selected
   */
  useEffect(() => {
    if (!fabricOverlay || !isActive) return;
    const canvas = fabricOverlay.fabricCanvas();

    canvas.defaultCursor = "crosshair";

    // Deselect all Fabric Canvas objects
    deselectAll(canvas);
  }, [isActive]);

  /**
   * Add shapes and handle mouse events
   */
  useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    /**
     * Mouse down
     */
    function handleMouseDown(options) {
      if (options.target || !myStateRef.current.isActive) {
        return;
      }

      canvas.selection = false;

      // Disable OSD mouseclicks
      viewer.setMouseNavEnabled(false);
      viewer.outerTracker.setTracking(false);

      // Save starting mouse down coordinates
      const pointer = canvas.getPointer(options.e);
      const origX = pointer.x;
      const origY = pointer.y;

      // Create new Shape instance
      let newShape = null;
      const shapeOptions = {
        color: myStateRef.current.color.hex,
        left: origX,
        top: origY,
        width: 0,
        height: 0,
      };

      // Stroke fill
      const scaleFactor = zoomValue !== 0 ? zoomValue / 40 : 1 / 40;

      const fillProps = {
        fill: `${myStateRef.current.color.hex}40`,
        stroke: "#000000",
        strokeWidth: 1 / scaleFactor,
        strokeUniform: true,
      };

      /**
       * Circle
       */
      newShape = new fabric.Ellipse({
        ...shapeOptions,
        ...fillProps,
        originX: "left",
        originY: "top",
        rx: pointer.x - origX,
        ry: pointer.y - origY,
        angle: 0,
      });
      canvas.add(newShape);

      setMyState({
        ...myStateRef.current,
        currentDragShape: newShape,
        isMouseDown: true,
        origX,
        origY,
      });

      // Add new shape to the canvas
      // newShape && fabricOverlay.fabricCanvas().add(newShape);
    }

    /**
     * Mouse move
     */
    function handleMouseMove(options) {
      if (
        // options.target ||
        !myStateRef.current.isActive ||
        !myStateRef.current.currentDragShape
      ) {
        return;
      }
      const c = myStateRef.current;

      // Dynamically drag size element to the canvas
      const pointer = canvas.getPointer(options.e);

      let rx = Math.abs(c.origX - pointer.x) / 2;
      let ry = Math.abs(c.origY - pointer.y) / 2;
      if (rx > c.currentDragShape.strokeWidth) {
        rx -= c.currentDragShape.strokeWidth / 2;
      }
      if (ry > c.currentDragShape.strokeWidth) {
        ry -= c.currentDragShape.strokeWidth / 2;
      }
      c.currentDragShape.set({ rx, ry });

      if (c.origX > pointer.x) {
        c.currentDragShape.set({ originX: "right" });
      } else {
        c.currentDragShape.set({ originX: "left" });
      }
      if (c.origY > pointer.y) {
        c.currentDragShape.set({ originY: "bottom" });
      } else {
        c.currentDragShape.set({ originY: "top" });
      }

      fabricOverlay.fabricCanvas().renderAll();
    }

    const fontSize = getFontSize(screenSize, zoomValue);

    // Create new Textbox instance and add it to canvas
    const createTextbox = ({ left, top, height }) => {
      const tbox = new fabric.IText("", {
        left,
        top: top + height + 2,
        fontFamily: fonts[0].fontFamily,
        fontSize,
        fontWeight: "bold",
        selectionBackgroundColor: "rgba(255, 255, 255, 0.5)",
      });

      fabricOverlay.fabricCanvas().add(tbox);
      canvas.setActiveObject(tbox);
      tbox.enterEditing();
    };

    /**
     * Mouse up
     */
    function handleMouseUp(options) {
      if (
        !myStateRef.current.isActive ||
        !myStateRef.current.currentDragShape
      ) {
        return;
      }

      canvas.selection = true;

      // Enable OSD mouseclicks
      viewer.setMouseNavEnabled(true);
      viewer.outerTracker.setTracking(true);

      canvas.setActiveObject(myStateRef.current.currentDragShape);

      canvas.renderAll();

      const currShape = myStateRef.current.currentDragShape;

      setShape(myStateRef.current.currentDragShape);

      let [left, top, height, width] = [
        currShape.left,
        currShape.top,
        currShape.height,
        currShape.width,
      ];

      if (currShape.type === "ellipse") {
        if (currShape.originX === "right") left -= width;
        if (currShape.originY === "bottom") height = 0;
      }

      setMyState({
        ...myStateRef.current,
        currentDragShape: null,
        isMouseDown: false,
      });

      onOpen();
    }

    // Add click handlers
    canvas.on("mouse:down", handleMouseDown);
    canvas.on("mouse:move", handleMouseMove);
    canvas.on("mouse:up", handleMouseUp);
    // Remove handler
    return () => {
      canvas.off("mouse:down", handleMouseDown);
      canvas.off("mouse:move", handleMouseMove);
      canvas.off("mouse:up", handleMouseUp);
    };
  }, [isActive]);

  // group shape and textbox together
  // first remove both from canvas then group them and then add group to canvas
  useEffect(() => {
    const addToFeed = async () => {
      if (!shape || !textbox) return;
      const canvas = fabricOverlay.fabricCanvas();

      const message = {
        username: "",
        color: shape.stroke,
        action: "added",
        text: textbox,
        timeStamp: getTimestamp(),
        type: shape.type,
        object: shape,
        image: null,
      };

      const { left, top, rx, ry } = shape;
      const hash = md5({ left, top, rx, ry });
      shape.set({ hash, zoomLevel: zoomValue });

      message.image = await getCanvasImage(viewerId);
      message.object.set({ id: message.timeStamp });

      setShape(null);
      setTextbox(false);

      setFabricOverlayState(
        updateActivityFeed({ id: viewerId, feed: [...activityFeed, message] })
      );
    };

    addToFeed();

    // send annotation
    // socket.emit(
    //   "send_annotations",
    //   JSON.stringify({
    //     roomName,
    //     username,
    //     content: canvas,
    //     feed: [...activityFeed, message],
    //   })
    // );
  }, [textbox]);

  const handleClick = () => {
    setFabricOverlayState(updateTool({ tool: "Circle" }));
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
        icon={<BsCircle />}
        backgroundColor={isActive ? "#E4E5E8" : ""}
        borderRadius="0px"
        label="Circle"
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

export default Circle;
