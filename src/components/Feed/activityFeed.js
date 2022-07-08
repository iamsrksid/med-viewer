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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
} from "@chakra-ui/react";
import "../../styles/scrollBar.css";
import { Scrollbars } from "react-custom-scrollbars";
import { AiFillLock, AiOutlineEye } from "react-icons/ai";
import { BiDotsVertical } from "react-icons/bi";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditText from "./editText";
import { useFabricOverlayState } from "../../state/store";
import { updateActivityFeed } from "../../state/actions/fabricOverlayActions";
import TumorIcon from "../../assets/images/TumorIcon.svg";
import StromaIcon from "../../assets/images/StromaIcon.svg";
import ImmuneCellsIcon from "../../assets/images/ImmuneCellsIcon.svg";
import NecrosisIcon from "../../assets/images/NecrosisIcon.svg";

const ActivityFeed = ({ userInfo, viewerId, handlePopup, popup }) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { fabricOverlay, activityFeed, viewer, slideName } =
    fabricOverlayState?.viewerWindow[viewerId];

  const scrollbar = useRef(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [annotationObject, setAnnotationObject] = useState(null);
  const [annotationDetails, setAnnotationsDetails] = useState(null);

  console.log(activityFeed);

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

  const EditTextButton = ({ activity }) => {
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

  return (
    <Flex
      w="16.52vw"
      h="89.2%"
      pos="absolute"
      right="0"
      zIndex={100}
      background="#FCFCFC"
      boxShadow="-1px 0px 2px rgba(176, 200, 214, 0.3)"
      direction="column"
      overflowY="auto"
      overflowX="hidden"
    >
      {/* <>
      <Scrollbars
        ref={scrollbar}
        style={{ width: "100%", height: "100%", borderWidth: "0px" }}
        renderThumbVertical={(props) => <div className="thumb-vertical" />}
        autoHide
      > */}
      <Flex
        h="1.5vh"
        justifyContent="flex-end"
        alignItems="center"
        background="#F6F6F6"
      >
        <Text
          onClick={() => handlePopup(!popup)}
          _hover={{ cursor: "pointer" }}
        >
          x
        </Text>
      </Flex>
      <HStack
        fontSize="0.729vw"
        spacing="1vw"
        w="100%"
        h="4vh"
        marginStart="0.8vw"
      >
        <Text>Image Info</Text>
        <Text>Key Points</Text>
        <Text color="blue">Annotation</Text>
      </HStack>

      <Flex
        direction="column"
        marginStart="0.8vw"
        pt="3px"
        h="47%"
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#C4C4C4",
          },
        }}
      >
        <Text fontSize="1vw" pb="3px">
          Annotation Details
        </Text>
        <Flex direction="column">
          {activityFeed.map((feed) => {
            return (
              <Box>
                {feed?.type === "rect" ? (
                  <Flex
                    pb="0.5vh"
                    borderBottom="1px solid #F6F6F6"
                    cursor="pointer"
                    onClick={() => setAnnotationsDetails(feed)}
                  >
                    <Image src={StromaIcon} />
                    <Text ml="0.8vw">Stroma</Text>
                  </Flex>
                ) : feed?.type === "polygon" ? (
                  <Flex
                    pb="0.5vh"
                    borderBottom="1px solid #F6F6F6"
                    cursor="pointer"
                    onClick={() => setAnnotationsDetails(feed)}
                  >
                    <Image src={TumorIcon} />
                    <Text ml="0.5vw">Tumor</Text>
                  </Flex>
                ) : feed?.type === "ellipse" ? (
                  <Flex
                    pb="0.5vh"
                    borderBottom="1px solid #F6F6F6"
                    cursor="pointer"
                    onClick={() => setAnnotationsDetails(feed)}
                  >
                    <Image src={ImmuneCellsIcon} />
                    <Text ml="0.8vw">Immune Cells</Text>
                  </Flex>
                ) : (
                  <Flex
                    pb="0.5vh"
                    borderBottom="1px solid #F6F6F6"
                    cursor="pointer"
                    onClick={() => setAnnotationsDetails(feed)}
                  >
                    <Image src={NecrosisIcon} />
                    <Text ml="0.8vw">Necrosis</Text>
                  </Flex>
                )}
              </Box>
            );
          })}
        </Flex>
      </Flex>
      <Flex h="50%" overflowY="auto" fontSize="14px" direction="column">
        <Box h="10px" background="#F6F6F6" w="100%" />
        <Text pt="1.2vh" pb="1.2vh" fontSize="1vw" marginStart="0.8vw">
          Annotation Values
        </Text>

        <HStack borderBottom="1px solid #F6F6F6" pb="0.5vw" marginStart="0.8vw">
          <Text minW="35%">Slide Name:</Text>
          <Text>{slideName}</Text>
        </HStack>
        <HStack marginStart="0.8vw" borderBottom="1px solid #F6F6F6" pb="0.5vw">
          <Text minW="35%">Annotation:</Text>
          <Text>{annotationDetails ? annotationDetails.type : "NULL"}</Text>
        </HStack>
        <HStack marginStart="0.8vw" borderBottom="1px solid #F6F6F6" pb="0.5vw">
          <Text minW="35%">Tag:</Text>
          <Text>
            {annotationDetails
              ? annotationDetails.type === "rect"
                ? "Stroma"
                : annotationDetails.type === "polygon"
                ? "Tumor"
                : annotationDetails.type === "ellipse"
                ? "Immune Cells"
                : "Necrosis"
              : "NULL"}
          </Text>
        </HStack>
        <HStack marginStart="0.8vw" borderBottom="1px solid #F6F6F6" pb="0.5vw">
          <Text minW="35%">Centroid Xum:</Text>
          <Text>undefined</Text>
        </HStack>
        <HStack marginStart="0.8vw" borderBottom="1px solid #F6F6F6" pb="0.5vw">
          <Text minW="35%">Centroid Yum:</Text>
          <Text>undefined</Text>
        </HStack>
        <HStack marginStart="0.8vw" borderBottom="1px solid #F6F6F6" pb="0.5vw">
          <Text minW="35%">length:</Text>
          <Text>undefined</Text>
        </HStack>
      </Flex>

      {/* </Scrollbars> */}
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
