import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { MdArrowForwardIos } from "react-icons/md";
import Report from "./Report";
import { useFabricOverlayState } from "../../state/store";
import TooltipLabel from "../AdjustmentBar/ToolTipLabel";
import BreastCancer from "../SynopticReport/BreastCancer";
import ProstateCancer from "../SynopticReport/ProstateCancer";
import Lymphoma from "../SynopticReport/Lymphoma";
import SynopticReport from "../SynopticReport/SynopticReport";

const ShowReport = ({ showReport, openReport }) => {
  return showReport ? (
    ""
  ) : (
    <Tooltip
      label={<TooltipLabel heading="View Report" />}
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
      <Button
        variant="solid"
        h="32px"
        ml="15px"
        borderRadius="0px"
        backgroundColor="#00153F"
        _hover={{}}
        _focus={{
          border: "none",
        }}
        color="#fff"
        fontFamily="inter"
        fontSize="14px"
        fontWeight="500"
        onClick={openReport}
      >
        View Report
      </Button>
    </Tooltip>
  );
};

const OpenReportButton = ({ openReport }) => {
  return (
    <Tooltip
      label="Report"
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
      <Button
        variant="solid"
        h="32px"
        ml="15px"
        borderRadius="0px"
        backgroundColor="#00153F"
        _hover={{}}
        _focus={{
          border: "none",
        }}
        color="#fff"
        fontFamily="inter"
        fontSize="14px"
        fontWeight="500"
        onClick={openReport}
      >
        Report
      </Button>
    </Tooltip>
  );
};

const SubmitReportButton = ({ userInfo, reportData, handleReportsubmit }) => {
  return (
    <Tooltip
      label="Submit Report"
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
      <Button
        variant="solid"
        h="32px"
        ml="15px"
        borderRadius="0px"
        backgroundColor="#00153F"
        _hover={{}}
        _focus={{
          border: "none",
        }}
        color="#fff"
        fontFamily="inter"
        fontSize="14px"
        fontWeight="500"
        disabled={
          userInfo.userType !== "pathologist" ||
          (!reportData?.clinicalStudy &&
            !reportData?.grossDescription &&
            !reportData?.microscopicDescription &&
            !reportData?.impression &&
            !reportData?.advice &&
            !reportData?.annotedSlides)
        }
        onClick={handleReportsubmit}
      >
        Submit Report
      </Button>
    </Tooltip>
  );
};

