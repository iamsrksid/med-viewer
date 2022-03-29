import { Input } from "@chakra-ui/react";
import React, { useState } from "react";
import _ from "lodash";

const TextType = ({ question, handleChange, response }) => {
  const [text, setText] = useState("");

  const handleText = (e) => {
    setText(e.target.value);
    handleChange(e);
  };

  return (
    <Input
      name={question?._id}
      value={!_.isEmpty(response) ? response[question?._id] : text}
      isDisabled={!_.isEmpty(response)}
      border="none"
      borderBottom="1px solid"
      borderRadius="none"
      _hover={{ borderBottom: "1px solid" }}
      _focus={{ border: "none", borderBottom: "1px solid" }}
      onChange={handleText}
    />
  );
};

export default TextType;
