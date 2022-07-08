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
} from "@chakra-ui/react";
import "../../styles/scrollBar.css";
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
  const { fabricOverlay, activityFeed, viewer } =
    fabricOverlayState?.viewerWindow[viewerId];

  const scrollbar = useRef(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [annotationObject, setAnnotationObject] = useState(null);

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
    <Box
      w="16.52vw"
      pos="absolute"
      right="0"
      zIndex={100}
      h="89.5%"
      background="#FCFCFC"
      boxShadow="-1px 0px 2px rgba(176, 200, 214, 0.3)"
      overflow="scroll"
    >
      {/* <Scrollbars
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
          X
        </Text>
      </Flex>
      <Accordion allowMultiple pb="2vh">
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Annotation Details
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Flex pb="0.5vh">
              <Image src={TumorIcon} />
              <Text ml="0.5vw">Tumor</Text>
            </Flex>
            <Flex pb="0.5vh">
              <Image src={StromaIcon} />
              <Text ml="0.8vw">Stroma</Text>
            </Flex>
            <Flex pb="0.5vh">
              <Image src={ImmuneCellsIcon} />
              <Text ml="0.8vw">Immune Cells</Text>
            </Flex>
            <Flex pb="0.5vh">
              <Image src={NecrosisIcon} />
              <Text ml="0.8vw">Necrosis</Text>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <VStack w="100%" align="center" right={0}>
        {activityFeed.map((activity, index) => (
          <Box
            key={index}
            w="100%"
            px="5px"
            pt="5px"
            pb="2px"
            color="black"
            backgroundColor="#FCFCFC"
            cursor="pointer"
            onClick={() => handleClick(activity)}
          >
            <HStack pl={2} align="flex-start" spacing={4}>
              <Image
                borderWidth="2px"
                backgroundColor="white"
                crossOrigin="anonymous"
                width="40%"
                height="6em"
                objectFit="contain"
                src={activity?.image}
              />
              <VStack>
                <Flex w="100%" verticalAlign="top" fontWeight="bold">
                  <Text color="#151C25" fontFamily="inter" fontSize="14px">
                    {`${userInfo?.firstName} ${userInfo?.lastName}`}
                  </Text>
                  <Spacer />
                </Flex>
              </VStack>
            </HStack>
            <VStack w="100%" align="flex-start" justify="center" pl={2} my={3}>
              <HStack
                w="100%"
                justify={activity?.object?.text ? "space-between" : "normal"}
                pr={5}
                spacing={4}
              >
                <Text fontSize="14px" fontFamily="inter" fontWeight="bold">
                  {activity?.object?.text ? "Description" : "No Description"}
                </Text>
                {activity?.object && activity?.object?.isExist
                  ? // <EditTextButton activity={activity} />
                    null
                  : null}
              </HStack>
              {activity?.object?.text ? (
                <Box height="2.5em" width="100%">
                  <Text fontSize="xs" textAlign="left" color="#151C25">
                    {activity?.object?.text}
                  </Text>
                </Box>
              ) : null}
            </VStack>
            <HStack
              color="black"
              pl={2}
              pr={5}
              py={2}
              mb={1}
              spacing={4}
              cursor="pointer"
              justify="flex-end"
              borderTop="2px solid #E4E5E8 "
            >
              <Icon as={AiOutlineEye} w={4} h={4} />
              <Icon as={AiFillLock} w={4} h={4} />
              <Icon
                as={RiDeleteBin6Line}
                w={4}
                h={4}
                onClick={(e) => deleteObject(e, activity)}
              />
              <Icon as={BiDotsVertical} w={4} h={4} />
            </HStack>
          </Box>
        ))}
      </VStack>
      {/* </Scrollbars> */}
      <EditText
        isOpen={isOpen}
        onClose={onClose}
        handleClose={onClose}
        handleSave={handleSave}
      />

      {/* <Text display={popup ? "flex" : "none"}>Hello</Text> */}
    </Box>
  );
};

export default ActivityFeed;
