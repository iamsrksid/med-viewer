import { useState, useEffect } from "react";
import { useFabricOverlayState } from "../state/store";

const useCanvasHelpers = () => {
  const { fabricOverlayState } = useFabricOverlayState();
  const { activeTool, viewerWindow } = fabricOverlayState;

  const [canvases, setCanvases] = useState([]);

  useEffect(() => {
    if (!viewerWindow) return;
    const canvas = [];
    Object.keys(viewerWindow).forEach((key) => {
      canvas.push(viewerWindow[key].fabricOverlay);
    });
    setCanvases(canvas);
  }, [viewerWindow]);

  // Remove all Fabric canvas objects
  const clearCanvas = (canvas) => {
    if (!canvas) return;
    canvas.clear();
  };

  const getUserObjects = () => {
    if (!canvases) return null;
    const objects = canvases.getObjects();
    const selectableObjects = objects.filter((obj) => obj.selectable);
    return selectableObjects;
  };

  const clearUserObjects = (canvas, activityFeed) => {
    if (!canvas) return;
    const userObjects = getUserObjects();
    Object.values(userObjects).forEach((obj) => {
      canvas.remove(obj);
    });

    // let message = {
    //   username: "",
    //   color: "",
    //   action: "deleted all annotations",
    //   text: "",
    //   timeStamp: getTimestamp(),
    //   type: "CLEAR",
    // };

    // dispatch(updateActivityFeed([...activityFeed, message]));

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

  // Deselect all Fabric canvas objects
  const deselectAll = (canvas) => {
    if (!canvas) return;
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  };

  const makeObjectsInvisible = (fabricObjects = []) => {
    if (!canvases) return;

    fabricObjects.forEach((obj) => {
      obj.set({ opacity: 0 });
    });
    canvases.renderAll();
  };

  const makeObjectsVisible = (fabricObjects = []) => {
    fabricObjects.forEach((obj) => {
      obj.set({ opacity: 1 });
    });
    canvases.renderAll();
  };

  const updateCursor = (canvas) => {
    if (!canvas) return;

    canvas.defaultCursor = "auto";
    canvas.hoverCursor = "move";
  };

  return {
    clearCanvas,
    clearUserObjects,
    deselectAll,
    getUserObjects,
    makeObjectsInvisible,
    makeObjectsVisible,
    updateCursor,
  };
};

export default useCanvasHelpers;
