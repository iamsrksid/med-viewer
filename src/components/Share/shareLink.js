import React, { useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  Select,
  Spacer,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import TypeButton from "../typeButton";
import { RiShareForwardLine } from "react-icons/ri";
import { BiLink } from "react-icons/bi";
import Popup from "../Popup/popup";
import IconSize from "../ViewerToolbar/IconSize";

const ShareLink = (restProps) => {
  const [popup, setPopup] = useState(false);
  const handlePopup = () => {
    setPopup(!popup);
  };
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  return (
    <>
      <Tooltip
        label="Share"
        placement="bottom"
        openDelay={0}
        bg="#E4E5E8"
        color="rgba(89, 89, 89, 1)"
        fontSize="14px"
        fontFamily="inter"
        hasArrow
        borderRadius="0px"
        size="20px"
      >
        <Button
          // size="sm"
          variant="solid"
          h="32px"
          // px="27px"
          ml="15px"
          borderRadius="0px"
          rightIcon={<RiShareForwardLine color="#fff" size={IconSize()} />}
          backgroundColor="#00153F"
          _hover={{}}
          _focus={{
            border: "none",
          }}
          color="#fff"
          fontFamily="inter"
          fontSize="14px"
          fontWeight="500"
          {...restProps}
          onClick={handlePopup}
        >
          Share
        </Button>
      </Tooltip>
      <AlertDialog
        motionPreset="slideInBottom"
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogContent className="share">
          <AlertDialogHeader color="#3965C6" padding="20px">
            <Flex>
              <TypeButton size={28} color="black" marginRight="10px" />
            </Flex>
          </AlertDialogHeader>
          <AlertDialogBody space={2}>
            <Flex>
              <Flex border="0.5px solid " borderColor="#B3D9FF" px="5px">
                <Input
                  size="sm"
                  variant="unstyled"
                  placeholder="Share with people and groups"
                />
                <Select
                  variant="unstyled"
                  placeholder="can edit"
                  marginLeft={5}
                  width={130}
                  size="sm"
                >
                  <option value="option1">can view</option>
                  <option value="option2">can comment</option>
                </Select>
              </Flex>
              <Button
                backgroundColor="#3965C6"
                color="white"
                variant="solid"
                size="sm"
                ml={3}
                paddingLeft={5}
                paddingRight={5}
                _hover={{ bg: "#66a3ff" }}
              >
                send invite
              </Button>
            </Flex>
            <Flex colorScheme="blue">
              <TypeButton
                icon={<BiLink />}
                marginTop={2}
                marginRight={3}
                size={15}
              />
              <Select
                variant="unstyled"
                placeholder="Anyone with the link"
                marginTop={2}
                width="12em"
                size="sm"
              >
                <option value="option1">Restricted</option>
              </Select>
              <Spacer />
              <Select
                variant="unstyled"
                placeholder="can edit"
                marginLeft={5}
                width={130}
                size="sm"
              >
                <option value="option1">can view</option>
                <option value="option2">can comment</option>
              </Select>
            </Flex>
            <Stack>
              <Box
                border="0.5px solid"
                borderColor="#B3D9FF"
                borderRadius="5px"
                padding="10px"
              >
                <Flex>
                  <Image
                    borderRadius="full"
                    boxSize="50px"
                    marginRight={3}
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    alt="Zoe Margut"
                  />
                  <Box>
                    <Text color="#3965C6" fontWeight="bold" fontSize={17}>
                      Zoe Margot (You)
                    </Text>
                    <Text color="#80AAFF" fontSize={14}>
                      zoemargut27@gmail.com
                    </Text>
                  </Box>
                  <Spacer />
                  <Center color="CCCCB3" as="i">
                    Owner
                  </Center>
                </Flex>
              </Box>
            </Stack>
          </AlertDialogBody>
          <Flex>
            <Button
              backgroundColor="#3965C6"
              color="white"
              variant="ghost"
              size="sm"
              m={6}
              _hover={{ bg: "#66a3ff" }}
            >
              Give Feedback
            </Button>
            <Spacer />
            <Button
              backgroundColor="#3965C6"
              color="white"
              variant="solid"
              size="sm"
              m={6}
              _hover={{ bg: "#66a3ff" }}
              onClick={() => onClose()}
            >
              Done
            </Button>
          </Flex>
        </AlertDialogContent>
      </AlertDialog>
      <Popup
        handlePopup={() => {
          handlePopup();
        }}
        popup={popup}
      />
    </>
  );
};

export default ShareLink;
