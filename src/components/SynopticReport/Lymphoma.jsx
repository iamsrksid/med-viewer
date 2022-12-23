import React from "react";
import {
  Checkbox,
  Flex,
  HStack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

const Lymphoma = () => {
  return (
    <Flex px="1.6vw" w="100%" fontSize="14px" direction="column">
      <Flex bg="#F7FBFD" h="3vh" minH="30px" w="100%" alignItems="center">
        <Text fontWeight="600" pl="0.3vw">
          CLINICAL INFORMATION & SURGICAL HANDLING
        </Text>
      </Flex>
      <Flex direction="column">
        <HStack flex="1" alignItems="flex-start">
          <VStack minW="43%" alignItems="flex-start">
            <Text fontWeight="600">TYPES OF SPECIMEN</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
            </HStack>
          </VStack>
          <VStack alignItems="flex-start" minW="57%">
            <Text fontWeight="600">DATE OF REQUEST</Text>
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
            <Text fontWeight="600">PRINCIPAL CLINICIAN</Text>
            <HStack color="#8F8F8F" mt="-0rem !important">
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
              <Checkbox>Nil</Checkbox>
            </HStack>
          </VStack>
          <VStack alignItems="flex-start" minW="50%">
            <Text fontWeight="600">SITE OF BIOPSY</Text>
            <HStack color="#8F8F8F" mt="-0rem !important">
              <Checkbox>lymph node</Checkbox>
              <Checkbox>other</Checkbox>
            </HStack>
          </VStack>
        </HStack>
        <HStack flex="1" alignItems="flex-start">
          <VStack alignItems="flex-start" minW="50%">
            <Text fontWeight="600">LATERABILITY</Text>
            <HStack color="#8F8F8F" mt="-0rem !important">
              <VStack mt="-0rem !important" alignItems="flex-start">
                <Checkbox>left</Checkbox>
                <Checkbox>right</Checkbox>
              </VStack>
              <VStack mt="-0rem !important" alignItems="flex-start">
                <Checkbox>middle</Checkbox>
                <Checkbox>unknown</Checkbox>
              </VStack>
            </HStack>
          </VStack>
          <VStack alignItems="flex-start" minW="50%">
            <Text fontWeight="600">REASON FOR BIOPSY</Text>
            <VStack color="#8F8F8F" mt="-0rem !important">
              <Checkbox>No known metastases</Checkbox>
              <Checkbox>No known metastases</Checkbox>
            </VStack>
          </VStack>
        </HStack>
        <HStack flex="1" alignItems="flex-start">
          <VStack alignItems="flex-start" minW="50%">
            <Text fontWeight="600">CLINICAL OR DIFFERENT DIAGNOSIS</Text>
          </VStack>
          <VStack alignItems="flex-start" minW="50%">
            <Text fontWeight="600">
              WHOLE TUMOUR(DCIS + INVASIVE)SIZE 91 MM
            </Text>
          </VStack>
        </HStack>
        <HStack flex="1" alignItems="flex-start">
          <VStack alignItems="flex-start">
            <Text fontWeight="600">GRADE</Text>
            <HStack color="#8F8F8F" mt="-0rem !important">
              <Checkbox>1</Checkbox>
              <Checkbox>2</Checkbox>
              <Checkbox>3</Checkbox>
              <Checkbox>N/A</Checkbox>
            </HStack>
          </VStack>
        </HStack>
        <HStack flex="1" alignItems="flex-start">
          <VStack alignItems="flex-start">
            <Text fontWeight="600">
              INVOLVED SITE OR PATTERN OF DISEASE SPREAD
            </Text>
            <VStack
              color="#8F8F8F"
              mt="-0rem !important"
              alignItems="flex-start"
            >
              <Checkbox>Nodal / Lymphatic</Checkbox>
              <Checkbox>Extranodal / Extralymphatic</Checkbox>
              <Checkbox>Unknown</Checkbox>
            </VStack>
          </VStack>
        </HStack>
        <HStack flex="1" alignItems="flex-start">
          <VStack alignItems="flex-start">
            <Text fontWeight="600">STAGES OR CLINICAL EXTENT OF DISEASES</Text>
            <HStack color="#8F8F8F" mt="-0rem !important">
              <VStack alignItems="flex-start">
                <Checkbox>Solitary</Checkbox>
                <Checkbox>Localised</Checkbox>
              </VStack>
              <VStack alignItems="flex-start">
                <Checkbox>Generalised</Checkbox>
                <Checkbox>Unknown</Checkbox>
              </VStack>
            </HStack>
          </VStack>
        </HStack>
        <HStack flex="1" alignItems="flex-start">
          <VStack alignItems="flex-start" minW="50%">
            <Text fontWeight="600">CONSTITUTIONAL SYMTONS</Text>
            <HStack color="#8F8F8F" mt="-0rem !important">
              <Checkbox>Present</Checkbox>
              <Checkbox>Absent</Checkbox>
              <Checkbox>Unknown</Checkbox>
            </HStack>
          </VStack>
          <Text fontWeight="600">RELEVANT LABORATORY TEST RESULT</Text>
        </HStack>
        <HStack flex="1" alignItems="flex-start">
          <VStack alignItems="flex-start" minW="50%">
            <Text fontWeight="600">FURTHER CLINICAL INFORMATION</Text>
            <Textarea resize="none" />
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
          <Text fontWeight="600">MICROSCOPIC FINDING</Text>
        </Flex>
        <HStack flex="1" alignItems="flex-start">
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">SPECIMEN TYPE</Text>
            <VStack
              mt="-0rem !important"
              color="#8F8F8F"
              alignItems="flex-start"
            >
              <Checkbox>Nodal / Lymphatic</Checkbox>
              <Checkbox>Extranodal / Extralymphatic</Checkbox>
              <Checkbox>Unknown</Checkbox>
            </VStack>
          </VStack>
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">SPECIMEN SIZE</Text>
            <VStack
              mt="-0rem !important"
              color="#8F8F8F"
              alignItems="flex-start"
            >
              <Checkbox>Biopises</Checkbox>
              <Checkbox>FLuid (mm)</Checkbox>
              <Checkbox>Spleen (g)</Checkbox>
            </VStack>
          </VStack>
        </HStack>
        <VStack alignItems="flex-start">
          <Text fontWeight="600">NARRATIVE OR MICROSCOPIC DESCRIPTION</Text>
          <Textarea resize="none" w="50%" />
        </VStack>
        <VStack flex="1" alignItems="flex-start">
          <Text fontWeight="600">
            ABNORMAL CELLS:PATTERNS OF INFILTRATION OR ARCHITECTURE
          </Text>
          <VStack mt="-0rem !important" color="#8F8F8F" alignItems="flex-start">
            <Checkbox>Nodal / Lymphatic</Checkbox>
            <Checkbox>Extranodal / Extralymphatic</Checkbox>
            <Checkbox>Unknown</Checkbox>
          </VStack>
        </VStack>

        <HStack flex="1" alignItems="flex-start">
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">ABNORMAL CELL SIZE:</Text>
            <HStack
              mt="-0rem !important"
              color="#8F8F8F"
              alignItems="flex-start"
            >
              <VStack alignItems="flex-start">
                <Checkbox>Small</Checkbox>
                <Checkbox>Fixed</Checkbox>
              </VStack>
              <VStack alignItems="flex-start">
                <Checkbox>Medium</Checkbox>

                <Checkbox>Indetermined</Checkbox>
              </VStack>
              <Checkbox>Large</Checkbox>
            </HStack>
          </VStack>
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">ABNORMAL CELL CYTOMORPHOLOGY</Text>
            <HStack
              mt="-0rem !important"
              color="#8F8F8F"
              justifyContent="space-between"
            >
              <VStack alignItems="flex-start">
                <Checkbox>Small</Checkbox>
                <Checkbox>Large</Checkbox>
              </VStack>
              <VStack alignItems="flex-start">
                <Checkbox>Medium</Checkbox>
                <Checkbox>Fixed</Checkbox>
              </VStack>
            </HStack>
          </VStack>
        </HStack>
        <VStack alignItems="flex-start">
          <Text fontWeight="600">ABNORMAL CELL PROLIFERATIVE INDICATORS</Text>
          <Textarea resize="none" w="50%" />
        </VStack>
      </Flex>
      <Flex
        bg="#F7FBFD"
        h="3vh"
        minH="30px"
        w="100%"
        alignItems="center"
        px="0.3vw"
        my="1vh"
      >
        <Text fontWeight="600">ANCILLARY TEST FINDINGS</Text>
      </Flex>
      <HStack flex="1" alignItems="flex-start">
        <VStack minW="50%" alignItems="flex-start">
          <Text fontWeight="600">IMMUNOHISTOCHEMISTRY</Text>
          <HStack mt="-0rem !important" color="#8F8F8F">
            <VStack alignItems="flex-start">
              <Checkbox>Performed</Checkbox>
              <Checkbox>Positive</Checkbox>
            </VStack>
            <VStack alignItems="flex-start">
              <Checkbox>Not Performed</Checkbox>
              <Checkbox>Negative</Checkbox>
            </VStack>
          </HStack>
        </VStack>
        <VStack minW="50%" alignItems="flex-start">
          <Text fontWeight="600">FLOW STUDIES</Text>
          <HStack mt="-0rem !important" color="#8F8F8F">
            <VStack alignItems="flex-start">
              <Checkbox>Performed</Checkbox>
              <Checkbox>Positive</Checkbox>
            </VStack>
            <VStack alignItems="flex-start">
              <Checkbox>Not Performed</Checkbox>
              <Checkbox>Negative</Checkbox>
            </VStack>
          </HStack>
        </VStack>
      </HStack>
      <VStack alignItems="flex-start">
        <Text fontWeight="600">CLONALITY</Text>
        <Textarea resize="none" w="50%" />
      </VStack>
      <VStack flex="1" alignItems="flex-start">
        <Text fontWeight="600">WHO DISEASE SUBTYPE</Text>
        <VStack mt="-0rem !important" color="#8F8F8F" alignItems="flex-start">
          <Checkbox>Nodal / Lymphatic</Checkbox>
          <Checkbox>Extranodal / Extralymphatic</Checkbox>
          <Checkbox>Unknown</Checkbox>
        </VStack>
      </VStack>

      <HStack flex="1" alignItems="flex-start">
        <VStack minW="50%" alignItems="flex-start">
          <Text fontWeight="600">ABNORMAL CELL SIZE:</Text>
          <HStack mt="-0rem !important" color="#8F8F8F" alignItems="flex-start">
            <VStack alignItems="flex-start">
              <Checkbox>Small</Checkbox>
              <Checkbox>Fixed</Checkbox>
            </VStack>
            <VStack alignItems="flex-start">
              <Checkbox>Medium</Checkbox>

              <Checkbox>Indetermined</Checkbox>
            </VStack>
            <Checkbox>Large</Checkbox>
          </HStack>
        </VStack>
        <VStack minW="50%" alignItems="flex-start">
          <Text fontWeight="600">ABNORMAL CELL CYTOMORPHOLOGY</Text>
          <HStack
            mt="-0rem !important"
            color="#8F8F8F"
            justifyContent="space-between"
          >
            <VStack alignItems="flex-start">
              <Checkbox>Small</Checkbox>
              <Checkbox>Large</Checkbox>
            </VStack>
            <VStack alignItems="flex-start">
              <Checkbox>Medium</Checkbox>
              <Checkbox>Fixed</Checkbox>
            </VStack>
          </HStack>
        </VStack>
      </HStack>
      <VStack alignItems="flex-start" pb="2vh">
        <Text fontWeight="600">ABNORMAL CELL PROLIFERATIVE INDICATORS</Text>
        <Textarea resize="none" w="50%" />
      </VStack>
    </Flex>
  );
};

export default Lymphoma;
