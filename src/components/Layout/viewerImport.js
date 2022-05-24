import React, { useState } from "react";
import ScreenCapture from "../Screencapture/ScreenCapture";
import "../../styles/styles.css";
import Navbar from "../Screencapture/CaptureButton";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalBody,
  Text,
  Image,
  Input,
  HStack,
} from "@chakra-ui/react";

const ViewerImport = ({
  uploadPatch,
  setStartX,
  setStartY,
  setWindowWidth,
  setWindowHeight,
}) => {
  const [screenCapture, setScreenCapture] = useState("");
  const [open, setModalOpen] = useState(false);
  const [title, setTitle] = useState("image Title");

  // const [startX, setStartX] = useState(0);
  // const [startY, setStartY] = useState(0);
  // const [windowWidth, setWindowWidth] = useState(0);
  // // const [windowHeight, setWindowHeight] = useState(0);

  const handleScreenCapture = (screenCapture) => {
    setScreenCapture(screenCapture);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSave = () => {
    fetch(screenCapture)
      .then((res) => res.blob())
      .then((blob) => {
        const fd = new FormData();
        const file = new File([blob], title ?? "patch", { type: "image/png" });

        fd.append("file", file);

        uploadPatch(fd);
      });
    closeModal();
  };

  return (
    <ScreenCapture
      onEndCapture={handleScreenCapture}
      setStartX={setStartX}
      setStartY={setStartY}
      setWindowWidth={setWindowWidth}
      setWindowHeight={setWindowHeight}
    >
      {({ onStartCapture }) => (
        <>
          <header>
            <Navbar capture={onStartCapture} />
          </header>

          <Modal isOpen={open} size="xl">
            <ModalContent>
              <HStack>
                <Text>Title: </Text>
                <Input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  name="title"
                ></Input>
              </HStack>

              <ModalBody>
                {screenCapture && <Image src={screenCapture} />}
              </ModalBody>
              <ModalFooter>
                <Button onClick={handleSave}>Save to S3</Button>
                <Button onClick={closeModal}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </ScreenCapture>
  );
};

export default ViewerImport;
