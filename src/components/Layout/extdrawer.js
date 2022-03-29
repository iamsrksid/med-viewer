import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Flex } from "@chakra-ui/react";
import PaletteOptions from "../Palette/paletteOptions";
import ActivityFeed from "../Feed/activityFeed";
import ShareAnnotation from "../Share/share";
import UserOptions from "../UserSettings/userOptions";

const ExtendibleDrawer = () => {
  const { activeDrawerTool } = useSelector((state) => state.drawerState);

  if (activeDrawerTool) {
    return (
      <Flex
        as="section"
        w="20em"
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        boxShadow="base"
        zIndex="1"
        bg="#181818"
        borderBottom="0.5px solid #ffffff"
        borderRight="0.5px solid #ffffff"
        overflow="hidden"
      >
        {activeDrawerTool === "PALETTE" && <PaletteOptions />}
        {activeDrawerTool === "FEED" && <ActivityFeed />}
        {activeDrawerTool === "SETTINGS" && <UserOptions />}
      </Flex>
    );
  } else {
    return <></>;
  }
};

ExtendibleDrawer.propTypes = {
  children: PropTypes.node,
};

export default ExtendibleDrawer;
