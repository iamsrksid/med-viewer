import React from "react";
import {
  Checkbox,
  Flex,
  HStack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

const ProstateCancer = () => {
  return (
    <Flex px="1.6vw" w="100%" fontSize="14px" direction="column">
      <Flex bg="#F7FBFD" h="3vh" minH="30px" w="100%" alignItems="center">
        <Text fontWeight="600" pl="0.3vw">
          CLINICAL
        </Text>
      </Flex>
      <Flex direction="column">
        <HStack flex="1" alignItems="flex-start">
          <VStack minW="43%" alignItems="flex-start">
            <Text fontWeight="600">PREV.HISTORY OF PROSTATE CANCER</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
            </HStack>
          </VStack>
          <VStack alignItems="flex-start" minW="57%">
            <Text fontWeight="600">PREVIOUS BIOPSY</Text>
            <HStack
              alignItems="flex-start"
              mt="-0rem !important"
              color="#8F8F8F"
            >
              <VStack alignItems="flex-start">
                <Checkbox>Privious biopsy: Gleason 3+3=6 left mid</Checkbox>
                <Checkbox>Privious biopsy: Gleason 3+3=6 left mid</Checkbox>
                <Checkbox>Privious biopsy: Gleason 3+3=6 left mid</Checkbox>
                <Checkbox>Privious biopsy: Gleason 3+3=6 left mid</Checkbox>
              </VStack>
            </HStack>
          </VStack>
        </HStack>
        <HStack flex="1" my="1vh" alignItems="flex-start">
          <VStack alignItems="flex-start" minW="50%">
            <Text fontWeight="600">PREVIOUS THERAPY</Text>
            <HStack color="#8F8F8F" mt="-0rem !important">
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
              <Checkbox>Nil</Checkbox>
            </HStack>
          </VStack>
          <VStack alignItems="flex-start" minW="50%">
            <Text fontWeight="600">CLINICAL SYMPTOM</Text>
            <HStack color="#8F8F8F" mt="-0rem !important">
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
              <Checkbox>NO symptoms</Checkbox>
            </HStack>
          </VStack>
        </HStack>
        <HStack flex="1" alignItems="flex-start">
          <VStack alignItems="flex-start" minW="50%">
            <Text fontWeight="600">PRE-BIOPSY SERUM PSA</Text>
            <HStack color="#8F8F8F" mt="-0rem !important">
              <Checkbox>8.9 ng/ml</Checkbox>
              <Checkbox>2</Checkbox>
            </HStack>
          </VStack>
          <VStack alignItems="flex-start" minW="50%">
            <Text fontWeight="600">CLINICAL STAGE</Text>
            <VStack color="#8F8F8F" mt="-0rem !important">
              <Checkbox>No known metastases</Checkbox>
              <Checkbox>No known metastases</Checkbox>
              <Checkbox>No known metastases</Checkbox>
            </VStack>
          </VStack>
        </HStack>

        <Flex
          bg="#F7FBFD"
          h="3vh"
          minH="30px"
          w="100%"
          alignItems="center"
          px="0.3vw"
          my="1vh"
        >
          <Text fontWeight="600">MACROSCOPIC</Text>
        </Flex>
        <Text fontWeight="600">1.LEFT BASE</Text>
        <HStack flex="1" alignItems="flex-start">
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">NUMBER OF CORES</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>1</Checkbox>
              <Checkbox>2</Checkbox>
              <Checkbox>3</Checkbox>
            </HStack>
          </VStack>
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">LENGHTS(S)</Text>
            <Text color="#8F8F8F" mt="-0rem !important">
              11 mm, 16 mm ,pale tissue
            </Text>
          </VStack>
        </HStack>
        <HStack flex="1" alignItems="flex-start">
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">HISTOLOGICAL TUMOUR TYPE</Text>
            <Text mt="-0rem !important" color="#8F8F8F">
              no evidence of tumour
            </Text>
          </VStack>
          <VStack alignItems="flex-start">
            <Text fontWeight="600" minW="50%">
              COEXISTENT PATHOLOGY
            </Text>
            <Text color="#8F8F8F" mt="-0rem !important">
              present, focal antrophy
            </Text>
          </VStack>
        </HStack>
        <Text fontWeight="600" mt="1vh">
          2.LEFT MID
        </Text>
        <HStack flex="1" alignItems="flex-start">
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">NUMBER OF CORES</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>1</Checkbox>
              <Checkbox>2</Checkbox>
              <Checkbox>3</Checkbox>
            </HStack>
          </VStack>
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">LENGHTS(S)</Text>
            <Text color="#8F8F8F" mt="-0rem !important">
              11 mm, 16 mm ,pale tissue
            </Text>
          </VStack>
        </HStack>
        <HStack flex="1" alignItems="flex-start">
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">HISTOLOGICAL TUMOUR TYPE</Text>
            <Text mt="-0rem !important" color="#8F8F8F">
              adenocarcinoma, acinar
            </Text>
          </VStack>
          <VStack alignItems="flex-start">
            <Text fontWeight="600" minW="50%">
              GLEASON SCORE
            </Text>
            <Text color="#8F8F8F" mt="-0rem !important">
              7
            </Text>
          </VStack>
        </HStack>
        <HStack flex="1" alignItems="flex-start">
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">ISUP GRADE</Text>
            <Text mt="-0rem !important" color="#8F8F8F">
              isup grade 3
            </Text>
          </VStack>
          <VStack alignItems="flex-start">
            <Text fontWeight="600" minW="50%">
              GLEASON PATTERN
            </Text>
            <Text color="#8F8F8F" mt="-0rem !important">
              60% pattern 4
            </Text>
          </VStack>
        </HStack>
        <HStack flex="1" alignItems="flex-start" my="1vh">
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">PERINEURAL INVASION</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
              <Checkbox>present</Checkbox>
            </HStack>
          </VStack>
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">SEMINAL VESICLE INVASUION</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
              <Checkbox>not identified</Checkbox>
            </HStack>
          </VStack>
        </HStack>
        <HStack flex="1" alignItems="flex-start" my="1vh">
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">LYMPHOVASCULAR INVASION</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
              <Checkbox>not identified</Checkbox>
            </HStack>
          </VStack>
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">EXTRAPROSTATIC EXTENSION</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
              <Checkbox>not identified</Checkbox>
            </HStack>
          </VStack>
        </HStack>
        <HStack flex="1" alignItems="flex-start" my="1vh">
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">INTRADUCTUAL CA.OF PROSTATE</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
              <Checkbox>not identified</Checkbox>
            </HStack>
          </VStack>
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">COEXISTENT EXTENSION</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
              <Checkbox>not identified</Checkbox>
            </HStack>
          </VStack>
        </HStack>

        <Text fontWeight="600" my="1vh">
          3.LEFT APEX
        </Text>
        <HStack flex="1" alignItems="flex-start" my="1vh" mt="-0rem !important">
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">NUMBER OF CORES</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>1</Checkbox>
              <Checkbox>2</Checkbox>
              <Checkbox>3</Checkbox>
            </HStack>
          </VStack>
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">LENGHTS(S)</Text>
            <Text color="#8F8F8F" mt="-0rem !important">
              11 mm, 16 mm ,pale tissue
            </Text>
          </VStack>
        </HStack>
        <HStack flex="1" alignItems="flex-start" my="1vh">
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">PERINEURAL INVASION</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
              <Checkbox>present</Checkbox>
            </HStack>
          </VStack>
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">SEMINAL VESICLE INVASUION</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
              <Checkbox>not identified</Checkbox>
            </HStack>
          </VStack>
        </HStack>
        <HStack flex="1" alignItems="flex-start" my="1vh">
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">LYMPHOVASCULAR INVASION</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
              <Checkbox>not identified</Checkbox>
            </HStack>
          </VStack>
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">EXTRAPROSTATIC EXTENSION</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
              <Checkbox>not identified</Checkbox>
            </HStack>
          </VStack>
        </HStack>
        <HStack flex="1" alignItems="flex-start" my="1vh">
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">INTRADUCTUAL CA.OF PROSTATE</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
              <Checkbox>not identified</Checkbox>
            </HStack>
          </VStack>
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">COEXISTENT EXTENSION</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
              <Checkbox>not identified</Checkbox>
            </HStack>
          </VStack>
        </HStack>
        <Text fontWeight="600">4.RIGHT BASE</Text>
        <HStack flex="1" alignItems="flex-start" my="1vh" mt="-0rem !important">
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">NUMBER OF CORES</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>1</Checkbox>
              <Checkbox>2</Checkbox>
              <Checkbox>3</Checkbox>
            </HStack>
          </VStack>
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">LENGHTS(S)</Text>
            <Text color="#8F8F8F" mt="-0rem !important">
              11 mm, 16 mm ,pale tissue
            </Text>
          </VStack>
        </HStack>
        <Text fontWeight="600">5.RIGHT MID</Text>
        <HStack flex="1" alignItems="flex-start" my="1vh" mt="-0rem !important">
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">NUMBER OF CORES</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>1</Checkbox>
              <Checkbox>2</Checkbox>
              <Checkbox>3</Checkbox>
            </HStack>
          </VStack>
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">LENGHTS(S)</Text>
            <Text color="#8F8F8F" mt="-0rem !important">
              11 mm, 16 mm ,pale tissue
            </Text>
          </VStack>
        </HStack>
        <Text fontWeight="600">6.RIGHT APEX</Text>
        <HStack flex="1" alignItems="flex-start" my="1vh" mt="-0rem !important">
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">NUMBER OF CORES</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>1</Checkbox>
              <Checkbox>2</Checkbox>
              <Checkbox>3</Checkbox>
            </HStack>
          </VStack>
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">LENGHTS(S)</Text>
            <Text color="#8F8F8F" mt="-0rem !important">
              11 mm, 16 mm ,pale tissue
            </Text>
          </VStack>
        </HStack>
        <VStack alignItems="flex-start" pb="2vh">
          <Text fontWeight="600">COMMENT</Text>
          <Textarea resize="none" w="50%" />
        </VStack>
      </Flex>
    </Flex>
  );
};

export default ProstateCancer;
