import React, { memo } from "react";
import { Flex, Text, IconButton, useMediaQuery } from "@chakra-ui/react";
import { BsGrid1X2 } from "react-icons/bs";
import { GrHomeRounded } from "react-icons/gr";
import Move from "../Move/move";
import ChangeCase from "../Case/changeCase";
import ActionTools from "../Toolbar/ActionTools";
import ScreenTools from "../Toolbar/ScreenTools";
import "../../styles/viewer.css";
import ToolbarButton from "../ViewerToolbar/button";
import IconSize from "../ViewerToolbar/IconSize";

const AdjustmentBar = ({
  project,
  caseInfo,
  slide,
  currentViewer,
  annotations,
  goToHomeHandler,
  changeCaseHandler,
  showSidebar,
  sidebar,
}) => {
  const [ifScreenlessthan1536px] = useMediaQuery("(max-width:1660px)");

  const handleSidebar = () => {
    showSidebar();
  };

  return (
    <Flex
      className="adjustmentbar"
      alignItems="center"
      height={ifScreenlessthan1536px ? "46px" : "56px"}
      bgColor="#F8F8F5"
      fontFamily="fira sans"
      fontSize={ifScreenlessthan1536px ? "14px" : "16px"}
      fontWeight="500"
    >
      <Flex alignItems="center" ml="18px" mr="20px" minW="150px">
        <IconButton
          icon={<GrHomeRounded size={18} />}
          backgroundColor="#F8F8F5"
          _hover={{ bg: "#F8F8F5" }}
          onClick={goToHomeHandler}
          mr="7px"
        />
        <ToolbarButton
          onClick={handleSidebar}
          backgroundColor={sidebar ? "#E4E5E8" : ""}
          outline={sidebar ? "0.5px solid rgba(0, 21, 63, 1)" : ""}
          icon={<BsGrid1X2 size={IconSize()} color="#151C25" />}
          label="Sidebar"
        />
        <Text color="#151C25" ml="12px" fontSize="14px" fontFamily="inter">
          {caseInfo?.caseName}
        </Text>
      </Flex>
      <ChangeCase
        project={project}
        caseInfo={caseInfo}
        slide={slide}
        changeCaseHandler={changeCaseHandler}
      />
      <Move annotations={annotations} viewerId={currentViewer} />
      <ActionTools viewerId={currentViewer} />
      <ScreenTools viewerId={currentViewer} />
    </Flex>
  );
};

export default memo(AdjustmentBar);
