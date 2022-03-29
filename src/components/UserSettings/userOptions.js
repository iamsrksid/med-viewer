import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import rug from "random-username-generator";
import { Input, Flex, Button } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateSocketDetails,
  updateAnnotations,
  updateGuestDetails,
} from "../../reducers/socketReducer";
import { updateSharing } from "../../reducers/shareReducer";
import { updateMessages } from "../../reducers/chatReducer";
import { updateActivityFeed } from "../../reducers/fabricOverlayReducer";

const UserOptions = () => {
  const [_roomName, setRoomName] = useState("");
  // const [_alias, setAlias] = useState(rug.generate());
  const { sharing } = useSelector((state) => state.shareState);

  const { fabricOverlay, userCanvases } = useSelector(
    (state) => state.fabricOverlayState.viewerWindow["viewer1"]
  );
  const { username, roomName, socket, guestList, alias } = useSelector(
    (state) => state.socketState
  );
  const dispatch = useDispatch();
  // console.log(roomName, guestList);

  const handleInputChange = (e) => {
    setRoomName(e.target.value);
  };

  // const handleAliasChange = (e) => {
  //   setAlias(e.target.value);
  // };

  useEffect(() => {
    if (roomName && alias) socket.emit("send_guest_list", { roomName, alias });
  }, [sharing]);

  useEffect(() => {
    const receiveAnnotations = (data) => {
      if (fabricOverlay) {
        let annotations = {
          ...userCanvases,
          [data.username]: {
            locWorkId: window.location.href.split("/").pop(),
            fabricCanvas: data.content,
          },
        };
        // console.log(data.feed);
        dispatch(updateAnnotations(annotations));
        dispatch(updateActivityFeed({ id: "viewer1", feed: data.feed }));
        let canvas = fabricOverlay.fabricCanvas();
        canvas.loadFromJSON(
          annotations[data.username]["fabricCanvas"],
          canvas.renderAll.bind(canvas)
        );
      }
    };

    socket.on("receive_annotations", receiveAnnotations);
  }, [fabricOverlay]);

  useEffect(() => {
    socket.on("receive_guest_list", (data) => {
      dispatch(
        updateGuestDetails({ guestCount: data.length, guestList: [...data] })
      );
    });

    socket.on("receive_message", (data) => {
      dispatch(updateMessages(data));
    });
  }, []);

  const handleConnect = async () => {
    if (_roomName && alias) {
      let _username = await uuidv4();
      socket.emit("join_room", {
        room: _roomName,
        guest: { username: _username, alias: alias },
      });
      dispatch(
        updateSocketDetails({
          username: _username,
          roomName: _roomName,
          // alias: _alias,
        })
      );
      dispatch(updateSharing(true));
    }
  };

  const handleDisconnect = () => {
    socket.emit("leave_room", { roomName, username });
    dispatch(updateSocketDetails({ username: "", roomName: "" }));
    dispatch(
      updateGuestDetails({
        guestCount: 0,
        guestList: [],
      })
    );
    dispatch(updateSharing(false));
  };

  return (
    <Flex w="80%" mt="20px" direction="column" align="center">
      {!sharing ? (
        <>
          <Input
            margin="10px 0"
            placeholder="Enter Room Name"
            value={_roomName}
            color="white"
            _placeholder={{ color: "grey" }}
            onChange={(e) => handleInputChange(e)}
          />
          <Button
            w="min-content"
            colorScheme="blue"
            variant="solid"
            mt="25px"
            p="20px"
            onClick={() => {
              handleConnect();
            }}
          >
            Connect
          </Button>
        </>
      ) : (
        <Button
          w="min-content"
          colorScheme="red"
          variant="solid"
          mt="25px"
          p="20px"
          onClick={() => {
            handleDisconnect();
          }}
        >
          Disconnect
        </Button>
      )}
    </Flex>
  );
};

export default UserOptions;
