import { RadioGroup, Stack, Radio } from "@chakra-ui/react";
import React from "react";
import _ from "lodash";

const RadioType = ({ question, direction, response, handleChange }) => {
  return (
    <RadioGroup
      name={question?._id}
      defaultValue={!_.isEmpty(response) ? response[question?._id] : ""}
      isDisabled={!_.isEmpty(response)}
      ml="10px"
    >
      <Stack direction={direction} spacing={4} wrap="wrap" fontSize="14px"
            fontFamily="roboto">
        {question?.choices.map((choice, index) => (
          <Radio
            borderColor="#000"
            key={choice._id ? choice._id : index}
            value={choice._id ? choice._id : choice}
            onChange={(e) => handleChange(e, choice?.choiceText)}
            checked={true}
            fontSize="14px"
            fontFamily="roboto"
          >
            {choice?.choiceText ? choice?.choiceText : choice}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
};

export default RadioType;
