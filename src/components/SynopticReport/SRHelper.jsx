import { Flex, Input, Radio, RadioGroup, Text, VStack } from "@chakra-ui/react";
import _ from "lodash";
import React from "react";

const SRHelper = ({
  inputField,
  handleInput,
  inputData,
  finalPathologyDcis,
  invasiveCarcinoma,
  tumourType,
  macroscopicData,
  macroscopicLeftApex,
  macroscopicLeftMid,
  macroscopicLeftBase,
  clinical,
  clinicalInformation,
  microscopicFinding,
  ancillaryTestFindings,
}) => {
  return (
    <VStack alignItems="flex-start" minW="49%" mt="1vh">
      <Text fontWeight="600">{inputField.title}</Text>
      <Flex
        color="#8F8F8F"
        mt="-0rem !important"
        flexWrap="wrap"
        ml="-16px !important"
      >
        {inputField?.options ? (
          <RadioGroup
            pl="-16px"
            value={
              macroscopicData ||
              finalPathologyDcis ||
              invasiveCarcinoma ||
              tumourType ||
              macroscopicLeftApex ||
              macroscopicLeftMid ||
              macroscopicLeftBase ||
              clinical ||
              clinicalInformation ||
              microscopicFinding ||
              ancillaryTestFindings
            }
            isDisabled={
              macroscopicData ||
              finalPathologyDcis ||
              invasiveCarcinoma ||
              tumourType ||
              macroscopicLeftApex ||
              macroscopicLeftMid ||
              macroscopicLeftBase ||
              clinical ||
              clinicalInformation ||
              microscopicFinding ||
              ancillaryTestFindings
            }
          >
            {inputField?.options?.map((option, i) => {
              return (
                <Radio
                  key={`${i + 1}`}
                  value={option}
                  ml="16px"
                  name={inputField?.inputName}
                  onChange={(e) => handleInput(e)}
                >
                  {option}
                </Radio>
              );
            })}
          </RadioGroup>
        ) : (
          <Input
            ml="16px"
            size="sm"
            borderRadius="0"
            name={inputField?.inputName}
            value={
              macroscopicData ||
              finalPathologyDcis ||
              invasiveCarcinoma ||
              tumourType ||
              macroscopicLeftApex ||
              macroscopicLeftMid ||
              macroscopicLeftBase ||
              clinical ||
              clinicalInformation ||
              microscopicFinding ||
              ancillaryTestFindings
            }
            readOnly={
              macroscopicData ||
              finalPathologyDcis ||
              invasiveCarcinoma ||
              tumourType ||
              macroscopicLeftApex ||
              macroscopicLeftMid ||
              macroscopicLeftBase ||
              clinical ||
              clinicalInformation ||
              microscopicFinding ||
              ancillaryTestFindings
            }
            onChange={(e) => handleInput(e)}
          />
        )}
      </Flex>
    </VStack>
  );
};

export default SRHelper;
