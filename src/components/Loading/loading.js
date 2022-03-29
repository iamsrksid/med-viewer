import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";

const Loading = (restProps) => {
  return (
    <Flex justify="center" align="center" h="100vh">
      <Spinner
        color="#3965C5"
        size="xl"
        thickness="4px"
        speed="0.65s"
        {...restProps}
      />
    </Flex>
  );
};

export default Loading;
