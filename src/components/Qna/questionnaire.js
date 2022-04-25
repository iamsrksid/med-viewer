import { Box, Stack, Text, VStack } from "@chakra-ui/react";
import _ from "lodash";
import React from "react";
import QuestionType from "./questionType";

const Questionnaire = ({
  direction,
  questions,
  slideType,
  response,
  slideQna,
  setSlideQna,
  ...restProps
}) => {
  const isSecondVisible =
    slideQna?.qna?.[questions?.[0]?._id] === "No" ||
    response?.[questions?.[1]?._id];
  const isLastVisible =
    ["(1)Few", "(2)Many"].includes(slideQna?.qna?.[questions?.[4]?._id]) ||
    response?.[questions?.[5]?._id];

  const setQnaResponse = ({
    questionId = null,
    choiceId = null,
    choiceText = null,
    choiceType = null,
  }) => {
    setSlideQna((state) => {
      const { qna, response } = state;
      let newResponse = {};
      if (choiceType === "id")
        newResponse = {
          ...response,
          [questionId]: { questionId, choiceId, choiceType },
        };
      else
        newResponse = {
          ...response,
          [questionId]: { questionId, choiceText, choiceType },
        };
      const newQna = { ...qna, [questionId]: choiceText };
      return { qna: newQna, response: newResponse };
    });
  };
  return (
    <VStack
      spacing={6}
      pl="20px"
      align="flex-start"
      {...restProps}
      bgColor="rgba(236, 236, 236, 1)"
      mt="-15px"
      fontFamily="roboto"
      fontSize="14px"
    >
      {questions?.map((question, index) => (
        <Stack
          key={question._id ? question._id : index}
          direction={direction}
          spacing={4}
          mt="15px"
        >
          {question.questionText === "Hepatocellular ballooning" &&
          question.questionType === "text" ? null : (
            <Text
              whiteSpace="nowrap"
              color={
                question?._id === questions[1]?._id && !isSecondVisible
                  ? "grey"
                  : "black"
              }
            >{`Q${index + 1}. ${question.questionText}`}</Text>
          )}
          <Box>
            <QuestionType
              question={question}
              direction={direction}
              response={response}
              setQnaResponse={setQnaResponse}
              slideQna={slideQna}
              isSecondDisable={
                question?._id === questions[1]?._id && !isSecondVisible
              }
              isLastDisable={
                question.questionText === "Hepatocellular ballooning" &&
                question.questionType === "text" &&
                !isLastVisible
              }
            />
          </Box>
          {/* {(index === 1) & (slideType === "H&E") ? (
            <Box pt={45} pos="relative" left={-545}>
              <Text fontFamily="fira sans" fontWeight="600" fontSize="16px">
                NAFLD Activity Score(NAS)
              </Text>
            </Box>
          ) : (
            ""
          )}
          {(index === 3) & (slideType === "trichrome") ? (
            <Box pt={59} pos="relative" left={-440}>
              <Text fontFamily="fira sans" fontWeight="600" fontSize="16px">
                Fibrosis Stage
              </Text>
            </Box>
          ) : (
            ""
          )} */}
        </Stack>
      ))}
    </VStack>
  );
};

export default Questionnaire;
