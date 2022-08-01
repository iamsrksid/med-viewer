import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  Icon,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import "../../styles/scrollBar.css";
import { Scrollbars } from "react-custom-scrollbars";
import { BiRectangle } from "react-icons/bi";
import { MdModeEditOutline } from "react-icons/md";
import { BsCircle, BsSlash } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { FaDrawPolygon } from "react-icons/fa";
import EditText from "./editText";
import { useFabricOverlayState } from "../../state/store";
import { removeFromActivityFeed } from "../../state/actions/fabricOverlayActions";
import { saveAnnotationsToDB } from "../../utility/utility";

const EditTextButton = ({ feed, handleEditClick, ...restProps }) => {
  return (
    <Icon
      as={MdModeEditOutline}
      cursor="pointer"
      onClick={() => handleEditClick(feed)}
      {...restProps}
    />
  );
};

const ActivityFeed = ({
  userInfo,
  viewerId,
  totalCells,
  handlePopup,
  popup,
  saveAnnotationsHandler,
  showFeedBar,
}) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { activeTool, viewerWindow } = fabricOverlayState;
  const { fabricOverlay, activityFeed, viewer, tile, slideId } =
    viewerWindow[viewerId];

  const scrollbar = useRef(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [annotationObject, setAnnotationObject] = useState(null);
  const [annotationDetails, setAnnotationsDetails] = useState(null);
  const [ifScreenlessthan1660px] = useMediaQuery("(max-width:1660px)");

  useEffect(() => {
    if (scrollbar.current) scrollbar.current.scrollToBottom();
    if (activityFeed.length === 0) setAnnotationsDetails(null);
  }, [activityFeed]);

  useEffect(() => {
    return () => {
      setAnnotationObject(null);
      setAnnotationsDetails(null);
    };
  }, []);

  useEffect(() => {
    setAnnotationObject(null);
    setAnnotationsDetails(null);
  }, [tile]);

  const handleClick = (feed) => {
    if (!feed.object) return;
    const canvas = fabricOverlay.fabricCanvas();
    canvas.setActiveObject(feed.object);

    // change position to annotation object location
    // except for when MagicWand tool is activated
    if (activeTool !== "MagicWand") {
      const { zoomLevel, left, top, width, height } = feed.object;
      viewer.viewport.zoomTo(zoomLevel);

      // get viewport point of middle of selected annotation
      const vpoint = viewer.viewport.imageToViewportCoordinates(
        left + width / 2,
        top + height / 2
      );
      viewer.viewport.panTo(vpoint);
    }

    canvas.requestRenderAll();
    setAnnotationsDetails(feed);
  };

  const handleSave = ({ text, tag }) => {
    if (!text || !tag) return;
    annotationObject.text = text;
    annotationObject.tag = tag;
    setAnnotationObject(null);
    saveAnnotationsToDB({
      slideId,
      canvas: fabricOverlay.fabricCanvas(),
      saveAnnotationsHandler,
    });
    onClose();
  };

  const handleEditClick = (feed) => {
    setAnnotationObject(feed.object);
    onOpen();
  };

  const deleteObject = (e, feed) => {
    e.stopPropagation();
    const canvas = fabricOverlay.fabricCanvas();
    setFabricOverlayState(
      removeFromActivityFeed({ id: viewerId, hash: feed.object.hash })
    );
    canvas.remove(feed.object);
    canvas.renderAll();
  };

  return (
    <Flex
      as="section"
      w="16.52vw"
      position={showFeedBar ? "unset" : "absolute"}
      // h={ifScreenlessthan1660px ? "calc(100% - 90px)" : "90%"}
      h={
        showFeedBar
          ? "90vh"
          : !showFeedBar && ifScreenlessthan1660px
          ? "calc(100% - 90px)"
          : "90%"
      }
      padding={0}
      margin={0}
      right="0"
      zIndex={2}
      background="#FCFCFC"
      boxShadow={showFeedBar ? "" : "-1px 0px 2px rgba(176, 200, 214, 0.3)"}
      direction="column"
      overflowY="auto"
      overflowX="hidden"
    >
      <Flex
        py="0.5px"
        justifyContent="flex-end"
        alignItems="center"
        background="#F6F6F6"
        display={showFeedBar ? "none" : "flex"}
      >
        <GrFormClose
          size={16}
          onClick={() => handlePopup(!popup)}
          _hover={{ cursor: "pointer" }}
        />
      </Flex>
      <HStack
        fontSize="0.729vw"
        spacing="1vw"
        w="100%"
        h="4vh"
        marginStart="0.8vw"
      >
        {/* <Text>Image Info</Text>
        <Text>Key Points</Text> */}
        <Text color="blue">Annotation</Text>
      </HStack>

      <Flex direction="column" marginStart="0.8vw" pt="3px" overflowY="auto">
        <Text fontSize="1vw" pb="3px">
          Annotation Details
        </Text>
        <Scrollbars
          ref={scrollbar}
          style={{ width: "100%", height: "35vh", borderWidth: "0px" }}
          renderThumbVertical={(props) => <div className="thumb-vertical" />}
          autoHide
        >
          <Flex direction="column">
            {activityFeed.map((feed, index) => {
              return (
                <Flex
                  key={feed.object.hash}
                  pb="0.5vh"
                  borderBottom="1px solid #F6F6F6"
                  cursor="pointer"
                  onClick={() => handleClick(feed)}
                  justify="space-between"
                  align="center"
                >
                  <Flex align="center">
                    {feed.object?.type === "rect" ? (
                      <BiRectangle color="#E23636" />
                    ) : feed.object?.type === "polygon" ? (
                      <FaDrawPolygon color="#E23636" />
                    ) : feed.object?.type === "ellipse" ? (
                      <BsCircle color="#E23636" />
                    ) : (
                      <BsSlash color="#E23636" />
                    )}
                    <Text ml="0.8vw">Annotation {index + 1}</Text>
                  </Flex>
                  <EditTextButton
                    feed={feed}
                    handleEditClick={handleEditClick}
                    mr={2}
                  />
                </Flex>
              );
            })}
          </Flex>
        </Scrollbars>
      </Flex>
      <Flex overflowY="auto" fontSize="14px" direction="column">
        <Box h="10px" background="#F6F6F6" w="100%" />
        <Text
          pt="1.2vh"
          pb="1.2vh"
          fontSize="1vw"
          marginStart="0.8vw"
          fontWeight="bold"
        >
          Annotation Values
        </Text>
        {annotationDetails ? (
          <Scrollbars
            ref={scrollbar}
            style={{ width: "100%", height: "35vh", borderWidth: "0px" }}
            renderThumbVertical={(props) => <div className="thumb-vertical" />}
            autoHide
          >
            {/* <HStack
              borderBottom="1px solid #F6F6F6"
              pb="0.5vw"
              marginStart="0.8vw"
            >
              <Text minW="35%">Slide Name:</Text>
              <Text>{slideName}</Text>
            </HStack> */}
            <HStack
              marginStart="0.8vw"
              borderBottom="1px solid #F6F6F6"
              pb="0.5vw"
            >
              <Text minW="35%">Annotation:</Text>
              <Text>
                {annotationDetails ? annotationDetails.object?.type : "-"}
              </Text>
            </HStack>
            <HStack
              marginStart="0.8vw"
              borderBottom="1px solid #F6F6F6"
              pb="0.5vw"
            >
              <Text minW="35%">Description:</Text>
              <Text>
                {annotationDetails.object?.text
                  ? annotationDetails.object.text
                  : "-"}
              </Text>
            </HStack>

            {annotationDetails.object?.isAnalysed ? (
              <>
                <HStack
                  marginStart="0.8vw"
                  borderBottom="1px solid #F6F6F6"
                  pb="0.5vw"
                >
                  <Text minW="35%">Centroid X:</Text>
                  <Text>{annotationDetails.object.centroid[0]} &micro;m</Text>
                </HStack>
                <HStack
                  marginStart="0.8vw"
                  borderBottom="1px solid #F6F6F6"
                  pb="0.5vw"
                >
                  <Text minW="35%">Centroid Y:</Text>
                  <Text>{annotationDetails.object.centroid[1]} &micro;m</Text>
                </HStack>
                <HStack
                  marginStart="0.8vw"
                  borderBottom="1px solid #F6F6F6"
                  pb="0.5vw"
                >
                  <Text minW="35%">Perimeter:</Text>
                  <Text>
                    {annotationDetails.object.perimeter.toFixed(2)} &micro;m
                  </Text>
                </HStack>
                <HStack
                  marginStart="0.8vw"
                  borderBottom="1px solid #F6F6F6"
                  pb="0.5vw"
                >
                  <Text minW="35%">Area:</Text>
                  <Text>
                    {annotationDetails.object.area} &micro;m<sup>2</sup>
                  </Text>
                </HStack>
                <HStack
                  marginStart="0.8vw"
                  borderBottom="1px solid #F6F6F6"
                  pb="0.5vw"
                  mt={4}
                >
                  <Text minW="35%">Total Cells:</Text>
                  <Text>{totalCells || "-"}</Text>
                </HStack>
              </>
            ) : null}
          </Scrollbars>
        ) : null}
      </Flex>
      <EditText
        isOpen={isOpen}
        onClose={onClose}
        value={annotationObject?.text ? annotationObject.text : ""}
        handleClose={onClose}
        handleSave={handleSave}
      />
    </Flex>
  );
};

export default ActivityFeed;
