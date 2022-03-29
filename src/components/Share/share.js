import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import rug from "random-username-generator";
import { useSelector, useDispatch } from "react-redux";
import {
  updateSocketDetails,
  updateAnnotations,
  updateGuestDetails,
} from "../../reducers/socketReducer";
import AltButton from "../altButton";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Input,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { updateActivityFeed } from "../../reducers/feedReducer";

const ShareAnnotation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [_roomName, setRoomName] = useState("");
  const [alias, setAlias] = useState(rug.generate());
  const [sharing, setSharing] = useState(false);
  const cancelRef = useRef();

  const onClose = () => setIsOpen(false);
  const { fabricOverlay, userCanvases } = useSelector(
    (state) => state.fabricOverlayState
  );
  const { username, roomName, socket, guestList } = useSelector(
    (state) => state.socketState
  );
  const dispatch = useDispatch();

  const handleConnect = async () => {
    let _username = await uuidv4();
    socket.emit("join_room", {
      room: _roomName,
      guest: { username: _username, alias },
    });
    let user = { username, alias };
    dispatch(
      updateSocketDetails({
        username: _username,
        roomName: _roomName,
        alias: alias,
      })
    );
    onClose();
  };

  const handleInputChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleAliasChange = (e) => {
    setAlias(e.target.value);
  };

  useEffect(() => {
    socket.emit("send_guest_list", { roomName: _roomName, alias });
  });

  useEffect(() => {
    socket.on("receive_guest_list", (data) => {
      dispatch(
        updateGuestDetails({ guestCount: data.length, guestList: [...data] })
      );
    });
  });

  useEffect(() => {
    if (roomName === "") setSharing(false);
  }, [roomName]);

  useEffect(() => {
    socket.on("receive_annotations", (data) => {
      if (fabricOverlay) {
        let annotations = {
          ...userCanvases,
          [data.username]: {
            locWorkId: window.location.href.split("/").pop(),
            fabricCanvas: data.content,
          },
        };
        dispatch(updateAnnotations(annotations));
        dispatch(updateActivityFeed(data.feed));
        let canvas = fabricOverlay.fabricCanvas();
        canvas.loadFromJSON(
          annotations[data.username]["fabricCanvas"],
          canvas.renderAll.bind(canvas)
        );
      }
    });
  });
  return (
    <>
      {!sharing && (
        <AltButton
          onClick={() => {
            setIsOpen(true);
          }}
          colorScheme="blue"
          variant="solid"
        >
          Share Annotations
        </AltButton>
      )}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Connect to a Room</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody space={2}>
            <Input
              margin="10px 0"
              placeholder="Enter Room Name"
              value={_roomName}
              onChange={(e) => handleInputChange(e)}
            />
            <Input
              placeholder={alias}
              value={alias}
              onChange={(e) => handleAliasChange(e)}
            />
          </AlertDialogBody>
          <AlertDialogFooter>
            <AltButton
              ref={cancelRef}
              onClick={() => {
                onClose();
                setSharing(false);
              }}
              colorScheme="red"
              variant="solid"
            >
              Cancel
            </AltButton>
            <AltButton
              colorScheme="blue"
              variant="solid"
              ml={3}
              onClick={() => {
                handleConnect();
                setSharing(true);
              }}
            >
              Connect
            </AltButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ShareAnnotation;
