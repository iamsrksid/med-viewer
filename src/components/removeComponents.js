import React, { useState, useEffect } from "react";
import { IconButton, useToast } from "@chakra-ui/react";
import IconSize from "./ViewerToolbar/IconSize";
import { useFabricOverlayState } from "../state/store";
import { removeFromActivityFeed } from "../state/actions/fabricOverlayActions";
import { EraseIcons, EraseIconsFilled } from "./Icons/CustomIcons";

const RemoveObject = ({ viewerId, saveAnnotationsHandler }) => {
  const toast = useToast();
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { fabricOverlay, slideId } = fabricOverlayState.viewerWindow[viewerId];
  const [isActiveObject, setIsActiveObject] = useState();

  useEffect(() => {
    if (!fabricOverlay) return null;

    const canvas = fabricOverlay.fabricCanvas();

    const handleSelectionCleared = () => {
      setIsActiveObject(false);
    };
    const handleSelectionCreated = () => {
      setIsActiveObject(true);
    };

    setIsActiveObject(canvas.getActiveObject());

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

    // // Object has children (ie. arrow has children objects triangle and line)
    // if (activeObject.getObjects) {
    //   const objs = activeObject.getObjects();
    //   Object.values(objs).forEach((obj) => {
    //     canvas.remove(obj);
    //   });
    // }

    setFabricOverlayState(
      removeFromActivityFeed({ id: viewerId, hash: activeObject.hash })
    );

    canvas.remove(activeObject);
    canvas.renderAll();

    const annotations = canvas.toJSON(["hash", "text", "zoomLevel", "points"]);
    saveAnnotationsHandler(slideId, annotations.objects);

    // show annotation deleted notification
    toast({
      title: "Annotation deleted",
      status: "success",
      duration: 1000,
      isClosable: true,
    });

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
    <IconButton
      icon={<EraseIcons />}
      onClick={handleRemoveObject}
      borderRadius={0}
      bg="#F6F6F6"
      disabled={!isActiveObject}
      title="Remove Item"
      _focus={{ border: "none", background: "#DEDEDE" }}
    />
  );
};

export default RemoveObject;
