import {
  Button,
  Flex,
  HStack,
  Input,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import SRHelper from "./SRHelper";

const BreastCancer = ({
  saveSynopticReport,
  slideId,
  caseId,
  getSynopticReport,
  setSynopticType,
}) => {
  const toast = useToast();
  const [synopticReportData, setSynopticReportData] = useState("");
  useEffect(() => {
    async function getData() {
      const response = await getSynopticReport({
        reportType: "breast-cancer",
        caseId,
      });
      setSynopticReportData(response?.data?.data);
    }
    getData();
  }, [caseId]);
  const [inputData, setInputData] = useState({
    dataRecieved: "",
    specimenType: "",
    specimenRadiographProvided: "",
    radiologyAbnormalitySeen: "",
    rGrade: "",
    radiologyLesion: "",
    specimenWeight: "",
    ellipseOfSkin: "",
    nipple: "",
    histologicalClassificationPresent: "",
    fibrofattyTissue: "",
    lesionMeasures: "",
    site: "",
    macroscopicDistance: "",
    comments: "",
    invasiveTumourSize: "",
    wholeTumourSize: "",
    invasiveGrade: "",
    tumourExtent: "",
    type: "",
    typeForComponents: "",
    grade: "",
    associatedDcis: "",
    dcisGrade: "",
    isSituLobularNeoplasia: "",
    isPagetDisease: "",
    pureDcisSize: "",
    pureDcisGrade: "",
    dcisArchitecture: "",
    dcisNecrosis: "",
    isLcis: "",
    microInvasion: "",
    pagetDisease: "",
  });
  const reportData = [
    {
      title: "DATA RECEIVED",
      inputName: "dataRecieved",
      options: ["Left", "Right"],
    },
    {
      title: "SPECIMEN TYPE",
      inputName: "specimenType",
      options: [
        "Diagnostic marker",
        "Radical mastectomy",
        "Wide local excision",
        "Therapeutic marker",
        "Simple mastectomy",
        "Subcutaneous",
        "Re-excision",
        "Others",
      ],
    },
    {
      title: "SPECIMEN RADIOGRAPHY PROVIDED",
      inputName: "specimenRadiographProvided",
      options: ["Yes", "No"],
    },
    {
      title: "RADIOLOGICAL ABNORMALITY SEEN",
      inputName: "radiologyAbnormalitySeen",
      options: ["Yes", "No", "Unsure"],
    },
    {
      title: "R GRADE",
      inputName: "rGrade",
      options: ["1", "2", "3", "4", "5"],
    },
    {
      title: "RADIOLOGICAL LESION",
      inputName: "radiologyLesion",
      options: [
        "Circumscribed mass",
        "Parenchymal deformity",
        "Stellate lesion",
        "Calcification",
        "Other",
      ],
    },
    {
      title: "SPECIMEN WEIGHT",
      inputName: "specimenWeight",
    },
    {
      title: "ELLIPSE OF SKIN",
      inputName: "ellipseOfSkin",
    },
    {
      title: "NIPPLE",
      inputName: "nipple",
      options: ["Normal", "Indrawn", "Not assessable"],
    },
    {
      title: "HISTOLOGICAL CLASIFICATION PRESENT",
      inputName: "histologicalClassificationPresent",
      options: ["Benign", "Benign and malignant", "Malignant", "absent"],
    },
    {
      title: " FIBROFATTY TISSUE",
      inputName: "fibrofattyTissue",
    },
    {
      title: "LESION MEASURES",
      inputName: "lesionMeasures",
    },
    {
      title: "SITE",
      inputName: "site",
      options: ["OUQ", "OLQ", "IUQ", "LLQ", "Retroareolar", "Not know"],
    },
    {
      title: "GRADE",
      inputName: "invasiveGrade",
      options: ["1", "2", "3", "4", "N/A"],
    },
    {
      title: "TUMOUR EXTENT",
      inputName: "tumourExtent",
      options: ["Localised", "Multiple, evasive foc"],
    },
    {
      title: "TYPE",
      inputName: "type",
      options: [
        "No special type (ductal NST)",
        "Pure special type (90% purity, specify components present below)",
        "Mixed tumour type (50–90% special type component, specify components present below)",
        "IUQ",
        "Other malignant tumour (please specify)",
        "Not know",
      ],
    },
    {
      title:
        "SPECIFY TYPE COMPONENT(S) PRESENT FOR PURE SPECIAL TYPE AND MIXED TUMOUR TYPES:",
      inputName: "typeForComponents",
      options: [
        "Tubular/cribriform",
        "Lobular",
        "Ductal/no special type",
        "Mucinous",
        "Medullary like",
      ],
    },
    {
      title: "GRADE",
      inputName: "grade",
      options: ["Not seen", "Possible"],
    },
    {
      title: "ASSOCIATED DCIS",
      inputName: "associatedDcis",
      options: ["None", "Minimal", "Extensive"],
    },
    {
      title: "DCIS GRADE",
      inputName: "dcisGrade",
      options: ["Low", "High", "Intermediate"],
    },
    {
      title: "IN SITU LOBULAR NEOPLASIA PRESENT",
      inputName: "isSituLobularNeoplasia",
      options: ["Yes", "No"],
    },
    {
      title: "PAGET'S DISEASE PRESENT",
      inputName: "isPagetDisease",
      options: ["Yes", "No"],
    },
    {
      title: "DCIS GRADE",
      inputName: "pureDcisGrade",
      options: ["Low", "High", "Intermediate"],
    },
    {
      title: "DCIS ARCHITECTURE",
      inputName: "dcisArchitecture",
      options: ["Solid", "Cribriform", "Micropapillary", "Papillary", "Other"],
    },
    {
      title: "DCIS NERCROSIS",
      inputName: "dcisNecrosis",
      options: ["Yes", "No"],
    },
    {
      title: "LCIS PRESENT",
      inputName: "isLcis",
      options: ["Yes", "No"],
    },
    {
      title: "MICROINVASIVE",
      inputName: "microInvasion",
      options: ["Yes", "No"],
    },
    {
      title: "PAGET'S DISEASE",
      inputName: "pagetDisease",
      options: ["Yes", "No"],
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
        macroscopy: {
          dataRecieved: inputData.dataRecieved,
          specimenType: inputData.specimenType,
          specimenRadiographProvided: inputData.specimenRadiographProvided,
          radiologyAbnormalitySeen: inputData.radiologyAbnormalitySeen,
          rGrade: inputData.rGrade,
          radiologyLesion: inputData.radiologyLesion,
          specimenWeight: inputData.specimenWeight,
          ellipseOfSkin: inputData.ellipseOfSkin,
          nipple: inputData.nipple,
          histologicalClassificationPresent:
            inputData.histologicalClassificationPresent,
          fibrofattyTissue: inputData.fibrofattyTissue,
          lesionMeasures: inputData.lesionMeasures,
          site: inputData.site,
          macroscopicDistanceToMargin: inputData.macroscopicDistance,
          comments: inputData.comments,
        },

        invasiveCarcinoma: {
          invasiveTumourSize: inputData.invasiveTumourSize,
          wholeTumourSize: inputData.wholeTumourSize,
          invasiveGrade: inputData.invasiveGrade,
          tumourExtent: inputData.tumourExtent,
          type: inputData.type,
        },

        specifyTypeForComponentsPresentForSpecialtypeAndMixedTumourTypes: {
          typeForComponents: inputData.typeForComponents,
          grade: inputData.grade,
          associatedDcis: inputData.associatedDcis,
          isSituLobularNeoplasia: inputData.isSituLobularNeoplasia,
          dcisGrade: inputData.dcisGrade,
          isPagetDisease: inputData.isPagetDisease,
        },

        finalPathologyDcis: {
          isLcis: inputData.isLcis,
          pureDcisSize: inputData.pureDcisSize,
          pureDcisGrade: inputData.pureDcisGrade,
          dcisArchitecture: inputData.dcisArchitecture,
          dcisNecrosis: inputData.dcisNecrosis,
          microInvasion: inputData.microInvasion,
          pagetDisease: inputData.pagetDisease,
        },
        slideId,
        caseId,
        reportType: "breast-cancer-report",
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
          MACROSCOPY
        </Text>
      </Flex>
      <Flex w="100%" flex="1" flexWrap="wrap" justifyContent="space-between">
        {reportData.slice(0, 13).map((inputField, index) => {
          return (
            <SRHelper
              inputField={inputField}
              key={`${index + 1}`}
              handleInput={handleInput}
              inputData={inputData}
              macroscopicData={
                synopticReportData?.macroscopy?.[inputField?.inputName]
              }
            />
          );
        })}
      </Flex>
      <Flex direction="column">
        <HStack flex="1" py="1vh" />
        <Text fontWeight="600" py="1vh">
          MACROSCOPIC DISTANCE TO NEAREST{" "}
          <Input
            w="4vw"
            size="sm"
            value={
              synopticReportData !== ""
                ? synopticReportData?.macroscopy?.macroscopicDistanceToMargin
                : inputData.macroscopicDistance
            }
            readOnly={
              synopticReportData?.macroscopy?.macroscopicDistanceToMargin
            }
            name="macroscopicDistance"
            onChange={handleInput}
          />{" "}
          MARGIN
        </Text>
        <VStack flex="1" alignItems="flex-start">
          <Text fontWeight="600">COMMENTS</Text>
          <Textarea
            borderRadius="0"
            name="comments"
            onChange={handleInput}
            value={
              synopticReportData !== ""
                ? synopticReportData?.macroscopy?.comments
                : inputData.comments
            }
            readOnly={synopticReportData?.macroscopy?.comments}
          />
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
        <HStack flex="1" alignItems="flex-start">
          <Text fontWeight="600" minW="49%">
            INVASIVE TUMOUR SIZE{" "}
            <Input
              w="4vw"
              size="sm"
              name="invasiveTumourSize"
              value={
                synopticReportData?.invasiveCarcinoma?.invasiveTumourSize ||
                inputData.invasiveTumourSize
              }
              readOnly={
                synopticReportData?.invasiveCarcinoma?.invasiveTumourSize
              }
              onChange={handleInput}
            />
            MM
          </Text>
          <Text fontWeight="600" minW="49%">
            WHOLE TUMOUR (DCIS + INVASIVE) SIZE{" "}
            <Input
              w="4vw"
              size="sm"
              name="wholeTumourSize"
              value={
                synopticReportData?.invasiveCarcinoma?.wholeTumourSize ||
                inputData.wholeTumourSize
              }
              readOnly={synopticReportData?.invasiveCarcinoma?.wholeTumourSize}
              onChange={handleInput}
            />{" "}
            MM
          </Text>
        </HStack>
        <Flex w="100%" flex="1" flexWrap="wrap" justifyContent="space-between">
          {reportData.slice(13, 22).map((inputField, index) => {
            return (
              <SRHelper
                inputField={inputField}
                key={`${index + 1}`}
                handleInput={handleInput}
                inputData={inputData}
                invasiveCarcinoma={
                  synopticReportData?.invasiveCarcinoma?.[inputField?.inputName]
                }
                tumourType={
                  synopticReportData
                    ?.specifyTypeForComponentsPresentForSpecialtypeAndMixedTumourTypes?.[
                    inputField?.inputName
                  ]
                }
              />
            );
          })}
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
          <Text fontWeight="600">FINAL PATHOLOGY DCIS</Text>
        </Flex>
        <Text fontWeight="600">
          PURE DCIS SIZE{" "}
          <Input
            w="4vw"
            size="sm"
            name="pureDcisSize"
            onChange={handleInput}
            value={
              synopticReportData?.finalPathologyDcis?.pureDcisSize ||
              inputData.pureDcisSize
            }
            readOnly={synopticReportData?.finalPathologyDcis?.pureDcisSize}
          />{" "}
          MM IN MAXIMUM EXTENT
        </Text>
        <Flex w="100%" flex="1" flexWrap="wrap" justifyContent="space-between">
          {reportData.slice(22, 29).map((inputField, index) => {
            return (
              <SRHelper
                inputField={inputField}
                key={`${index + 1}`}
                handleInput={handleInput}
                inputData={inputData}
                synopticReportData={synopticReportData}
                finalPathologyDcis={
                  synopticReportData?.finalPathologyDcis?.[
                    inputField?.inputName
                  ]
                }
              />
            );
          })}
        </Flex>
      </Flex>
      {(synopticReportData === "" || synopticReportData === undefined) && (
        <Flex justifyContent="flex-end" pb="2vh">
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
  );
};

export default BreastCancer;
