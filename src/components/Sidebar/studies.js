import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { HiOutlineFilter } from "react-icons/hi";
import BasicInfo from "../Studies/basicInfo";
import StudyAction from "../Studies/studyAction";
import ImageAction from "../Studies/imageAction";

const Studies = ({ project }) => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple color="#000">
      <AccordionItem borderTop="none" bgColor="#F8F8F5">
        <AccordionButton _focus={{ border: "none" }}>
          <Box flex="1" textAlign="left" fontSize="14px" fontFamily="roboto">
            Basic Information
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel padding="0px">
          <BasicInfo project={project} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Studies;
