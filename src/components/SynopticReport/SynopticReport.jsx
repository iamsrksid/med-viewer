import {
  Flex,
  HStack,
  Image,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { GrFormClose } from "react-icons/gr";
import BreastCancer from "./BreastCancer";
import Lymphoma from "./Lymphoma";
import ProstateCancer from "./ProstateCancer";
import humanIcon from "../../assets/images/humanIcon.svg";

const SynopticReport = ({ synopticType, caseInfo, setSynopticType }) => {
  const [ifwidthLessthan1920] = useMediaQuery("(max-width:1920px)");

  return (
    <Flex
      fontSize={ifwidthLessthan1920 ? "14px" : "0.729vw"}
      fontFamily="
      Calibri"
      minW="510px"
      width="40vw"
      height="100%"
      top={ifwidthLessthan1920 ? "90px" : "9.999vh"}
      pos="fixed"
      right="0px"
      bg="#fff"
      flexDirection="column"
      display="flex"
      h="90vh"
      pb="2vh"
      overflow="auto"
      css={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#C4C4C4",
        },
      }}
    >
      <Flex
        py="0.5px"
        justifyContent="flex-end"
        alignItems="center"
        background="#F6F6F6"
      >
        <GrFormClose
          size={16}
          cursor="pointer"
          onClick={() => setSynopticType("")}
          _hover={{ cursor: "pointer" }}
        />
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        px="0.8vw"
        py="1.6vh"
        backgroundImage="linear-gradient(#F7FBFD, rgba(247, 251, 253, 0))"
        borderBottom="1px solid #8F8F8F"
      >
        <Image src={humanIcon} alt="human icon" />
        <Flex maxW="85%" direction="column">
          <Text textAlign="center" textTransform="uppercase">
            Lorem ipsum dolor sit amet consectetur. Arcu eu quis posuere iaculis
            pellentesque quam diam ut.
          </Text>
          <Text fontSize="16px" textAlign="center" fontWeight="600">
            {synopticType === "breast-cancer"
              ? "BREAST CANCER SYNOPTIC REPORT"
              : synopticType === "prostate-cancer"
              ? "PROSTATE CANCER SYNPOPTIC REPORT"
              : "LYMPHOMA REPORT"}
          </Text>
        </Flex>
      </Flex>
      <Flex>
        <Flex w="100%">
          <Flex w="100%" p="1vh 1vw 1vh 1.6vw" direction="column">
            <HStack justifyContent="space-between" flex="1">
              <VStack alignItems="flex-start" minW="33.3%">
                <Text fontWeight="600">PATIENT NAME</Text>
                <Text
                  mt="-0rem !important"
                  color="#8F8F8F"
                >{`${caseInfo?.patient?.patientName?.firstName} 
                ${caseInfo?.patient?.patientName?.lastName}`}</Text>
              </VStack>
              <VStack alignItems="flex-start" minW="33.3%">
                <Text fontWeight="600">MRN</Text>
                <Text mt="-0rem !important" color="#8F8F8F">
                  {caseInfo?.patient?.uhid}
                </Text>
              </VStack>
              <VStack alignItems="flex-start" minW="33.3%">
                <Text fontWeight="600">AGE</Text>
                <Text mt="-0rem !important" color="#8F8F8F">
                  {`${caseInfo?.patient?.age?.years} years`}
                </Text>
              </VStack>
            </HStack>
            <HStack flex="1">
              <VStack alignItems="flex-start" minW="33.3%">
                <Text fontWeight="600">GENDER</Text>
                <Text mt="-0rem !important" color="#8F8F8F">
                  {caseInfo?.patient?.gender}
                </Text>
              </VStack>
              <VStack alignItems="flex-start" minW="33.3%">
                <Text fontWeight="600">CLINICIAN</Text>
                <Text mt="-0rem !important" color="#8F8F8F">
                  {caseInfo?.treatingDoctor}
                </Text>
              </VStack>
            </HStack>
          </Flex>
        </Flex>
      </Flex>
      <Flex>
        {synopticType === "breast-cancer" ? (
          <BreastCancer />
        ) : synopticType === "prostate-cancer" ? (
          <ProstateCancer />
        ) : synopticType === "lymphoma" ? (
          <Lymphoma />
        ) : null}
      </Flex>
    </Flex>
  );
};

export default SynopticReport;