const ReportHelper = ({
  caseInfo,
  saveReport,
  saveSynopticReport,
  viewerId,
  mediaUpload,
  slideInfo,
  showReport,
  setShowReport,
  userInfo,
  synopticType,
  setSynopticType,
  getSynopticReport,
}) => {
  const { fabricOverlayState } = useFabricOverlayState();
  const { viewerWindow } = fabricOverlayState;
  const { slideId } = viewerWindow[viewerId];
  const [slideData, setSlideData] = useState(null);

  const toast = useToast();

  useEffect(() => {
    async function fetchData() {
      const response = await slideInfo({
        caseId: caseInfo?._id,
      }).unwrap();
      setSlideData(response);
    }
    fetchData();
  }, [slideId, caseInfo, slideInfo]);

  const [annotedSlideImages, setAnnotedSlideImages] = useState([]);
  const [reportData, setReportData] = useState({
    clinicalStudy: "",
    grossDescription: "",
    microscopicDescription: "",
    impression: "",
    advice: "",
    annotedSlides: "",
  });
  const handleReportData = (input) => (e) => {
    const { value } = e.target;
    setReportData((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  const openReport = () => {
    setSynopticType("");
    setShowReport(true);
  };
  // form
  const annotedSlidesForm = new FormData();
  const handleUpload = (e) => {
    const { files } = e.target;
    const filesArray = Array.from(files);
    const imagesArray = filesArray.map((file) => file);
    setAnnotedSlideImages(imagesArray);
  };
  // clear values of textarea and file upload
  const clearValues = () => {
    Array.from(document.querySelectorAll("Textarea")).forEach((input) => {
      input.value = "";
    });
    setReportData({
      clinicalStudy: "",
      grossDescription: "",
      microscopicDescription: "",
      impression: "",
      advice: "",
      annotedSlides: "",
    });
    Array.from(document.querySelectorAll("input")).forEach((input) => {
      input.value = "";
    });
    setAnnotedSlideImages([]);
  };
  const handleReport = () => {
    setShowReport(!showReport);
    clearValues();
  };

  const handleReportsubmit = async () => {
    annotedSlideImages.forEach((element, i) => {
      annotedSlidesForm.append("files", annotedSlideImages[i]);
    });
    const { data } = await mediaUpload(annotedSlidesForm);
    try {
      const resp = await saveReport({
        caseId: caseInfo._id,
        subClaim: userInfo?.subClaim,
        clinicalStudy: reportData?.clinicalStudy,
        grossDescription: reportData?.grossDescription,
        microscopicDescription: reportData?.microscopicDescription,
        impression: reportData?.impression,
        advise: reportData?.advice,
        annotatedSlides: reportData?.annotedSlides,
        mediaURLs: data?.urls,
      }).unwrap();
      clearValues();
      setSlideData(resp);
      setShowReport(!showReport);

      toast({
        status: "success",
        title: "Successfully Reported",
        duration: 1500,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        status: "error",
        title: "Reporting Failed",
        description: "Something went wrong, try again!",
        duration: 1500,
        isClosable: true,
      });
    }
  };

  // if (slideData) {
  //   return
  // }

  return (
    <>
      {!showReport ? (
        <Menu autoSelect={false}>
          <MenuButton>
            <OpenReportButton openReport={openReport} />
          </MenuButton>
          <MenuList
            borderRadius="0"
            px="1.2vw"
            fontSize="14px"
            fontFamily="inter"
          >
            <MenuItem
              onClick={() => openReport()}
              borderBottom="1px solid #DEDEDE"
              _hover={{ bg: "#f6f6f6" }}
            >
              Standard Report
            </MenuItem>
            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton
                  _focus={{ outline: "none" }}
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom="1px solid #DEDEDE"
                >
                  <Text fontSize="14px">Synoptic Report</Text>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4} px="0">
                  <MenuItemOption
                    value="breast-cancer"
                    minH="32px"
                    onClick={() => setSynopticType("breast-cancer")}
                    _hover={{ bg: "#f6f6f6" }}
                  >
                    Breast cancer
                  </MenuItemOption>
                  <MenuItemOption
                    value="prostate-cancer"
                    minH="32px"
                    onClick={() => setSynopticType("prostate-cancer")}
                    _hover={{ bg: "#f6f6f6" }}
                  >
                    Prostate cancer
                  </MenuItemOption>
                  <MenuItemOption
                    value="lymphoma"
                    minH="32px"
                    onClick={() => setSynopticType("lymphoma")}
                    _hover={{ bg: "#f6f6f6" }}
                  >
                    Lymphoma
                  </MenuItemOption>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </MenuList>
        </Menu>
      ) : (
        <SubmitReportButton
          userInfo={userInfo}
          reportData={reportData}
          handleReportsubmit={handleReportsubmit}
        />
      )}

      {showReport ? (
        <Report
          userInfo={userInfo}
          handleReport={handleReport}
          report={showReport}
          reportData={reportData}
          handleReportData={handleReportData}
          caseInfo={caseInfo}
          handleUpload={handleUpload}
          annotedSlideImages={annotedSlideImages}
          reportedData={slideData}
        />
      ) : synopticType !== "" ? (
        <SynopticReport
          userInfo={userInfo}
          saveSynopticReport={saveSynopticReport}
          getSynopticReport={getSynopticReport}
          synopticType={synopticType}
          caseInfo={caseInfo}
          setSynopticType={setSynopticType}
          slideId={slideId}
        />
      ) : null}
    </>
  );
};

export default ReportHelper;
