import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";
import { FiDownload } from "react-icons/fi";
import { BiScreenshot } from "react-icons/bi";
import ToolbarButton from "./ViewerToolbar/button";
import IconSize from "./ViewerToolbar/IconSize";

const DownloadImage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [img, setImg] = useState();

  const handleClick = () => {
    html2canvas(document.querySelector(".openseadragon-canvas"), {
      backgroundColor: null,
      logging: true,
      allowTaint: false,
      useCORS: true,
      removeContainer: false,
    }).then((canvas) => {
      setImg(canvas.toDataURL("image/png"));
    });
    onOpen();
  };
  return (
    <>
      <ToolbarButton
        icon={<BiScreenshot size={IconSize()} color="#151C25" />}
        label="Screenshot"
        onClick={handleClick}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Download image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              crossOrigin="https://openslide-demo.s3.dualstack.us-east-1.amazonaws.com/info.json"
              src={img}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              as="a"
              mr={3}
              href={img}
              download="my-speculative-annotation"
              fontFamily="ocr-a-std"
            >
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DownloadImage;
