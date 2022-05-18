import React, { useEffect } from "react";
import { Box, Text, HStack, Flex, Icon } from "@chakra-ui/react";
import { fabric } from "openseadragon-fabricjs-overlay";
import { SiTarget } from "react-icons/si";
import { BsEraser } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Draw from "../Draw/draw";
import Square from "../Shape/square";
import Line from "../Shape/line";
import Circle from "../Shape/circle";
import Typebutton from "../typeButton";
import Polygon from "../Shape/polygon";
import { useFabricOverlayState } from "../../state/store";

const TypeTools = ({ viewerId, typeToolsButtonHandler }) => {
  const { fabricOverlayState } = useFabricOverlayState();
  const { fabricOverlay } = fabricOverlayState.viewerWindow[viewerId];

  fabric.IText.prototype.onKeyDown = (e) => {
    if (e.ctrlKey === true && e.key === "Enter") {
      fabricOverlay.fabricCanvas().discardActiveObject();
    }
  };

  return (
    <Flex direction="column" paddingTop="5px">
      <Flex h="5px" bgColor="rgba(236, 236, 236, 1)" />
      <HStack px="16px" h="42px" bgColor="rgba(248, 248, 245, 1)">
        <Line viewerId={viewerId} />
        <Typebutton
          disabled
          icon={<SiTarget size={18} color="rgba(21, 28, 37, 1)" />}
        />
        <Square viewerId={viewerId} />
        <Circle viewerId={viewerId} />
        <Polygon viewerId={viewerId} />
        <Draw viewerId={viewerId} />
        <Typebutton
          disabled
          icon={<BsEraser size={18} color="rgba(21, 28, 37, 1)" />}
        />
        label="Eraser"
        <Typebutton
          disabled
          icon={<AiOutlineInfoCircle size={18} color="rgba(21, 28, 37, 1)" />}
        />
      </HStack>
    </Flex>
  );
};

export default TypeTools;
