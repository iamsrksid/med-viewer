import React, { useState, useEffect } from "react";
import { useZoom, OpenSeadragon } from "use-open-seadragon";
import "./zoom-levels";
import "./openseadragon-scalebar";
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Portal,
  Tooltip,
  VStack,
  Text,
} from "@chakra-ui/react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import ZoomSlider from "../ZoomSlider/slider";
import ToolbarButton from "../ViewerToolbar/button";
import IconSize from "../ViewerToolbar/IconSize";
import FullScreen from "../Fullscreen/Fullscreen";
import { useFabricOverlayState } from "../../state/store";

const ViewerControls = ({ viewerId, slideName, slideType }) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { viewer } = fabricOverlayState?.viewerWindow[viewerId];
  const [scalebar, setScalebar] = useState(null);
  const iconSize = IconSize();

  const handleZoomIn = (e) => {
    try {
      if (viewer.viewport.getMaxZoom() > viewer.viewport.getZoom()) {
        viewer.viewport.zoomBy(1.0 / 0.7);
      }
    } catch (e) {
      console.error("Error handling Zoom In button click", e);
    }
  };

  const handleZoomOut = (e) => {
    try {
      if (viewer.viewport.getMinZoom() < viewer.viewport.getZoom()) {
        viewer.viewport.zoomBy(0.7);
      }
    } catch (e) {
      console.error("Error handling Zoom Out button click", e);
    }
  };

  useEffect(() => {
    if (viewer) {
      const scalebarInit = viewer.scalebar({
        type: 1,
        pixelsPerMeter: 250000,
        minWidth: "75px",
        maxWidth: "75px",
        location: 4,
        xOffset: 5,
        yOffset: 10,
        stayInsideImage: true,
        color: "white",
        fontColor: "white",
        backgroundColor: "black",
        fontSize: "14px",
        barThickness: 2,
        stayInsideImage: false,
      });

      setScalebar(scalebarInit);
    }
  }, [viewer]);

  const ZoomButton = (restProps) => {
    return (
      <IconButton
        size="sm"
        // backgroundColor="#E4E5E8"
        // boxShadow="lg"
        _focus={{ border: "none" }}
        {...restProps}
      />
    );
  };

  return (
    <>
      {/* {isMultiView && (
        <Box position="absolute" left="20px" top="20px" zIndex="1">
          <HStack color="blue.400" fontSize={10}>
            <Text as="button">View Details</Text>
            <Text onClick={handleSelectSlide} as="button">
              Select this slide
            </Text>
          </HStack>
          <Text fontWeight="bold">Slide {viewerId.slice(-1)}: Name/info</Text>
        </Box>
        
      )} */}
      {slideType ? (
        <Box
          position="absolute"
          left="1.01vh"
          top="0.937vw"
          zIndex="1"
          minW="7.65vw"
          minH="3.88vh"
        >
          <Box minW="7.65vw" minH="0.370vh" bgColor="#ECECEC" />

          <HStack bgColor="#F8F8F5" fontSize="1.25vw">
            <Text
              fontFamily="fira sans"
              fontWeight="500"
              px="0.820vw"
            >{`${slideName}-${slideType}`}</Text>
          </HStack>
        </Box>
      ) : null}
      {/* <Box zIndex="1000">
        <ButtonGroup spacing="3" size="lg">
        <Tooltip label="Zoom in" aria-label="Zoom in">
          <IconButton
            icon={<AiOutlinePlus />}
            onClick={handleZoomIn}
            size="md"
            border="1px solid gray"
            borderRadius="25px"
          />
        </Tooltip>
        <Tooltip label="Zoom out" aria-label="Zoom out">
          <IconButton
            icon={<AiOutlineMinus />}
            onClick={handleZoomOut}
            size="md"
            border="1px solid gray"
            borderRadius="25px"
          />
        </Tooltip> */}
      {/* <Tooltip label="Undo" aria-label="Undo">
            <IconButton
              icon={<RiArrowGoBackFill />}
              aria-label="Undo"
              size={buttonSize}
              disabled
            />
          </Tooltip>
          <Tooltip label="Redo" aria-label="Redo">
            <IconButton
              icon={<RiArrowGoForwardLine />}
              aria-label="Redo"
              size={buttonSize}
              disabled
            />
          </Tooltip>   */}
      {/* </ButtonGroup> */}
      <VStack
        // w="fit-content"
        backgroundColor="#F8F8F5"
        border="1px solid #00153F"
        // borderRadius="5px"
        py={2}
        px={1.5}
        zIndex="1"
        position="absolute"
        right="20px"
        top="20px"
      >
        <FullScreen viewerId={viewerId} />
      </VStack>
      <VStack
        // w="fit-content"
        backgroundColor="#F8F8F5"
        border="1px solid #00153F"
        // borderRadius="5px"
        py={2}
        px={1.5}
        zIndex="1"
        position="absolute"
        right="20px"
        top="10.48vh"
      >
        <ToolbarButton
          icon={<AiOutlinePlus color="#00153F" size={iconSize} />}
          // border="1px solid #3965C6"
          backgroundColor="#E4E5E8"
          onClick={handleZoomIn}
          label="Zoom In"
          mr="0px"
          _hover={{ bgColor: "#ECECEC" }}
          _active={{
            outline: "none",
          }}
        />
        <ZoomSlider viewerId={viewerId} />
        <ToolbarButton
          icon={<AiOutlineMinus color="#00153F" size={iconSize} />}
          // border="1px solid #3965C6"
          backgroundColor="#E4E5E8"
          onClick={handleZoomOut}
          label="Zoom Out"
          mr="0px"
          _hover={{ bgColor: "#ECECEC" }}
          _active={{
            outline: "none",
          }}
        />
      </VStack>
      {/* </Box> */}
    </>
  );
};

export default ViewerControls;
