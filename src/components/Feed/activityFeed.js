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
} from "@chakra-ui/react";
import { Scrollbars } from "react-custom-scrollbars";
import "../../styles/scrollBar.css";
import { AiFillLock, AiOutlineEye } from "react-icons/ai";
import { BiDotsVertical } from "react-icons/bi";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditText from "./editText";
import { useFabricOverlayState } from "../../state/store";
import { updateActivityFeed } from "../../state/actions/fabricOverlayActions";

const ActivityFeed = ({ userInfo, viewerId }) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { fabricOverlay, activityFeed } =
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
    canvas.requestRenderAll();
  };

  const handleSave = (text) => {
    annotationObject.text = text;
    setAnnotationObject(null);
    onClose();
  };

  const handleEditClick = (activity) => {
    setAnnotationObject(activity.object);
    onOpen();
  };

  const deleteObject = (activity) => {
    const canvas = fabricOverlay.fabricCanvas();
    console.log(activity.object);
    const feed = activityFeed.filter(
      (af) => af.timeStamp !== activity.timeStamp
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
    <>
      <Scrollbars
        ref={scrollbar}
        style={{ width: "100%", height: "100%", borderWidth: "0px" }}
        renderThumbVertical={(props) => (
          <div {...props} className="thumb-vertical" />
        )}
        autoHide
      >
        <VStack w="100%" align="center">
          {activityFeed.map((activity, index) => (
            <Box
              key={index}
              w="100%"
              px="5px"
              pt="5px"
              pb="2px"
              color="black"
              backgroundColor="#ECECEC"
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
              <VStack
                w="100%"
                align="flex-start"
                justify="center"
                pl={2}
                my={3}
              >
                <HStack
                  w="100%"
                  justify={activity?.object?.text ? "space-between" : "normal"}
                  pr={5}
                  spacing={4}
                >
                  <Text fontSize="14px" fontFamily="inter" fontWeight="bold">
                    {activity?.object?.text ? "Description" : "No Description"}
                  </Text>
                  {activity?.object && activity?.object?.isExist ? (
                    <EditTextButton activity={activity} />
                  ) : null}
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
                  onClick={() => deleteObject(activity)}
                />
                <Icon as={BiDotsVertical} w={4} h={4} />
              </HStack>
            </Box>
          ))}
        </VStack>
      </Scrollbars>
      <EditText
        isOpen={isOpen}
        onClose={onClose}
        handleClose={onClose}
        handleSave={handleSave}
      />
    </>
  );
};

export default ActivityFeed;
