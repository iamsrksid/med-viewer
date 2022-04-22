import React from "react";
import RadioType from "./radioType";
import TextType from "./textType";
import CheckboxType from "./checkboxType";

const QuestionType = ({
  question,
  direction,
  response,
  setQnaResponse,
  slideQna,
  isSecondDisable,
  isLastDisable,
}) => {
  const handleChange = ({ questionId, choiceId, choiceText, choiceType }) => {
    setQnaResponse({ questionId, choiceId, choiceText, choiceType });
  };

  if (question?.questionType === "radio")
    return (
      <RadioType
        question={question}
        direction={direction}
        response={response}
        handleChange={handleChange}
        slideQna={slideQna}
        isSecondDisable={isSecondDisable}
      />
    );
  if (question?.questionType === "text")
    return (
      <TextType
        question={question}
        response={response}
        handleChange={handleChange}
        slideQna={slideQna}
        isLastDisable={isLastDisable}
      />
    );
  if (question?.questionType === "checkbox")
    return (
      <CheckboxType
        question={question}
        direction={direction}
        response={response}
        setQnaResponse={setQnaResponse}
        slideQna={slideQna}
      />
    );
  return null;
};

export default QuestionType;
