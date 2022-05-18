import { Stack, Checkbox, CheckboxGroup } from "@chakra-ui/react";
import React from "react";
import _ from "lodash";

const CheckboxType = ({
  question,
  direction,
  response,
  setQnaResponse,
  slideQna,
}) => {
  const handleChange = (value = []) => {
    const choiceText = [];
    if (value.length > 0)
      question?.choices.forEach((choice) => {
        if (value.includes(choice._id)) choiceText.push(choice?.choiceText);
      });
    setQnaResponse({
      questionId: question?._id,
      choiceId: value,
      choiceType: "id",
    });
  };

  return (
    <CheckboxGroup
      name={question?._id}
      defaultValue={
        !_.isEmpty(response)
          ? response[question?._id]?.choiceId
          : slideQna?.response[question?._id] ?? ""
      }
      isDisabled={!_.isEmpty(response)}
      ml="10px"
      onChange={handleChange}
    >
      <Stack
        direction={direction}
        spacing={4}
        wrap="wrap"
        fontSize="14px"
        fontFamily="roboto"
      >
        {question?.choices.map((choice, index) => (
          <Checkbox
            borderColor="#000"
            key={choice._id ? choice._id : index}
            value={choice._id ? choice._id : choice}
            checked
            fontSize="14px"
            fontFamily="roboto"
          >
            {choice?.choiceText ? choice?.choiceText : choice}
          </Checkbox>
        ))}
      </Stack>
    </CheckboxGroup>
  );
};

export default CheckboxType;
