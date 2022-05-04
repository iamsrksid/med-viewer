import { Textarea, Button, Flex } from "@chakra-ui/react";
import React, { useState } from "react";

const Report = ({ submitReport }) => {
  const [reportText, setReportText] = useState("");

  return (
    <Flex direction="column" mt="5px" mb="5px" backgroundColor="#E5E5E550">
      <Textarea
        resize="none"
        h="79vh"
        bgColor="white"
        value={reportText}
        placeholder="Write report here..."
        fontWeight="500"
        fontSize="16px"
        fontFamily="inter"
        onChange={(e) => setReportText(e.target.value)}
      />
      <Button
        mt={3}
        backgroundColor="#00153F"
        h="32px"
        borderRadius={0}
        width="10em"
        color="white"
        fontWeight="500"
        fontSize="16px"
        fontFamily="inter"
        alignSelf="center"
        _hover={{ bg: "#2166fc" }}
        onClick={() => submitReport()}
      >
        Submit
      </Button>
    </Flex>
  );
};

export default Report;
