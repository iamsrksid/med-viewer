import { Checkbox, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

const BreastCancer = () => {
  return (
    <Flex px="1.6vw" w="100%" fontSize="14px" direction="column">
      <Flex bg="#F7FBFD" h="3vh" minH="30px" w="100%" alignItems="center">
        <Text fontWeight="600" pl="0.3vw">
          MACROSCOPY
        </Text>
      </Flex>
      <Flex direction="column">
        <HStack flex="1" alignItems="flex-start">
          <VStack minW="35%" alignItems="flex-start">
            <Text fontWeight="600">DATA RECIEVED</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Text>Slide</Text>
              <Checkbox>left</Checkbox>
              <Checkbox>Right</Checkbox>
            </HStack>
          </VStack>
          <VStack alignItems="flex-start" minW="65%">
            <Text fontWeight="600">SPECIMEN TYPE</Text>
            <HStack
              alignItems="flex-start"
              mt="-0rem !important"
              color="#8F8F8F"
            >
              <VStack alignItems="flex-start">
                <Checkbox>Diagnostic marker</Checkbox>
                <Checkbox>Therapeutic markert</Checkbox>
                <Checkbox>Wide local excision</Checkbox>
                <Checkbox>Simple mastectomy</Checkbox>
              </VStack>
              <VStack alignItems="flex-start">
                <Checkbox>Subcutaneous</Checkbox>
                <Checkbox>Radical mastectomy</Checkbox>
                <Checkbox>Wide local excision</Checkbox>
                <Checkbox>Others</Checkbox>
              </VStack>
            </HStack>
          </VStack>
        </HStack>
        <HStack flex="1" my="1vh" alignItems="flex-start">
          <VStack alignItems="flex-start" minW="40%">
            <Text fontWeight="600">SPECIMEN RADIOGRAPHY PROVIDED</Text>
            <HStack color="#8F8F8F">
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
            </HStack>
          </VStack>
          <VStack alignItems="flex-start" minW="60%">
            <Text fontWeight="600">RADIOLOGICAL ABNORMALITY SEEN</Text>
            <HStack color="#8F8F8F">
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
              <Checkbox>Unsure</Checkbox>
            </HStack>
          </VStack>
        </HStack>
        <HStack flex="1" alignItems="flex-start">
          <VStack alignItems="flex-start" minW="40%">
            <Text fontWeight="600">R GRADE</Text>
            <HStack color="#8F8F8F">
              <Checkbox>1</Checkbox>
              <Checkbox>2</Checkbox>
              <Checkbox>3</Checkbox>
              <Checkbox>4</Checkbox>
              <Checkbox>5</Checkbox>
            </HStack>
          </VStack>
          <VStack alignItems="flex-start" minW="60%">
            <Text fontWeight="600">RADIOLOGICAL LESION</Text>
            <HStack color="#8F8F8F" alignItems="flex-start">
              <VStack alignItems="flex-start">
                <Checkbox>Stellate lesion</Checkbox>
                <Checkbox>Calcification</Checkbox>
                <Checkbox>Other</Checkbox>
              </VStack>
              <VStack alignItems="flex-start">
                <Checkbox>Circumscribed mass</Checkbox>
                <Checkbox>Parenchymal deformity</Checkbox>
              </VStack>
            </HStack>
          </VStack>
        </HStack>
        <HStack flex="1" py="1vh">
          <VStack alignItems="flex-start" minW="40%">
            <Text fontWeight="600">SPECIMEN WEIGHT</Text>
            <Text mt="-0rem !important" color="#8F8F8F">
              22 gm
            </Text>
          </VStack>
          <VStack alignItems="flex-start" minW="60%">
            <Text fontWeight="600">ELLIPSE OF SKIN</Text>
            <Text mt="-0rem !important" color="#8F8F8F">
              22 X 11 mm
            </Text>
          </VStack>
        </HStack>
        <HStack flex="1" alignItems="flex-start">
          <VStack alignItems="flex-start" minW="40%">
            <Text fontWeight="600">NIPPLE</Text>
            <VStack
              alignItems="flex-start"
              mt="-0rem !important"
              color="#8F8F8F"
            >
              <Checkbox>Normal</Checkbox>
              <Checkbox>Benign</Checkbox>
              <Checkbox>Not assessable</Checkbox>
            </VStack>
          </VStack>
          <VStack alignItems="flex-start" minW="60%">
            <Text fontWeight="600">HISTOLOGICAL CLASIFICATION PRESENT</Text>
            <HStack
              alignItems="flex-start"
              mt="-0rem !important"
              color="#8F8F8F"
            >
              <VStack alignItems="flex-start">
                <Checkbox>Benign</Checkbox>
                <Checkbox>Benign and malignant</Checkbox>
              </VStack>
              <VStack alignItems="flex-start">
                <Checkbox>Malignant</Checkbox>
                <Checkbox>absent</Checkbox>
              </VStack>
            </HStack>
          </VStack>
        </HStack>
        <HStack flex="1">
          <VStack alignItems="flex-start" minW="40%">
            <Text fontWeight="600">FIBROFATTY TISSUE</Text>
            <Text mt="-0rem !important" color="#8F8F8F">
              22 X 11 X 1 mm
            </Text>
          </VStack>
          <VStack alignItems="flex-start" minW="60%">
            <Text fontWeight="600">LESION MEASURES</Text>
            <Text mt="-0rem !important" color="#8F8F8F">
              22 X 11 X 1 mm
            </Text>
          </VStack>
        </HStack>
        <HStack flex="1" py="1vh">
          <VStack alignItems="flex-start" mt="-0rem !important">
            <Text fontWeight="600">SITE</Text>
            <HStack
              mt="-0rem !important"
              color="#8F8F8F"
              alignItems="flex-start"
            >
              <VStack alignItems="flex-start">
                <Checkbox>OUQ</Checkbox>
                <Checkbox>OLQ</Checkbox>
              </VStack>
              <VStack alignItems="flex-start">
                <Checkbox>IUQ</Checkbox>
                <Checkbox>LLQ</Checkbox>
              </VStack>
              <VStack alignItems="flex-start">
                <Checkbox>Retroareolar</Checkbox>
                <Checkbox>Not know</Checkbox>
              </VStack>
            </HStack>
          </VStack>
        </HStack>
        <Text fontWeight="600" py="1vh">
          MACROSCOPIC DISTANCE TO NEAREST ( 12 ) MARGIN
        </Text>
        <VStack flex="1" alignItems="flex-start">
          <Text fontWeight="600">COMMENTS</Text>
          <Text color="#8F8F8F">
            Lorem ipsum dolor sit amet consectetur. Tellus venenatis eu nunc
            lacus egestas. Id eget dui id euismod massa. Velit tellus libero
            tellus in lectus velit imperdiet augue at. Iaculis nunc ut enim
            pulvinar sit sodales egestas mauris ur urna facilisi integer
            fringilla. Magna vestibulum mauris fringilla urna mauris.
          </Text>
        </VStack>
        <Flex
          bg="#F7FBFD"
          h="3vh"
          minH="30px"
          w="100%"
          alignItems="center"
          px="0.3vw"
          my="1vh"
        >
          <Text fontWeight="600">INVASIVE CARCINOMA</Text>
        </Flex>
        <HStack flex="1" alignItems="flex-start" my="1vh">
          <Text fontWeight="600" minW="40%">
            INVASIVE TUMOUR SIZE 23 MM
          </Text>
          <Text fontWeight="600" minW="60%">
            WHOLE TUMOUR (DCIS + INVASIVE) SIZE 91 MM
          </Text>
        </HStack>
        <HStack flex="1" alignItems="flex-start">
          <VStack alignItems="flex-start" mt="-0rem !important" minW="40%">
            <Text fontWeight="600">GRADE</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>1</Checkbox>
              <Checkbox>2</Checkbox>
              <Checkbox>3</Checkbox>
              <Checkbox>N/A</Checkbox>
            </HStack>
          </VStack>
          <VStack alignItems="flex-start" mt="-0rem !important" minW="60%">
            <Text fontWeight="600">TUMOUR EXTENT</Text>
            <HStack
              alignItems="flex-start"
              mt="-0rem !important"
              color="#8F8F8F"
            >
              <Checkbox>Localised</Checkbox>
              <Checkbox>Multiple, evasive foc</Checkbox>
            </HStack>
          </VStack>
        </HStack>
        <VStack alignItems="flex-start">
          <Text fontWeight="600">TYPE</Text>
          <VStack alignItems="flex-start" mt="-0rem !important" color="#8F8F8F">
            <Checkbox>No special type (ductal NST)</Checkbox>
            <Checkbox>
              Pure special type (90% purity, specify components present below)
            </Checkbox>
            <Checkbox>
              Mixed tumour type (50–90% special type component, specify
              components present below)
            </Checkbox>
            <Checkbox>IUQ</Checkbox>
            <Checkbox>Other malignant tumour (please specify)</Checkbox>
            <Checkbox>Not know</Checkbox>
          </VStack>
        </VStack>
        <VStack alignItems="flex-start">
          <Text fontWeight="600" pt="1vh">
            SPECIFY TYPE COMPONENT(S) PRESENT FOR PURE SPECIAL TYPE AND MIXED
            TUMOUR TYPES:
          </Text>
          <VStack alignItems="flex-start" mt="-0rem !important">
            <HStack
              mt="-0rem !important"
              color="#8F8F8F"
              alignItems="flex-start"
            >
              <VStack alignItems="flex-start">
                <Checkbox>Tubular/cribriform</Checkbox>
                <Checkbox>Lobular</Checkbox>
                <Checkbox>Ductal/no special type</Checkbox>
              </VStack>
              <VStack alignItems="flex-start">
                <Checkbox>Mucinous</Checkbox>
                <Checkbox>Medullary like</Checkbox>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
        <HStack flex="1" alignItems="flex-start" py="1vh">
          <VStack alignItems="flex-start" minW="40%">
            <Text fontWeight="600">GRADE</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>Not seen</Checkbox>
              <Checkbox>Not seen</Checkbox>
            </HStack>
          </VStack>
          <VStack alignItems="flex-start" minW="60%">
            <Text fontWeight="600">ASSOCIATED DCIS</Text>
            <HStack
              alignItems="flex-start"
              mt="-0rem !important"
              color="#8F8F8F"
            >
              <Checkbox>None</Checkbox>
              <Checkbox>Minimal</Checkbox>
              <Checkbox>Extensive</Checkbox>
            </HStack>
          </VStack>
        </HStack>
        <HStack flex="1" alignItems="flex-start">
          <VStack alignItems="flex-start" minW="40%">
            <Text fontWeight="600">DCIS GRADE</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>Low</Checkbox>
              <Checkbox>Intermediate</Checkbox>
            </HStack>
            <Checkbox color="#8F8F8F">High</Checkbox>
          </VStack>
          <VStack alignItems="flex-start" minW="60%">
            <Text fontWeight="600">IN SITU LOBULAR NEOPLASIA PRESENT</Text>
            <HStack
              alignItems="flex-start"
              mt="-0rem !important"
              color="#8F8F8F"
            >
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
            </HStack>
          </VStack>
        </HStack>
        <HStack flex="1" alignItems="flex-start" py="1vh">
          <VStack alignItems="flex-start">
            <Text fontWeight="600">PAGET&apos;S DISEASE PRESENT</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
            </HStack>
          </VStack>
        </HStack>
        <Flex
          bg="#F7FBFD"
          h="3vh"
          minH="30px"
          w="100%"
          alignItems="center"
          px="0.3vw"
        >
          <Text fontWeight="600">FINAL PATHOLOGY DCIS</Text>
        </Flex>
        <Text fontWeight="600" py="1vh">
          PURE DCIS SIZE 77 MM IN MAXIMUM EXTENT
        </Text>
        <HStack flex="1" alignItems="flex-start">
          <VStack alignItems="flex-start" minW="40%">
            <Text fontWeight="600">DCIS GRADE</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>Low</Checkbox>
              <Checkbox>Intermediate</Checkbox>
            </HStack>
            <Checkbox color="#8F8F8F">High</Checkbox>
          </VStack>
          <VStack alignItems="flex-start" minW="60%">
            <Text fontWeight="600">DCIS ARCHITECTURE</Text>
            <HStack
              mt="-0rem !important"
              color="#8F8F8F"
              alignItems="flex-start"
            >
              <VStack alignItems="flex-start">
                <Checkbox>Solid</Checkbox>
                <Checkbox>Cribriform</Checkbox>
                <Checkbox>Other</Checkbox>
              </VStack>
              <VStack alignItems="flex-start">
                <Checkbox>Micropapillary</Checkbox>
                <Checkbox>Papillary</Checkbox>
              </VStack>
            </HStack>
          </VStack>
        </HStack>
        <HStack
          flex="1"
          alignItems="flex-start"
          justifyContent="space-between"
          py="2vh"
        >
          <VStack alignItems="flex-start">
            <Text fontWeight="600">DCIS NERCROSIS</Text>
            <VStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
            </VStack>
          </VStack>
          <VStack alignItems="flex-start">
            <Text fontWeight="600">LCIS PRESENT</Text>
            <VStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
            </VStack>
          </VStack>
          <VStack alignItems="flex-start">
            <Text fontWeight="600">MICROINVASIVE</Text>
            <VStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
            </VStack>
          </VStack>
          <VStack alignItems="flex-start">
            <Text fontWeight="600">PAGET&apos;S DISEASE</Text>
            <VStack mt="-0rem !important" color="#8F8F8F">
              <Checkbox>Yes</Checkbox>
              <Checkbox>No</Checkbox>
            </VStack>
          </VStack>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default BreastCancer;
