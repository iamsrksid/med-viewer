import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import ToolbarButton from "../ViewerToolbar/button";
import Popup from "../Popup/popup";
import { ChatIcon, ChatSelectedIcon } from "../Icons/CustomIcons";

const SlideChat = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chatHover, setChatHover] = useState(false);
  const [popup, setPopup] = useState(false);
  const handlePopup = () => {
    setPopup(!popup);
  };

  const close = () => {
    onClose();
  };

  return (
    <>
      <ToolbarButton
        onClick={handlePopup}
        icon={
          chatHover ? (
            <ChatSelectedIcon color="#151C25" mt={1.5} mr={2.5} />
          ) : (
            <ChatIcon color="#151C25" mt={1.5} mr={2.5} />
          )
        }
        // backgroundColor={isActive ? "white" : "#3963c3"}
        // border="0.5px solid rgba(255, 255, 255, 0.5)"
        label="Chat"
        ml="5px"
        onMouseEnter={() => setChatHover(true)}
        onMouseLeave={() => setChatHover(false)}

        // transform="scale(1.5)"
      />
      {/* <MessageBox isOpen={isOpen} onClose={close} /> */}
      <Popup
        handlePopup={() => {
          handlePopup();
        }}
        popup={popup}
      />
    </>
  );
};

export default SlideChat;
