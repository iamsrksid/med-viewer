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
import RemoveObject from "../removeComponents";
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
      <Flex
        direction="column"
        pos="fixed"
        left="0"
        boxShadow="1px 1px 2px rgba(176, 200, 214, 0.5)"
        bgColor="#FCFCFC"
      >
        <Flex h="12px" bgColor="rgba(236, 236, 236, 1)" cursor="crosshair" />
        <VStack px="8px" bgColor="#fff" py="8px">
          <HStack spacing={2}>
            <Line
              viewerId={viewerId}
              saveAnnotationsHandler={saveAnnotationsHandler}
            />
            {/* <Typebutton
            disabled
            icon={<SiTarget size={18} color="rgba(21, 28, 37, 1)" />}
          /> */}
            <Square
              viewerId={viewerId}
              saveAnnotationsHandler={saveAnnotationsHandler}
            />
          </HStack>
          <HStack spacing={2}>
            <Circle
              viewerId={viewerId}
              saveAnnotationsHandler={saveAnnotationsHandler}
            />
            <Polygon
              viewerId={viewerId}
              saveAnnotationsHandler={saveAnnotationsHandler}
            />
          </HStack>
          <HStack>
            <Draw
              viewerId={viewerId}
              saveAnnotationsHandler={saveAnnotationsHandler}
            />
            {/* <Typebutton
              disabled
              icon={<BsEraser size={18} color="rgba(21, 28, 37, 1)" />}
              label="Eraser"
            /> */}
            <RemoveObject
              viewerId={viewerId}
              saveAnnotationsHandler={saveAnnotationsHandler}
            />
          </HStack>
        </VStack>
      </Flex>
    </Draggable>
  );
};

export default TypeTools;
