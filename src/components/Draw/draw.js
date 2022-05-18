import React, { useState, useEffect, useRef } from "react";
import { FaPaintBrush } from "react-icons/fa";
import { useMediaQuery, useDisclosure } from "@chakra-ui/react";
import useHexRGB from "../../utility/use-hex-rgb";
import { fabric } from "openseadragon-fabricjs-overlay";
import { fonts } from "../Text/fontPicker";
import {
  getCanvasImage,
  getFontSize,
  getTimestamp,
} from "../../utility/utility";
import TypeButton from "../typeButton";
import EditText from "../Feed/editText";
import { widths } from "./width";
import { useFabricOverlayState } from "../../state/store";
import {
  updateActivityFeed,
  updateTool,
} from "../../state/actions/fabricOverlayActions";
import md5 from "md5";

const getDrawCursor = (brushSize, brushColor) => {
  brushSize = brushSize < 4 ? 8 : brushSize * 3;
  const circle = `
		<svg
			height="${brushSize}"
			fill="${brushColor}"
			viewBox="0 0 ${brushSize * 2} ${brushSize * 2}"
			width="${brushSize}"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				cx="50%"
				cy="50%"
				r="${brushSize}" 
			/>
		</svg>
	`;

  return `data:image/svg+xml;base64,${window.btoa(circle)}`;
};

const createFreeDrawingCursor = (brushWidth, brushColor) => {
  return `url(${getDrawCursor(brushWidth, brushColor)}) ${brushWidth / 2} ${
    brushWidth / 2
  }, crosshair`;
};

const Draw = ({ viewerId }) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { color, viewerWindow, activeTool } = fabricOverlayState;

  const { fabricOverlay, viewer, zoomValue, activityFeed } =
    viewerWindow[viewerId];

  const { hexToRGBA } = useHexRGB();
  const isActive = activeTool === "DRAW";

  const [path, setPath] = useState(null);
  const [textbox, setTextbox] = useState(false);

  const [myState, setState] = useState({
    width: widths[0],
    isActive: false,
  });
  const myStateRef = useRef(myState.isActive);
  const setMyState = (data) => {
    myStateRef.current = data;
    setState((state) => ({ ...state, isActive: data }));
  };
  const { isOpen, onClose, onOpen } = useDisclosure();

  const screenSize = useMediaQuery([
    "(max-width: 1280px)",
    "(max-width: 1440px)",
    "(max-width: 1920px)",
    "(max-width: 2560px)",
  ]);

  useEffect(() => {
    setMyState(isActive);
  }, [isActive]);

  useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    function handleMouseDown() {
      if (!myStateRef.current.isActive) return;
      // Need this as double protection to make sure OSD isn't swallowing
      // Fabric's drawing mode for some reason
      canvas.selection = false;
      viewer.setMouseNavEnabled(false);
      viewer.outerTracker.setTracking(false);
    }
    canvas.on("mouse:down", handleMouseDown);

    return () => {
      canvas.off("mouse:down", handleMouseDown);
    };
  }, [fabricOverlay]);

  useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();

    const fontSize = getFontSize(screenSize, zoomValue);

    // Create new Textbox instance and add it to canvas
    const createTextbox = ({ left, top, height }) => {
      const tbox = new fabric.IText("", {
        left: left,
        top: top + height + 10,
        fontFamily: fonts[0].fontFamily,
        fontSize: fontSize,
        fontWeight: "bold",
        selectionBackgroundColor: "rgba(255, 255, 255, 0.5)",
      });

      fabricOverlay.fabricCanvas().add(tbox);
      canvas.setActiveObject(tbox);
      tbox.enterEditing();
    };

    // to set path when draw completes
    const pathCreated = (e) => {
      canvas.selection = true;
      setPath(e.path);
      onOpen();
    };
 
    if (isActive) {
      const brushWidth = myState.width.pixelWidth;
      const scaleFactor = zoomValue !== 0 ? zoomValue / 40 : 1 / 40;
      // Enable Fabric drawing; disable OSD mouseclicks
      viewer.setMouseNavEnabled(false);
      viewer.outerTracker.setTracking(false);
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = color.hex;
      canvas.freeDrawingBrush.width = brushWidth / scaleFactor;
      canvas.renderAll();

      // EXAMPLE: of using an image for cursor
      // https://i.stack.imgur.com/fp7eL.png
      //canvas.freeDrawingCursor = `url(${logo}) 0 50, auto`;

      canvas.freeDrawingCursor = createFreeDrawingCursor(brushWidth, color.hex);

      canvas.on("path:created", pathCreated);
      // console.log(canvas._objects)
    } else {
      // Disable Fabric drawing; enable OSD mouseclicks
      viewer.setMouseNavEnabled(true);
      viewer.outerTracker.setTracking(true);
      canvas.isDrawingMode = false;
      canvas.freeDrawingCursor = "";
    }

    // Remove handler
    return () => {
      canvas.off("path:created", pathCreated);
    };
  }, [isActive]);

  useEffect(() => {
    // Update brush color and size with Fabric
    if (!fabricOverlay || !isActive) return;

    const canvas = fabricOverlay.fabricCanvas();
    const brushWidth = myState.width.pixelWidth;
    const scaleFactor = zoomValue !== 0 ? zoomValue / 40 : 1 / 40;

    canvas.freeDrawingBrush.color = color.hex;
    canvas.freeDrawingBrush.width = brushWidth / scaleFactor;
    canvas.freeDrawingCursor = createFreeDrawingCursor(brushWidth, color.hex);
  }, [color, myState.width]);

  // group drawing (path) and textbox together
  // first remove both from canvas then group them and then add group to canvas
  useEffect(() => {
    if (!path || !textbox) return;
    const canvas = fabricOverlay.fabricCanvas();

    const addToFeed = async (path) => {
      let message = {
        username: "",
        color: path.stroke,
        action: "added",
        text: textbox,
        timeStamp: getTimestamp(),
        type: path.type,
        object: path,
        image: null,
      };

      const hash = md5(path?.path);
      path.set({ hash, zoomLevel: zoomValue });

      message.image = await getCanvasImage(viewerId);
      message.object.set({ id: message.timeStamp });

      setFabricOverlayState(
        updateActivityFeed({
          id: viewerId,
          feed: [...activityFeed, message],
        })
      );

      setPath(null);
      setTextbox(false);

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
    };

    addToFeed(path);
  }, [textbox]);

  const handleToolbarClick = () => {
    setFabricOverlayState(updateTool({ tool: "DRAW" }));
  };

  const handleSave = ({ text, tag }) => {
    path.set({ isExist: true, text, tag });
    setTextbox(true);
    onClose();
  };

  const handleClose = () => {
    path.set({ isExist: true, text: "" });
    setTextbox(true);
    onClose();
  };

  return (
    <>
      <TypeButton
        onClick={handleToolbarClick}
        icon={<FaPaintBrush size={12} />}
        backgroundColor={isActive ? "#E4E5E8" : ""}
        borderRadius="0px"
        label="Draw"
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

export default Draw;
