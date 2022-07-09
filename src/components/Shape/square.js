import React, { useState, useRef, useEffect } from "react";
import { fabric } from "openseadragon-fabricjs-overlay";
import { FcFrame } from "react-icons/fc";
import {
  IconButton,
  useDisclosure,
  useMediaQuery,
  Image,
} from "@chakra-ui/react";
import md5 from "md5";
import useFabricHelpers from "../../utility/use-fabric-helpers";
import { fonts } from "../Text/fontPicker";
import { getCanvasImage, getScaleFactor } from "../../utility/utility";
import EditText from "../Feed/editText";
import { useFabricOverlayState } from "../../state/store";
import {
  updateActivityFeed,
  updateTool,
} from "../../state/actions/fabricOverlayActions";
import SquareIcon from "../../assets/images/squareIcon.svg";

const Square = ({ viewerId, saveAnnotationsHandler }) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { color, viewerWindow, activeTool } = fabricOverlayState;

  const { fabricOverlay, viewer, activityFeed, slideId } =
    viewerWindow[viewerId];

  const { deselectAll } = useFabricHelpers();
  const isActive = activeTool === "Square";

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
  }, [color]);

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
    if (!fabricOverlay) return null;
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
      const scaleFactor = getScaleFactor(viewer);

      const fillProps = {
        fill: `${myStateRef.current.color.hex}40`,
        stroke: "#000000",
        strokeWidth: 1 / scaleFactor,
        strokeUniform: true,
        borderScaleFactor: 0.5,
      };

      newShape = new fabric.Rect({
        ...shapeOptions,
        ...fillProps,
        width: pointer.x - origX,
        height: pointer.y - origY,
      });
      fabricOverlay.fabricCanvas().add(newShape);

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

      /**
       * Rectangle or Triangle
       */
      if (c.origX > pointer.x) {
        c.currentDragShape.set({
          left: Math.abs(pointer.x),
        });
      }
      if (c.origY > pointer.y) {
        c.currentDragShape.set({ top: Math.abs(pointer.y) });
      }
      c.currentDragShape.set({
        width: Math.abs(c.origX - pointer.x),
        height: Math.abs(c.origY - pointer.y),
      });

      fabricOverlay.fabricCanvas().renderAll();
    }

    // // Create new Textbox instance and add it to canvas
    // const createTextbox = ({ left, top, height }) => {
    //   const tbox = new fabric.IText("", {
    //     left: left,
    //     top: top + height + 2,
    //     fontFamily: fonts[0].fontFamily,
    //     fontSize: fontSize,
    //     fontWeight: "bold",
    //     selectionBackgroundColor: "rgba(255, 255, 255, 0.5)",
    //   });

    //   fabricOverlay.fabricCanvas().add(tbox);
    //   canvas.setActiveObject(tbox);
    //   tbox.enterEditing();
    // };

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

      setShape(myStateRef.current.currentDragShape);

      setMyState({
        ...myStateRef.current,
        currentDragShape: null,
        isMouseDown: false,
      });

      onOpen();
    }

    if (isActive) {
      // Add click handlers
      canvas.on("mouse:down", handleMouseDown);
      canvas.on("mouse:move", handleMouseMove);
      canvas.on("mouse:up", handleMouseUp);
    } else {
      canvas.off("mouse:down", handleMouseDown);
      canvas.off("mouse:move", handleMouseMove);
      canvas.off("mouse:up", handleMouseUp);
    }
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
        timeStamp,
        type: shape.type,
        object: shape,
        image: null,
      };

      const hash = md5(shape + timeStamp);

      // message.image = await getCanvasImage(viewerId);
      message.object.set({
        id: message.timeStamp,
        hash,
        zoomLevel: viewer.viewport.getZoom(),
      });

      const canvas = fabricOverlay.fabricCanvas();
      const annotations = canvas.toJSON([
        "hash",
        "text",
        "zoomLevel",
        "points",
      ]);
      if (annotations.objects.length > 0) {
        saveAnnotationsHandler(slideId, annotations.objects);
      }

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
    setFabricOverlayState(updateTool({ tool: "Square" }));
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
      {/* <TypeButton
        icon={<BsSquare />}
        backgroundColor={isActive ? "#E4E5E8" : ""}
        borderRadius="0px"
        label="Square"
        onClick={handleClick}
      /> */}
      <IconButton
        // icon={<FcFrame size={20} color="#000" />}
        onClick={handleClick}
        borderRadius={0}
        bg="#F6F6F6"
        title="Rectangular Annotations"
      >
        <Image src={SquareIcon} />
      </IconButton>
      <EditText
        isOpen={isOpen}
        onClose={onClose}
        handleClose={handleClose}
        handleSave={handleSave}
      />
    </>
  );
};

export default Square;
