import React, { useEffect, useState } from "react";
import { Button, Flex, HStack, Input, Text, useToast } from "@chakra-ui/react";
import SRHelper from "./SRHelper";

const Lymphoma = ({
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
        reportType: "lymphoma-cancer",
        caseId,
      });
      setSynopticReportData(response?.data?.data);
    }
    getData();
  }, [caseId]);
  const [inputData, setInputData] = useState({
    typeOfSpecimen: "",
    dateOfRequest: "",
    principalClinician: "",
    siteOfBiopsy: "",
    laterability: "",
    reasonForBiopsy: "",
    grade: "",
    involvedSiteOrPatternOfDiseasesSpread: "",
    clinicalOrStagesExtentOfDiseases: "",
    constitutionalSymptoms: "",
    furtherClinicalInformation: "",
    specimenType: "",
    specimenSize: "",
    narrativeOrMicroscopicDescription: "",
    abnormalCells: "",
    abnormalCellSize: "",
    abnormalCellCytomorphology: "",
    abnormalCellProLiferativeIndicators: "",
    immunoHistoChemistry: "",
    flowStudies: "",
    clonality: "",
    whoDiseaseSubType: "",
    ancillaryAbnormalCellSize: "",
    ancillaryCytomorphology: "",
    ancillaryProLiferativeIndicators: "",
    wholeTumourSize: "",
  });
  const reportData = [
    {
      title: "TYPES OF SPECIMEN",
      inputName: "typeOfSpecimen",
      options: ["Yes", "No"],
    },
    {
      title: "DATE OF REQUEST",
      inputName: "dateOfRequest",
      options: ["Previous biopsy: Gleason 3+3=6 left mid"],
    },
    {
      title: "PRINCIPAL CLINICIAN",
      inputName: "principalClinician",
      options: ["Yes", "No", "Nil"],
    },
    {
      title: "SITE OF BIOPSY",
      inputName: "siteOfBiopsy",
      options: ["lymph node", "other"],
    },
    {
      title: "LATERABILITY",
      inputName: "laterability",
      options: ["left", "right", "middle", "unknown"],
    },
    {
      title: "REASON FOR BIOPSY",
      inputName: "reasonForBiopsy",
      options: ["No known metastases"],
    },
    {
      title: "GRADE",
      inputName: "grade",
      options: ["1", "2", "3", "N/A"],
    },

    {
      title: "INVOLVED SITE OR PATTERN OF DISEASE SPREAD",
      inputName: "involvedSiteOrPatternOfDiseasesSpread",
      options: ["Nodal / Lymphatic", "Extranodal / Extralymphatic", "Unknown"],
    },
    {
      title: "STAGES OR CLINICAL EXTENT OF DISEASES",
      inputName: "clinicalOrStagesExtentOfDiseases",
      options: ["Solitary", "Localized", "Generalized", "Unknown"],
    },
    {
      title: "CONSTITUTIONAL SYMPTOMS",
      inputName: "constitutionalSymptoms",
      options: ["Present", "Absent", "Unknown"],
    },
    {
      title: "FURTHER CLINICAL INFORMATION",
      inputName: "furtherClinicalInformation",
    },
    {
      title: "SPECIMEN TYPE",
      inputName: "specimenType",
      options: ["Nodal / Lymphatic", "Extranodal / Extralymphatic", "Unknown"],
    },
    {
      title: "SPECIMEN SIZE",
      inputName: "specimenSize",
      options: ["Biopises", "Fluid (mm)", "Spleen (g)"],
    },
    {
      title: "NARRATIVE OR MICROSCOPIC DESCRIPTION",
      inputName: "narrativeOrMicroscopicDescription",
    },
    {
      title: "ABNORMAL CELLS:PATTERNS OF INFILTRATION OR ARCHITECTURE",
      inputName: "abnormalCells",
      options: ["Nodal / Lymphatic", "Extranodal / Extralymphatic", "Unknown"],
    },
    {
      title: "ABNORMAL CELL SIZE",
      inputName: "abnormalCellSize",
      options: ["Small", "Fixed", "Medium", "Indetermined", "Large"],
    },
    {
      title: "ABNORMAL CELL CYTOMORPHOLOGY",
      inputName: "abnormalCellCytomorphology",
      options: ["Small", "Fixed", "Medium", "Large"],
    },
    {
      title: "ABNORMAL CELL PROLIFERATIVE INDICATORS",
      inputName: "abnormalCellProLiferativeIndicators",
    },
    {
      title: "IMMUNOHISTOCHEMISTRY",
      inputName: "immunoHistoChemistry",
      options: ["Performed", "Positive", "Not performed", "Negative"],
    },
    {
      title: "FLOW STUDIES",
      inputName: "flowStudies",
      options: ["Performed", "Positive", "Not performed", "Negative"],
    },
    {
      title: "CLONALITY",
      inputName: "clonality",
    },
    {
      title: "WHO DISEASE SUBTYPE",
      inputName: "whoDiseaseSubType",
      options: ["Nodal / Lymphatic", "Extranodal / Extralymphatic", "Unknown"],
    },
    {
      title: "ABNORMAL CELL SIZE",
      inputName: "ancillaryAbnormalCellSize",
      options: ["Small", "Fixed", "Medium", "Indetermined", "Large"],
    },
    {
      title: "ABNORMAL CELL CYTOMORPHOLOGY",
      inputName: "ancillaryCytomorphology",
      options: ["Small", "Fixed", "Medium", "Large"],
    },
    {
      title: "ABNORMAL CELL PROLIFERATIVE INDICATORS",
      inputName: "ancillaryProLiferativeIndicators",
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
        typeOfSpecimen: inputData.typeOfSpecimen,
        dateOfRequest: inputData.dateOfRequest,
        principalClinician: inputData.principalClinician,
        siteOfBiopsy: inputData.siteOfBiopsy,
        laterability: inputData.laterability,
        reasonForBiopsy: inputData.reasonForBiopsy,
        wholeTumourSize: inputData.wholeTumourSize,
        grade: inputData.grade,
        involvedSiteOrPatternOfDiseasesSpread:
          inputData.involvedSiteOrPatternOfDiseasesSpread,
        clinicalOrStagesExtentOfDiseases:
          inputData.clinicalOrStagesExtentOfDiseases,
        constitutionalSymptoms: inputData.constitutionalSymptoms,
        furtherClinicalInformation: inputData.furtherClinicalInformation,
        specimenType: inputData.specimenType,
        specimenSize: inputData.specimenSize,
        narrativeOrMicroscopicDescription:
          inputData.narrativeOrMicroscopicDescription,
        abnormalCells: inputData.abnormalCells,
        abnormalCellSize: inputData.abnormalCellSize,
        abnormalCellCytomorphology: inputData.abnormalCellCytomorphology,
        abnormalCellProLiferativeIndicators:
          inputData.abnormalCellProLiferativeIndicators,
        immunoHistoChemistry: inputData.immunoHistoChemistry,
        flowStudies: inputData.flowStudies,
        clonality: inputData.clonality,
        whoDiseaseSubType: inputData.whoDiseaseSubType,
        ancillaryAbnormalCellSize: inputData.ancillaryAbnormalCellSize,
        ancillaryCytomorphology: inputData.ancillaryCytomorphology,
        ancillaryProLiferativeIndicators:
          inputData.ancillaryProLiferativeIndicators,
        slideId,
        caseId,
        reportType: "lymphoma-cancer-report",
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
          CLINICAL INFORMATION & SURGICAL HANDLING
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
        <HStack flex="1" alignItems="flex-start">
          <Text fontWeight="600" minW="49%">
            CLINICAL OR DIFFERENT DIAGNOSIS
          </Text>
          <Text fontWeight="600" minW="49%">
            WHOLE TUMOUR (DCIS + INVASIVE) SIZE{" "}
            <Input
              w="4vw"
              size="sm"
              name="wholeTumourSize"
              value={
                synopticReportData?.wholeTumourSize || inputData.wholeTumourSize
              }
              readOnly={synopticReportData?.wholeTumourSize}
              onChange={handleInput}
            />{" "}
            MM
          </Text>
        </HStack>
        <Flex w="100%" flex="1" flexWrap="wrap" justifyContent="space-between">
          {reportData.slice(6, 11).map((inputField, index) => {
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

        <Flex w="100%" flex="1" flexWrap="wrap" justifyContent="space-between">
          {reportData.slice(11, 18).map((inputField, index) => {
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

      <Flex w="100%" flex="1" flexWrap="wrap" justifyContent="space-between">
        {reportData.slice(18).map((inputField, index) => {
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

export default Lymphoma;
