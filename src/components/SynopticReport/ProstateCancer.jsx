import React, { useEffect, useState } from "react";
import {
  Radio,
  Flex,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
  RadioGroup,
  Button,
  useToast,
} from "@chakra-ui/react";
import SRHelper from "./SRHelper";

const ProstateCancer = ({
  slideId,
  caseId,
  saveSynopticReport,
  getSynopticReport,
  setSynopticType,
  userInfo,
}) => {
  const toast = useToast();
  const [synopticReportData, setSynopticReportData] = useState("");
  useEffect(() => {
    async function getData() {
      const response = await getSynopticReport({
        reportType: "prostate-cancer",
        caseId,
      });
      setSynopticReportData(response?.data?.data);
    }
    getData();
  }, [caseId]);
  const [inputData, setInputData] = useState({
    isPreviousHistory: "",
    previousBiopsy: "",
    previousTherapy: "",
    clinicalSymptoms: "",
    preBiopsySerumPSA: "",
    clinicalStage: "",
    leftBaseCores: "",
    leftBaseLength: "",
    leftBaseHistologicalTumourType: "",
    coExistentPathology: "",
    leftMidCores: "",
    leftMidLength: "",
    leftMidHistologicalTumourType: "",
    leftMidGleasonScore: "",
    isUpGrade: "",
    gleasonPattern: "",
    leftMidPerineuralInvasion: "",
    leftMidSeminalInvasion: "",
    leftMidLymphovascularInvasion: "",
    leftMidExtraprostateExtension: "",
    leftMidIntraductualProstate: "",
    leftMidCoexistentExtension: "",
    leftApexCores: "",
    leftApexLength: "",
    leftApexPerineuralInvasion: "",
    leftApexSeminalInvasion: "",
    leftApexLymphovascularInvasion: "",
    leftApexExtraprostateExtension: "",
    leftApexIntraductualProstate: "",
    leftApexCoexistentExtension: "",
    rightBaseCores: "",
    rightBaseLength: "",
    rightMidCores: "",
    rightMidLength: "",
    rightApexCores: "",
    rightApexLength: "",
    comments: "",
  });
  const reportData = [
    {
      title: "PREV.HISTORY OF PROSTATE CANCER",
      inputName: "isPreviousHistory",
      options: ["Yes", "No"],
    },
    {
      title: "PREVIOUS BIOPSY",
      inputName: "previousBiopsy",
      options: ["Previous biopsy: Gleason 3+3=6 left mid"],
    },
    {
      title: "PREVIOUS THERAPY",
      inputName: "previousTherapy",
      options: ["Yes", "No", "Nil"],
    },
    {
      title: "CLINICAL SYMPTOMS",
      inputName: "clinicalSymptoms",
      options: ["Yes", "No", "No symptoms"],
    },
    {
      title: "PRE-BIOPSY SERUM PSA",
      inputName: "preBiopsySerumPSA",
      options: ["8.9 ng/ml", "2"],
    },
    {
      title: "CLINICAL STAGE",
      inputName: "clinicalStage",
      options: ["No known metastases"],
    },
    {
      title: "NUMBER OF CORES",
      inputName: "leftBaseCores",
      options: ["1", "2", "3"],
    },
    {
      title: "LENGHTS(S)",
      inputName: "leftBaseLength",
    },
    {
      title: "HISTOLOGICAL TUMOUR TYPE",
      inputName: "leftBaseHistologicalTumourType",
    },
    {
      title: "COEXISTENT PATHOLOGY",
      inputName: "coExistentPathology",
    },
    {
      title: "NUMBER OF CORES",
      inputName: "leftMidCores",
      options: ["1", "2", "3"],
    },
    {
      title: "LENGHTS(S)",
      inputName: "leftMidLength",
    },
    {
      title: "HISTOLOGICAL TUMOUR TYPE",
      inputName: "leftMidHistologicalTumourType",
    },
    {
      title: "GLEASON SCORE",
      inputName: "leftMidGleasonScore",
    },
    {
      title: "ISUP GRADE",
      inputName: "isUpGrade",
    },
    {
      title: "GLEASON PATTERN",
      inputName: "gleasonPattern",
    },
    {
      title: "PERINEURAL INVASION",
      inputName: "leftMidPerineuralInvasion",
      options: ["Yes", "No", "Present"],
    },
    {
      title: "SEMINAL VESICLE INVASUION",
      inputName: "leftMidSeminalInvasion",
      options: ["Yes", "No", "Not Identified"],
    },
    {
      title: "LYMPHOVASCULAR INVASION",
      inputName: "leftMidLymphovascularInvasion",
      options: ["Yes", "No", "Not Identified"],
    },
    {
      title: "EXTRAPROSTATIC EXTENSIONM",
      inputName: "leftMidExtraprostateExtension",
      options: ["Yes", "No", "Not Identified"],
    },
    {
      title: "INTRADUCTUAL CA.OF PROSTATE",
      inputName: "leftMidIntraductualProstate",
      options: ["Yes", "No", "Not Identified"],
    },
    {
      title: "COEXISTENT EXTENSION",
      inputName: "leftMidCoexistentExtension",
      options: ["Yes", "No", "Not Identified"],
    },
    {
      title: "NUMBER OF CORES",
      inputName: "leftApexCores",
      options: ["1", "2", "3"],
    },
    {
      title: "LENGHTS(S)",
      inputName: "leftApexLength",
    },
    {
      title: "PERINEURAL INVASION",
      inputName: "leftApexPerineuralInvasion",
      options: ["Yes", "No", "Present"],
    },
    {
      title: "SEMINAL VESICLE INVASUION",
      inputName: "leftApexSeminalInvasion",
      options: ["Yes", "No", "Not Identified"],
    },
    {
      title: "LYMPHOVASCULAR INVASION",
      inputName: "leftApexLymphovascularInvasion",
      options: ["Yes", "No", "Not Identified"],
    },
    {
      title: "EXTRAPROSTATIC EXTENSIONM",
      inputName: "leftApexExtraprostateExtension",
      options: ["Yes", "No", "Not Identified"],
    },
    {
      title: "INTRADUCTUAL CA.OF PROSTATE",
      inputName: "leftApexIntraductualProstate",
      options: ["Yes", "No", "Not Identified"],
    },
    {
      title: "COEXISTENT EXTENSION",
      inputName: "leftApexCoexistentExtension",
      options: ["Yes", "No", "Not Identified"],
    },
    {
      title: "NUMBER OF CORES",
      inputName: "rightBaseCores",
      options: ["1", "2", "3"],
    },
    {
      title: "LENGHTS(S)",
      inputName: "rightBaseLength",
    },
    {
      title: "NUMBER OF CORES",
      inputName: "rightMidCores",
      options: ["1", "2", "3"],
    },
    {
      title: "LENGHTS(S)",
      inputName: "rightMidLength",
    },
    {
      title: "NUMBER OF CORES",
      inputName: "rightApexCores",
      options: ["1", "2", "3"],
    },
    {
      title: "LENGHTS(S)",
      inputName: "rightApexLength",
    },
  ];

  const handleInput = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitReport = async () => {
    try {
      await saveSynopticReport({
        isPreviousHistory: inputData.isPreviousHistory,
        previousBiopsy: inputData.previousBiopsy,
        previousTherapy: inputData.previousTherapy,
        preBiopsySerumPSA: inputData.preBiopsySerumPSA,
        clinicalSymptoms: inputData.clinicalSymptoms,
        clinicalStage: inputData.clinicalStage,
        leftBaseCores: inputData.leftBaseCores,
        leftBaseLength: inputData.leftBaseLength,
        leftBaseHistologicalTumourType:
          inputData.leftBaseHistologicalTumourType,
        coExistentPathology: inputData.coExistentPathology,
        leftMidCores: inputData.leftMidCores,
        leftMidLength: inputData.leftMidLength,
        leftMidHistologicalTumourType: inputData.leftMidHistologicalTumourType,
        leftMidGleasonScore: inputData.leftMidGleasonScore,
        isUpGrade: inputData.isUpGrade,
        gleasonPattern: inputData.gleasonPattern,
        leftMidPerineuralInvasion: inputData.leftMidPerineuralInvasion,
        leftMidSeminalInvasion: inputData.leftMidSeminalInvasion,
        leftMidLymphovascularInvasion: inputData.leftMidLymphovascularInvasion,
        leftMidExtraprostateExtension: inputData.leftMidExtraprostateExtension,
        leftMidIntraductualProstate: inputData.leftMidIntraductualProstate,
        leftMidCoexistentExtension: inputData.leftMidCoexistentExtension,
        leftApexCores: inputData.leftApexCores,
        leftApexLength: inputData.leftApexLength,
        leftApexPerineuralInvasion: inputData.leftApexPerineuralInvasion,
        leftApexSeminalInvasion: inputData.leftApexSeminalInvasion,
        leftApexLymphovascularInvasion:
          inputData.leftApexLymphovascularInvasion,
        leftApexExtraprostateExtension:
          inputData.leftApexExtraprostateExtension,
        leftApexIntraductualProstate: inputData.leftApexIntraductualProstate,
        leftApexCoexistentExtension: inputData.leftApexCoexistentExtension,
        rightBaseCores: inputData.rightBaseCores,
        rightBaseLength: inputData.rightBaseLength,
        rightMidCores: inputData.rightMidCores,
        rightMidLength: inputData.rightMidLength,
        rightApexCores: inputData.rightApexCores,
        rightApexLength: inputData.rightApexLength,
        comments: inputData.comments,
        slideId,
        caseId,
        reportType: "prostate-cancer-report",
      }).unwrap();
      toast({
        description: "Report submitted sucessfully",
        status: "success",
        duration: 2000,
      });
      setSynopticType("");
    } catch (err) {
      toast({
        description: "Fill all the field's and try again!!",
        status: "error",
        duration: 2000,
      });
    }
  };
  return (
    <Flex px="1.6vw" w="100%" fontSize="14px" direction="column">
      <Flex bg="#F7FBFD" h="3vh" minH="30px" w="100%" alignItems="center">
        <Text fontWeight="600" pl="0.3vw">
          CLINICAL
        </Text>
      </Flex>
      <Flex w="100%" flex="1" flexWrap="wrap" justifyContent="space-between">
        {reportData.slice(0, 6).map((inputField, index) => {
          return (
            <SRHelper
              inputField={inputField}
              key={`${index + 1}`}
              handleInput={handleInput}
              inputData={inputData}
              synopticReportData={synopticReportData}
            />
          );
        })}
      </Flex>
      <Flex direction="column">
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
        <Flex w="100%" flex="1" flexWrap="wrap" justifyContent="space-between">
          {reportData.slice(6, 10).map((inputField, index) => {
            return (
              <SRHelper
                inputField={inputField}
                key={`${index + 1}`}
                handleInput={handleInput}
                inputData={inputData}
                synopticReportData={synopticReportData}
              />
            );
          })}
        </Flex>
        <Text fontWeight="600">2.LEFT MID</Text>
        <Flex w="100%" flex="1" flexWrap="wrap" justifyContent="space-between">
          {reportData.slice(10, 22).map((inputField, index) => {
            return (
              <SRHelper
                inputField={inputField}
                key={`${index + 1}`}
                handleInput={handleInput}
                inputData={inputData}
                synopticReportData={synopticReportData}
              />
            );
          })}
        </Flex>
        <Text fontWeight="600">3.LEFT APEX</Text>
        <Flex w="100%" flex="1" flexWrap="wrap" justifyContent="space-between">
          {reportData.slice(22, 30).map((inputField, index) => {
            return (
              <SRHelper
                inputField={inputField}
                key={`${index + 1}`}
                handleInput={handleInput}
                inputData={inputData}
                synopticReportData={synopticReportData}
              />
            );
          })}
        </Flex>

        <Text fontWeight="600">4.RIGHT BASE</Text>
        <HStack flex="1" alignItems="flex-start" my="1vh" mt="-0rem !important">
          <VStack w="50%" alignItems="flex-start">
            <Text fontWeight="600">NUMBER OF CORES</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <RadioGroup
                value={
                  synopticReportData?.rightBaseCores || inputData.rightBaseCores
                }
                isDisabled={synopticReportData?.rightBaseCores}
              >
                <Radio value="1" onChange={handleInput} name="rightBaseCores">
                  1
                </Radio>
                <Radio
                  ml="16px"
                  value="2"
                  name="rightBaseCores"
                  onChange={handleInput}
                  // defaultValue={inputData.rightBaseCores}
                >
                  2
                </Radio>
                <Radio
                  ml="16px"
                  value="3"
                  name="rightBaseCores"
                  onChange={handleInput}
                  // defaultValue={inputData.rightBaseCores}
                >
                  3
                </Radio>
              </RadioGroup>
            </HStack>
          </VStack>
          <VStack w="50%" alignItems="flex-start">
            <Text fontWeight="600">LENGHTS(S)</Text>
            <Input
              size="sm"
              borderRadius="0"
              value={
                synopticReportData?.rightBaseLength || inputData.rightBaseLength
              }
              name="rightBaseLength"
              onChange={handleInput}
              readOnly={synopticReportData?.rightBaseLength}
            />
          </VStack>
        </HStack>
        <Text fontWeight="600">5.RIGHT MID</Text>
        <HStack flex="1" alignItems="flex-start" my="1vh" mt="-0rem !important">
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">NUMBER OF CORES</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <RadioGroup
                value={
                  synopticReportData?.rightMidCores || inputData.rightMidCores
                }
                isDisabled={synopticReportData?.rightMidCores}
              >
                <Radio
                  value="1"
                  name="rightMidCores"
                  onChange={handleInput}

                  // defaultValue={inputData.rightMidCores}
                >
                  1
                </Radio>
                <Radio
                  ml="16px"
                  value="2"
                  name="rightMidCores"
                  onChange={handleInput}
                  // defaultValue={inputData.rightMidCores}
                >
                  2
                </Radio>
                <Radio
                  ml="16px"
                  value="3"
                  name="rightMidCores"
                  onChange={handleInput}
                  // defaultValue={inputData.rightMidCores}
                >
                  3
                </Radio>
              </RadioGroup>
            </HStack>
          </VStack>
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">LENGHTS(S)</Text>
            <Input
              size="sm"
              borderRadius="0"
              value={
                synopticReportData?.rightMidLength || inputData.rightMidLength
              }
              name="rightMidLength"
              onChange={handleInput}
              readOnly={synopticReportData?.rightMidLength}
            />
          </VStack>
        </HStack>
        <Text fontWeight="600">6.RIGHT APEX</Text>
        <HStack flex="1" alignItems="flex-start" my="1vh" mt="-0rem !important">
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">NUMBER OF CORES</Text>
            <HStack mt="-0rem !important" color="#8F8F8F">
              <RadioGroup
                value={
                  synopticReportData?.rightApexCores || inputData.rightApexCores
                }
                isDisabled={synopticReportData?.rightApexCores}
              >
                <Radio
                  value="1"
                  name="rightApexCores"
                  onChange={handleInput}
                  // defaultValue={inputData.rightApexCores}
                >
                  1
                </Radio>
                <Radio
                  ml="16px"
                  value="2"
                  name="rightApexCores"
                  onChange={handleInput}
                  // defaultValue={inputData.rightApexCores}
                >
                  2
                </Radio>
                <Radio
                  ml="16px"
                  value="3"
                  name="rightApexCores"
                  onChange={handleInput}
                  // defaultValue={inputData.rightApexCores}
                >
                  3
                </Radio>
              </RadioGroup>
            </HStack>
          </VStack>
          <VStack minW="50%" alignItems="flex-start">
            <Text fontWeight="600">LENGHTS(S)</Text>
            <Input
              size="sm"
              borderRadius="0"
              value={
                synopticReportData?.rightApexLength || inputData.rightApexLength
              }
              name="rightApexLength"
              onChange={handleInput}
              readOnly={synopticReportData?.rightApexLength}
            />
          </VStack>
        </HStack>
        <VStack alignItems="flex-start" pb="2vh">
          <Text fontWeight="600">COMMENT</Text>
          <Textarea
            resize="none"
            w="50%"
            name="comments"
            value={synopticReportData?.comments || inputData.comments}
            onChange={handleInput}
            readOnly={synopticReportData?.comments}
          />
        </VStack>
      </Flex>
      {userInfo?.userType !== "technologist" && (
        <Flex justifyContent="flex-end" pb="2vh">
          {(synopticReportData === "" || synopticReportData === undefined) && (
            <Flex>
              <Button
                onClick={() => submitReport()}
                borderRadius="0"
                bg="#00153F"
                color="#fff"
                size="sm"
                minW="100px"
                _focus={{ outline: "none" }}
              >
                Submit
              </Button>
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default ProstateCancer;
