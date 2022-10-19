import { Flex, IconButton, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Questionnaire from "../Qna/questionnaire";

function CLSReport({
  questions,
  caseInfo,
  handleCLSReport,
  slideQna,
  setSlideQna,
  response,
}) {
  const [ifWidthLessthan1920] = useMediaQuery("(max-width:1920px)");

  const [slideQuestions, setSlideQuestions] = useState();
  useEffect(() => {
    async function fetchData() {
      const response = await questions({ studyId: caseInfo?.caseId });
      setSlideQuestions(response?.data);
    }
    fetchData();
  }, [caseInfo]);
  return (
    <Flex
      fontSize="12px"
      fontFamily="inter"
      minW="280px"
      width="26.281vw"
      h={ifWidthLessthan1920 ? "calc(100vh - 90px)" : "90.926vh"}
      top={ifWidthLessthan1920 ? "90px" : "9.999vh"}
      pos="absolute"
      right="0px"
      bg="#FCFCFC"
      flexDirection="column"
    >
      <Flex w="100%" justifyContent="flex-end">
        <IconButton
          icon={<AiOutlineClose />}
          onClick={handleCLSReport}
          borderRadius="0"
          background="#fcfcfc"
          size="sm"
          _focus={{}}
        />
      </Flex>
      <Questionnaire
        questions={slideQuestions?.data?.desiredQuestionsInfo}
        slideQna={slideQna}
        setSlideQna={setSlideQna}
        response={response}
      />
    </Flex>
  );
}

export default CLSReport;
