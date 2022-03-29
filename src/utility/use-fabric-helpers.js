import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateActivityFeed } from "../reducers/fabricOverlayReducer";
import { getTimestamp } from "./utility";

const useCanvasHelpers = () => {
  const { activeTool, viewerWindow } = useSelector(
    (state) => state.fabricOverlayState
  );
  const { username, roomName, socket, alias } = useSelector(
    (state) => state.socketState
  );

  const dispatch = useDispatch();
  const [canvas, setCanvas] = useState([]);

  useEffect(() => {
    if (!viewerWindow) return;
    let canvases = [];
    for (let key in viewerWindow)
      canvases.push(viewerWindow[key].fabricOverlay);
    setCanvas(canvases);
  }, [viewerWindow]);

  // Remove all Fabric canvas objects
  const clearCanvas = (canvas) => {
    if (!canvas) return;
    canvas.clear();
  };

  const clearUserObjects = (canvas, activityFeed) => {
    if (!canvas) return;
    const userObjects = getUserObjects();
    for (let i in userObjects) {
      canvas.remove(userObjects[i]);
    }

    let message = {
      username: alias,
      color: "",
      action: "deleted all annotations",
      text: "",
      timeStamp: getTimestamp(),
      type: "CLEAR",
    };

    dispatch(updateActivityFeed([...activityFeed, message]));

    socket.emit(
      "send_annotations",
      JSON.stringify({
        roomName,
        username,
        content: canvas,
        feed: [...activityFeed, message],
      })
    );
  };

  // Deselect all Fabric canvas objects
  const deselectAll = (canvas) => {
    if (!canvas) return;
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  };

  const getUserObjects = () => {
    if (!canvas) return;
    const objects = canvas.getObjects();
    const selectableObjects = objects.filter((obj) => obj.selectable);
    return selectableObjects;
  };

  const makeObjectsInvisible = (fabricObjects = []) => {
    if (!canvas) return;

    for (let obj of fabricObjects) {
      obj.opacity = 0;
    }
    canvas.renderAll();
  };

  const makeObjectsVisible = (fabricObjects = []) => {
    for (let obj of fabricObjects) {
      obj.opacity = 1;
    }
    canvas.renderAll();
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
