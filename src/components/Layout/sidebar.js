import React from "react";
import PropTypes from "prop-types";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import SidebarTools from "../Sidebar/tools";

const LayoutAppSidebar = (props) => {
  const [ifBiggerScreen] = useMediaQuery("(min-width:1920px)");

  return (
    <Flex
      as="section"
      color="BLACK"
      w={ifBiggerScreen ? "16%" : "275px"}
      direction="column"
      alignItems="left"
      boxShadow="base"
      zIndex="2"
      backgroundColor="rgba(236, 236, 236, 1)"
      overflowX="auto"
    >
      <SidebarTools {...props} />
    </Flex>
  );
};

LayoutAppSidebar.propTypes = {
  children: PropTypes.node,
};

export default LayoutAppSidebar;
