import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  Spacer,
  HStack,
  Text,
  VStack,
  Icon,
  Image,
  useDisclosure,
  Button,
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
import { updateActivityFeed } from "../../state/actions/fabricOverlayActions";
import TumorIcon from "../../assets/images/TumorIcon.svg";
import StromaIcon from "../../assets/images/StromaIcon.svg";
import ImmuneCellsIcon from "../../assets/images/ImmuneCellsIcon.svg";
import NecrosisIcon from "../../assets/images/NecrosisIcon.svg";

const EditTextButton = ({ activity, handleEditClick }) => {
  return activity?.object?.text ? (
    <Icon
      as={MdModeEditOutline}
      cursor="pointer"
      onClick={() => handleEditClick(activity)}
    />
  ) : (
    <Button
      variant="solid"
      py={1}
      h="26px"
      borderRadius={0}
      backgroundColor="#ECECEC"
      size="sm"
      border="0.5px solid #00153F"
      color="#00153F"
      fontFamily="inter"
      fontSize="14px"
      fontWeight="bold"
      _hover={{
        backgroundColor: "#00153F20",
      }}
      _focus={{
        backgroundColor: "#00153F30",
      }}
      onClick={() => handleEditClick(activity)}
    >
      Add
    </Button>
  );
};

const ActivityFeed = ({
  userInfo,
  viewerId,
  totalCells,
  handlePopup,
  popup,
}) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { fabricOverlay, activityFeed, viewer, slideName } =
    fabricOverlayState.viewerWindow[viewerId];

  const scrollbar = useRef(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [annotationObject, setAnnotationObject] = useState(null);
  const [annotationDetails, setAnnotationsDetails] = useState(null);
  const [ifScreenlessthan1660px] = useMediaQuery("(max-width:1660px)");

  useEffect(() => {
    if (scrollbar.current) scrollbar.current.scrollToBottom();
  }, [activityFeed]);

  const handleClick = (activity) => {
    if (!activity.object || !activity.object.isExist) return;
    const canvas = fabricOverlay.fabricCanvas();
    canvas.setActiveObject(activity.object);
    const { zoomLevel, left, top, width, height } = activity.object;
    viewer.viewport.zoomTo(zoomLevel);

    // get viewport point of middle of selected annotation
    const vpoint = viewer.viewport.imageToViewportCoordinates(
      left + width / 2,
      top + height / 2
    );
    viewer.viewport.panTo(vpoint);
    canvas.requestRenderAll();
  };

  const handleSave = ({ text, tag }) => {
    annotationObject.text = text;
    annotationObject.tag = tag;
    setAnnotationObject(null);
    onClose();
  };

  const handleEditClick = (activity) => {
    setAnnotationObject(activity.object);
    onOpen();
  };

  const deleteObject = (e, activity) => {
    e.stopPropagation();
    const canvas = fabricOverlay.fabricCanvas();
    const feed = activityFeed.filter(
      (af) => af.object.hash !== activity.object.hash
    );
    canvas.remove(activity.object);
    canvas.renderAll();
    setFabricOverlayState(updateActivityFeed({ id: viewerId, feed }));
  };

  return (
    <Flex
      as="section"
      w="16.52vw"
      position="absolute"
      h={ifScreenlessthan1660px ? "calc(100% - 90px)" : "90%"}
      padding={0}
      margin={0}
      right="0"
      zIndex={2}
      background="#FCFCFC"
      boxShadow="-1px 0px 2px rgba(176, 200, 214, 0.3)"
      direction="column"
      overflowY="auto"
      overflowX="hidden"
    >
      <Flex
        py="0.5px"
        justifyContent="flex-end"
        alignItems="center"
        background="#F6F6F6"
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
                <Box key={feed.hash}>
                  {feed?.type === "rect" ? (
                    <Flex
                      pb="0.5vh"
                      borderBottom="1px solid #F6F6F6"
                      cursor="pointer"
                      onClick={() => setAnnotationsDetails(feed)}
                    >
                      <BiRectangle color="#E23636" />
                      <Text ml="0.8vw">Annotation {index + 1}</Text>
                    </Flex>
                  ) : feed?.type === "polygon" ? (
                    <Flex
                      pb="0.5vh"
                      borderBottom="1px solid #F6F6F6"
                      cursor="pointer"
                      onClick={() => setAnnotationsDetails(feed)}
                      align="center"
                    >
                      <FaDrawPolygon color="#E23636" />
                      <Text ml="0.5vw">Annotation {index + 1}</Text>
                    </Flex>
                  ) : feed?.type === "ellipse" ? (
                    <Flex
                      pb="0.5vh"
                      borderBottom="1px solid #F6F6F6"
                      cursor="pointer"
                      onClick={() => setAnnotationsDetails(feed)}
                    >
                      <BsCircle color="#E23636" />
                      <Text ml="0.8vw">Annotation {index + 1}</Text>
                    </Flex>
                  ) : (
                    <Flex
                      pb="0.5vh"
                      borderBottom="1px solid #F6F6F6"
                      cursor="pointer"
                      onClick={() => setAnnotationsDetails(feed)}
                    >
                      <BsSlash color="#E23636" />
                      <Text ml="0.8vw">Annotation {index + 1}</Text>
                    </Flex>
                  )}
                </Box>
              );
            })}
          </Flex>
        </Scrollbars>
      </Flex>
      <Flex overflowY="auto" fontSize="14px" direction="column">
        <Box h="10px" background="#F6F6F6" w="100%" />
        <Text pt="1.2vh" pb="1.2vh" fontSize="1vw" marginStart="0.8vw">
          Annotation Values
        </Text>
        {annotationDetails ? (
          <Scrollbars
            ref={scrollbar}
            style={{ width: "100%", height: "35vh", borderWidth: "0px" }}
            renderThumbVertical={(props) => <div className="thumb-vertical" />}
            autoHide
          >
            <HStack
              borderBottom="1px solid #F6F6F6"
              pb="0.5vw"
              marginStart="0.8vw"
            >
              <Text minW="35%">Slide Name:</Text>
              <Text>{slideName}</Text>
            </HStack>
            <HStack
              marginStart="0.8vw"
              borderBottom="1px solid #F6F6F6"
              pb="0.5vw"
            >
              <Text minW="35%">Annotation:</Text>
              <Text>{annotationDetails ? annotationDetails.type : "NULL"}</Text>
            </HStack>
            {annotationDetails.type === "cell" ? (
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
              </>
            ) : (
              <HStack
                marginStart="0.8vw"
                borderBottom="1px solid #F6F6F6"
                pb="0.5vw"
              >
                <Text minW="35%">Description:</Text>
                <Text>
                  {annotationDetails.object.text
                    ? annotationDetails.object.text
                    : "-"}
                </Text>
              </HStack>
            )}
            {annotationDetails.type === "cell" ? (
              <HStack
                marginStart="0.8vw"
                borderBottom="1px solid #F6F6F6"
                pb="0.5vw"
                mt={4}
              >
                <Text minW="35%">Total Cells:</Text>
                <Text>{totalCells || "-"}</Text>
              </HStack>
            ) : null}
          </Scrollbars>
        ) : null}
      </Flex>
      <EditText
        isOpen={isOpen}
        onClose={onClose}
        handleClose={onClose}
        handleSave={handleSave}
      />
    </Flex>
  );
};

export default ActivityFeed;
