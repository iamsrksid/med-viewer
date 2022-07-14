import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  HStack,
  Flex,
  Icon,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
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
import MagicWandTool from "../Tools/magicWandTool";

const TypeTools = ({ viewerId, saveAnnotationsHandler, setTotalCells }) => {
  const { fabricOverlayState } = useFabricOverlayState();
  const { fabricOverlay } = fabricOverlayState.viewerWindow[viewerId];
  const [activeButton, setActiveButton] = useState(null);

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
        boxShadow="1px 1px 2px rgba(176, 200, 214, 0.5)"
        bgColor="#FCFCFC"
      >
        <Flex h="12px" bgColor="rgba(236, 236, 236, 1)" cursor="crosshair" />
        <SimpleGrid columns={2} px="8px" bgColor="#fff" py="8px" spacing={2}>
          <Line
            viewerId={viewerId}
            saveAnnotationsHandler={saveAnnotationsHandler}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
          <MagicWandTool
            viewerId={viewerId}
            setTotalCells={setTotalCells}
            saveAnnotationsHandler={saveAnnotationsHandler}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
          <Square
            viewerId={viewerId}
            saveAnnotationsHandler={saveAnnotationsHandler}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
          <Circle
            viewerId={viewerId}
            saveAnnotationsHandler={saveAnnotationsHandler}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
          <Polygon
            viewerId={viewerId}
            saveAnnotationsHandler={saveAnnotationsHandler}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
          <Draw
            viewerId={viewerId}
            saveAnnotationsHandler={saveAnnotationsHandler}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
          <RemoveObject
            viewerId={viewerId}
            saveAnnotationsHandler={saveAnnotationsHandler}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
        </SimpleGrid>
      </Flex>
    </Draggable>
  );
};

export default TypeTools;
