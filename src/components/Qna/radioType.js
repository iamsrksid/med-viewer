import { RadioGroup, Stack, Radio } from "@chakra-ui/react";
import React, { useEffect } from "react";
import _ from "lodash";

const RadioType = ({
  question,
  direction,
  response,
  handleChange,
  slideQna,
  isSecondDisable,
}) => {
  useEffect(() => {
    if (!isSecondDisable) return;
    handleChange({ questionId: question?._id });
  }, [isSecondDisable]);

  return (
    <RadioGroup
      name={question?._id}
      defaultValue={
        !_.isEmpty(response)
          ? response[question?._id]?.choiceId
          : slideQna?.response[question?._id]?.choiceId ?? ""
      }
      isDisabled={isSecondDisable || !_.isEmpty(response)}
      ml="10px"
    >
      {isSecondDisable ? null : (
        <Stack
          direction={direction}
          spacing={4}
          wrap="wrap"
          fontSize="14px"
          fontFamily="roboto"
        >
          {question?.choices.map((choice, index) => (
            <Radio
              borderColor="#000"
              key={choice._id ? choice._id : index}
              value={choice._id ? choice._id : choice}
              onChange={(e) =>
                handleChange({
                  questionId: e.target.name,
                  choiceId: e.target.value,
                  choiceText: choice?.choiceText,
                  choiceType: "id",
                })
              }
              checked
              fontSize="14px"
              fontFamily="roboto"
            >
              {choice?.choiceText ? choice?.choiceText : choice}
            </Radio>
          ))}
        </Stack>
      )}
    </RadioGroup>
  );
};

export default RadioType;
