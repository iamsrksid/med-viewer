import { Box, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import QuestionType from "./questionType";

const Questionnaire = ({
  direction,
  questions,
  slidetype,
  response,
  ...restProps
}) => {
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
          <Text whiteSpace="nowrap">{`Q${index + 1}. ${
            question.questionText
          }`}</Text>
          <Box>
            <QuestionType
              question={question}
              direction={direction}
              response={response}
            />
          </Box>
          {(index === 1) & (slidetype === "H&E") ? (
            <Box pt={45} pos="relative" left={-545}>
              <Text fontFamily="fira sans" fontWeight="600" fontSize="16px">
                NAFLD Activity Score(NAS)
              </Text>
            </Box>
          ) : (
            ""
          )}
          {(index === 3) & (slidetype === "trichrome") ? (
            <Box pt={59} pos="relative" left={-440}>
              <Text fontFamily="fira sans" fontWeight="600" fontSize="16px">
                Fibrosis Stage
              </Text>
            </Box>
          ) : (
            ""
          )}
        </Stack>
      ))}
    </VStack>
  );
};

export default Questionnaire;
