import React, { useState, useEffect, useRef } from "react";
import { BsSlash } from "react-icons/bs";
import { fabric } from "openseadragon-fabricjs-overlay";
import md5 from "md5";
import { useDisclosure, useMediaQuery } from "@chakra-ui/react";
import TypeButton from "../typeButton";
import { useFabricOverlayState } from "../../state/store";
import {
  updateTool,
  updateActivityFeed,
} from "../../state/actions/fabricOverlayActions";
import {
  getCanvasImage,
  getScaleFactor,
  getTimestamp,
} from "../../utility/utility";
import EditText from "../Feed/editText";

const Line = ({ viewerId }) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { activeTool, viewerWindow, color } = fabricOverlayState;
  const { fabricOverlay, viewer, activityFeed } = viewerWindow[viewerId];
  const isActive = activeTool === "Line";

  const [shape, setShape] = useState(null);
  const [textbox, setTextbox] = useState(false);

  const [myState, setState] = useState({
    color: null,
    currentDragShape: null,
    isActive: false, // Is the Shape tool itself active
    isMouseDown: false,
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
    setMyState({ isActive });
  }, [isActive]);

  /**
   * Handle color change
   */
  useEffect(() => {
    setMyState({ color });
  }, [color]);

  /**
   * Handle an individual shape being selected
   */
  useEffect(() => {
    if (!fabricOverlay || !isActive) return;
    const canvas = fabricOverlay.fabricCanvas();

    canvas.defaultCursor = "crosshair";
  }, [isActive]);

  /**
   * Add shapes and handle mouse events
   */
  useEffect(() => {
    if (!fabricOverlay || !isActive) return null;
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

      // Create new Shape instance
      let newShape = null;
      const shapeOptions = {
        color: myStateRef.current.color.hex,
        originX: "center",
        originY: "center",
      };

      // Stroke fill
      const scaleFactor = getScaleFactor(viewer);

      const fillProps = {
        stroke: myStateRef.current.color.hex,
        strokeWidth: 1 / scaleFactor,
        strokeUniform: true,
      };

      const points = [pointer.x, pointer.y, pointer.x, pointer.y];
      newShape = new fabric.Line(points, {
        ...shapeOptions,
        ...fillProps,
      });
      canvas.add(newShape);

      setMyState({
        ...myStateRef.current,
        currentDragShape: newShape,
        isMouseDown: true,
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

      c.currentDragShape.set({ x2: pointer.x, y2: pointer.y });
      canvas.renderAll();
    }

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
      viewer.setMouseNavEnabled(true);
      viewer.outerTracker.setTracking(true);

      canvas.setActiveObject(myStateRef.current.currentDragShape);

      canvas.renderAll();

      const currShape = myStateRef.current.currentDragShape;

      currShape.setCoords();
      setShape(myStateRef.current.currentDragShape);

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
      // if (!shape) return;

      const timeStamp = Date.now();

      const message = {
        username: "",
        color: shape.stroke,
        action: "added",
        text: textbox,
        timeStamp,
        type: shape.type,
        object: shape,
        image: null,
      };

      const hash = md5(shape + timeStamp);
      shape.set({ hash, zoomLevel: viewer.viewport.getZoom() });

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
    setFabricOverlayState(updateTool({ tool: "Line" }));
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
        pl="0px"
        icon={<BsSlash size={25} color="#151C25" />}
        backgroundColor={isActive ? "#E4E5E8" : ""}
        borderRadius="0px"
        label="Line"
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

export default Line;
