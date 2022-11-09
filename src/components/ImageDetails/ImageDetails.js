import {
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import ScrollBar from "../ScrollBar";

const metadata = {
  width: 5465,
  height: 8093,
  bands: 3,
  xoffset: 0,
  yoffset: 0,
  xres: 1,
  yres: 1,
  "vips-loader": "tiffload",
  "n-pages": 3,
  "image-description":
    "Aperio Image Library v10.2.24\n" +
    "\n" +
    "5465x8093 [0,0 5465x8093] [256x256] JPEG/YCbCr Q = 75|AppMag = 40|MPP = 0.482315",
  orientation: 1,
  scanner: "Aperio Image Library v10.2.24",
  AppMag: "40",
  MPP: "0.482315",
  type: ".svs",
  additional: "5465x8093 [0,0 5465x8093] [256x256] JPEG/YCbCr Q = 75",
};

const DetailsRow = ({ label, value }) => (
  <Flex w="100%">
    <Text flex="1">{label}: </Text>
    <Text flex="2">{value}</Text>
  </Flex>
);

const ImageDetails = ({ caseInfo, slideInfo, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalContent borderRadius={0}>
        <ModalHeader
          borderBottom="1px solid rgba(0, 0, 0, 0.25)"
          fontSize="16px"
          fontWeight="400"
        >
          Image Details
        </ModalHeader>
        <ModalCloseButton
          border="none"
          outline="none"
          _focus={{ border: "none" }}
        />
        <ModalBody>
          <ScrollBar>
            <VStack align="flex-start">
              <DetailsRow
                label="Title"
                value={
                  slideInfo?.slideName ||
                  slideInfo?.originalName?.split(".")?.[0]
                }
              />
              <DetailsRow label="Case Title" value={caseInfo?.caseName} />
              <DetailsRow label="Type" value={metadata["type"]} />
              <DetailsRow label="WSI Scanner" value={metadata["scanner"]} />
              <DetailsRow label="Width" value={metadata["width"] + " px"} />
              <DetailsRow label="Height" value={metadata["height"] + " px"} />
              <DetailsRow label="Magification" value={metadata["AppMag"]} />
              <DetailsRow label="MPP" value={<>{metadata["MPP"]} &micro;m</>} />
            </VStack>
          </ScrollBar>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImageDetails;
