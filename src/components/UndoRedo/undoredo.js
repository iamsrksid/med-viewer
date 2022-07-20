import React, { useState, useEffect } from "react";
import { IconButton, Flex } from "@chakra-ui/react";
import { RiArrowGoBackFill, RiArrowGoForwardLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import "fabric-history/src/index";
import ToolbarButton from "../ViewerToolbar/button";
import IconSize from "../ViewerToolbar/IconSize";
import { useFabricOverlayState } from "../../state/store";

const UndoRedo = ({ viewerId }) => {
  const { fabricOverlayState } = useFabricOverlayState();
  const { fabricOverlay } = fabricOverlayState?.viewerWindow[viewerId];
  const [canvas, setCanvas] = useState();
  const params = useParams();
  const [hover, setHover] = useState(null);

  useEffect(() => {
    if (!fabricOverlay) return;
    const canvasLocal = fabricOverlay.fabricCanvas();
    setCanvas(canvasLocal);
    canvasLocal.clearHistory();
  }, [fabricOverlay]);

  useEffect(() => {
    if (!params || !canvas) return;
    fabricOverlay.fabricCanvas().clearHistory();
    fabricOverlay.fabricCanvas().clear();
  }, [params.id]);

  const handleUndo = () => {
    fabricOverlay.fabricCanvas().undo();
  };

  const handleRedo = () => {
    fabricOverlay.fabricCanvas().redo();
  };

  return (
    <Flex ml="18px">
      <ToolbarButton
        icon={
          <RiArrowGoBackFill
            size={IconSize()}
            color={hover === "undo" ? "#3B5D7C" : "#151C25"}
          />
        }
        onClick={handleUndo}
        onMouseEnter={() => setHover("undo")}
        onMouseLeave={() => setHover(null)}
        label="Undo"
        mr="8px"
      />
      <ToolbarButton
        icon={
          <RiArrowGoForwardLine
            size={IconSize()}
            color={hover === "redo" ? "#3B5D7C" : "#151C25"}
          />
        }
        onClick={handleRedo}
        onMouseEnter={() => setHover("redo")}
        onMouseLeave={() => setHover(null)}
        label="Redo"
        mr="8px"
      />
    </Flex>
  );
};

export default UndoRedo;
