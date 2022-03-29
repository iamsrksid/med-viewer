import React from "react";
import RadioType from "./radioType";
import TextType from "./textType";
import { useDispatch, useSelector } from "react-redux";
import { updateResponse } from "../../reducers/slideQnaReducer";
import CheckboxType from "./checkboxType";

const QuestionType = ({ question, direction, response }) => {
  const dispatch = useDispatch();

  const handleChange = (e, choiceText) => {
    dispatch(
      updateResponse({ id: e.target.name, value: e.target.value, choiceText })
    );
  };

  if (question?.questionType === "radio")
    return (
      <RadioType
        question={question}
        direction={direction}
        response={response}
        handleChange={handleChange}
      />
    );
  if (question?.questionType === "text")
    return (
      <TextType
        question={question}
        response={response}
        handleChange={handleChange}
      />
    );
  if (question?.questionType === "checkbox")
    return (
      <CheckboxType
        question={question}
        direction={direction}
        response={response}
      />
    );
  return null;
};

export default QuestionType;
