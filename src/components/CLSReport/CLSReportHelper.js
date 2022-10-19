import React, { useState, useEffect } from "react";
import { Button, Tooltip } from "@chakra-ui/react";
import { useFabricOverlayState } from "../../state/store";
import CLSReport from "./CLSReport";
import _ from "lodash";

const CLSReportHelper = ({
  restProps,
  caseInfo,
  viewerId,
  questions,
  userInfo,
  responseHandler,
  questionnaireResponse,
}) => {
  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { viewerWindow } = fabricOverlayState;
  const { slideId } = viewerWindow[viewerId];
  const [showCLSreport, setShowCLSReport] = useState(false);

  const [questionsResponse, setQuestionsResponse] = useState();
  useEffect(() => {
    async function fetchData() {
      const response = await questionnaireResponse({
        slide_id: slideId,
        case_id: caseInfo?.caseId,
      });
      setQuestionsResponse(response?.data?.data?.finalQuestionnaireResponse);
    }
    fetchData();
  }, [slideId, caseInfo?.caseId]);
  const [slideQna, setSlideQna] = useState({
    qna: {},
  });
  const handleCLSReport = () => {
    setShowCLSReport(!showCLSreport);
    setSlideQna({ qna: {} });
  };
  const response = Object.values(slideQna?.qna);

  const submitQnaReport = async () => {
    await responseHandler({
      slide_id: viewerId,
      response: response,
      case_id: caseInfo?.caseId,
    });
  };
  return (
    <>
      {!showCLSreport ? (
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
            {...restProps}
            onClick={handleCLSReport}
          >
            Report
          </Button>
        </Tooltip>
      ) : !questionsResponse?.length > 0 ? (
        <Tooltip
          label="Submit-Report"
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
            {...restProps}
            onClick={submitQnaReport}
            disabled={questions?.length !== response?.length}
          >
            Submit Report
          </Button>
        </Tooltip>
      ) : (
        ""
      )}
      {showCLSreport && (
        <CLSReport
          questions={questions}
          caseInfo={caseInfo}
          userInfo={userInfo}
          responseHandler={responseHandler}
          handleCLSReport={handleCLSReport}
          slideQna={slideQna}
          setSlideQna={setSlideQna}
          response={questionsResponse}
        />
      )}
    </>
  );
};

export default CLSReportHelper;
