import React, { useState, useEffect } from "react";
import { BsEraser } from "react-icons/bs";
import { IconButton, Image } from "@chakra-ui/react";
import IconSize from "./ViewerToolbar/IconSize";
import { useFabricOverlayState } from "../state/store";
import { addToActivityFeed } from "../state/actions/fabricOverlayActions";
import EraseIcon from "../assets/images/eraseIcon.svg";

const RemoveObject = ({ viewerId, saveAnnotationsHandler }) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { fabricOverlay, activityFeed, slideId } =
    fabricOverlayState.viewerWindow[viewerId];
  const [isActiveObject, setIsActiveObject] = useState();

  useEffect(() => {
    if (!fabricOverlay) return null;

    const handleSelectionCleared = (e) => {
      setIsActiveObject(false);
    };
    const handleSelectionCreated = (e) => {
      setIsActiveObject(true);
    };

    const canvas = fabricOverlay.fabricCanvas();
    canvas.on("selection:created", handleSelectionCreated);
    canvas.on("selection:cleared", handleSelectionCleared);

    return () => {
      canvas.off("selection:created", handleSelectionCreated);
      canvas.off("selection:cleared", handleSelectionCleared);
    };
  }, [fabricOverlay]);

  const handleRemoveObject = async () => {
    const canvas = fabricOverlay.fabricCanvas();
    const activeObject = canvas.getActiveObject();

    // Object has children (ie. arrow has children objects triangle and line)
    if (activeObject.getObjects) {
      const objs = activeObject.getObjects();
      Object.values(objs).forEach((obj) => {
        canvas.remove(obj);
      });
    }

    // let message = {
    //   username: alias,
    //   color: activeObject._objects
    //     ? activeObject._objects[0].stroke
    //     : activeObject.stroke,
    //   action: "deleted",
    //   text: activeObject._objects ? activeObject._objects[1].text : "",
    //   timeStamp: getTimestamp(),
    //   type: activeObject._objects
    //     ? activeObject._objects[0].type
    //     : activeObject.type,
    //   image: null,
    // };

    // activeObject.set({ isExist: false });

    // message.image = await getCanvasImage(viewerId);

    const feed = activityFeed.filter((af) => af.object?.id !== activeObject.id);

    canvas.remove(activeObject);
    canvas.renderAll();

    const annotations = canvas.toJSON(["hash", "text", "zoomLevel", "points"]);
    saveAnnotationsHandler(slideId, []);

    // setFabricOverlayState(addToActivityFeed({ id: viewerId, feed }));

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

  return (
    // <TypeButton
    //   onClick={handleRemoveObject}
    //   icon={<RiDeleteBin6Line size={IconSize()} color="#151C25" />}
    //   disabled={!isActiveObject}
    //   // backgroundColor={!isActiveObject ? "#898888" : "#dddddd"}
    //   // color={!isActiveObject ? "black" : "#3963c3"}
    //   // _focus={{ backgroundColor: "white", color: "black" }}
    //   // _hover={{ backgroundColor: !isActiveObject ? "#898888" : "#dddddd" }}
    //   label="Remove Item"
    // />
    <IconButton
      icon={<BsEraser size={20} />}
      onClick={handleRemoveObject}
      borderRadius={0}
      bg="#F6F6F6"
      disabled={!isActiveObject}
      title="Remove Item"
    />
  );
};

export default RemoveObject;
