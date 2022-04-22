import { Flex, Text, HStack, IconButton, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";
import { isCaseViewable } from "../../utility/utility";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import "../../styles/viewer.css";

const ChangeCase = ({ project, caseId, changeCaseHandler, closeToggle }) => {
  const currentCaseIndex = project?.cases.findIndex(
    (projectCase) => projectCase._id === caseId
  );
  const [closeButton, setCloseButton] = useState(true);
  const handleCloseButtonClick = () => {
    setCloseButton(false);
    closeToggle(false);
  };

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        borderX="2px solid #E4E5E8"
        height="18px"
        minW="140px"
      >
        <HStack mx="28px">
          <Tooltip
            label="Previous Slide"
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
            <IconButton
              icon={<MdOutlineKeyboardArrowLeft color="#151C25" />}
              color="#fff"
              variant="unstyled"
              cursor="pointer"
              minW={0}
              _focus={{ background: "none" }}
              disabled={
                currentCaseIndex - 1 < 0 ||
                !isCaseViewable(
                  project?.type,
                  project?.cases[currentCaseIndex - 1].slides.length
                )
              }
              onClick={() => changeCaseHandler(currentCaseIndex - 1)}
            />
          </Tooltip>

          <Text mr="24px">{project?.cases[currentCaseIndex]?.name}</Text>
          <Tooltip
            label="Next Slide"
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
            <IconButton
              icon={<MdOutlineKeyboardArrowRight color="#151C25" />}
              variant="unstyled"
              color="#fff"
              cursor="pointer"
              minW={0}
              _focus={{ background: "none", border: "none" }}
              disabled={
                currentCaseIndex + 1 === project?.cases.length ||
                !isCaseViewable(
                  project?.type,
                  project?.cases[currentCaseIndex + 1].slides.length
                )
              }
              onClick={() => changeCaseHandler(currentCaseIndex + 1)}
            />
          </Tooltip>
        </HStack>
      </Flex>
    </>
  );
};

export default ChangeCase;
