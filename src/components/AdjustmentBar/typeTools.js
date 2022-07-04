import React, { useEffect } from "react";
import { Box, Text, HStack, Flex, Icon, VStack } from "@chakra-ui/react";
import { fabric } from "openseadragon-fabricjs-overlay";
import { SiTarget } from "react-icons/si";
import { BsEraser } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Draggable from "react-draggable";
import Draw from "../Draw/draw";
import Square from "../Shape/square";
import Line from "../Shape/line";
import Circle from "../Shape/circle";
import Typebutton from "../typeButton";
import Polygon from "../Shape/polygon";
import { useFabricOverlayState } from "../../state/store";

const TypeTools = ({ viewerId, saveAnnotationsHandler }) => {
  const { fabricOverlayState } = useFabricOverlayState();
  const { fabricOverlay } = fabricOverlayState.viewerWindow[viewerId];

  fabric.IText.prototype.onKeyDown = (e) => {
    if (e.ctrlKey === true && e.key === "Enter") {
      fabricOverlay.fabricCanvas().discardActiveObject();
    }
  };

  return (
    <Draggable>
      <Flex direction="column" paddingTop="5px" pos="fixed" left="0">
        <Flex h="12px" bgColor="rgba(236, 236, 236, 1)" cursor="crosshair" />
        <VStack px="16px" bgColor="rgba(248, 248, 245, 1)">
          <Line
            viewerId={viewerId}
            saveAnnotationsHandler={saveAnnotationsHandler}
          />
          <Typebutton
            disabled
            icon={<SiTarget size={18} color="rgba(21, 28, 37, 1)" />}
          />
          <Square
            viewerId={viewerId}
            saveAnnotationsHandler={saveAnnotationsHandler}
          />
          <Circle
            viewerId={viewerId}
            saveAnnotationsHandler={saveAnnotationsHandler}
          />
          <Polygon
            viewerId={viewerId}
            saveAnnotationsHandler={saveAnnotationsHandler}
          />
          <Draw
            viewerId={viewerId}
            saveAnnotationsHandler={saveAnnotationsHandler}
          />
          <Typebutton
            disabled
            icon={<BsEraser size={18} color="rgba(21, 28, 37, 1)" />}
            label="Eraser"
          />
          <Typebutton
            disabled
            icon={<AiOutlineInfoCircle size={18} color="rgba(21, 28, 37, 1)" />}
          />
        </VStack>
      </Flex>
    </Draggable>
  );
};

export default TypeTools;
