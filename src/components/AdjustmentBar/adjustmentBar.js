import React, { memo } from "react";
import { Flex, Text, IconButton, useMediaQuery } from "@chakra-ui/react";
import { BsGrid1X2 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import Move from "../Move/move";
import ChangeCase from "../Case/changeCase";
import ActionTools from "../Toolbar/ActionTools";
import ScreenTools from "../Toolbar/ScreenTools";
import "../../styles/viewer.css";
import ToolbarButton from "../ViewerToolbar/button";
import IconSize from "../ViewerToolbar/IconSize";
import SlideNavigatorIcon from "../Navigator/slideNavigatorIcon";
import ChangeSlide from "../Case/changeSlide";
import { useFabricOverlayState } from "../../state/store";

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
  morphometry,
  uploadPatch,
  isNavigatorActive,
  setIsNavigatorActive,
  isMultiview,
  setIsMultiview,
  saveAnnotationsHandler,
  setStartX,
  setStartY,
  setWindowWidth,
  setWindowHeight,
}) => {
  const [ifScreenlessthan1536px] = useMediaQuery("(max-width:1660px)");
  const { fabricOverlayState } = useFabricOverlayState();
  const { viewerWindow } = fabricOverlayState;
  const { tile } = viewerWindow[currentViewer];

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
      zIndex={2}
    >
      <Flex alignItems="center" ml="18px" mr="20px" minW="150px">
        <ToolbarButton
          onClick={handleSidebar}
          backgroundColor={sidebar ? "#E4E5E8" : ""}
          outline={sidebar ? "0.5px solid rgba(0, 21, 63, 1)" : ""}
          icon={<GiHamburgerMenu size={IconSize()} color="#151C25" />}
          label="Sidebar"
        />
        <Text color="#151C25" ml="12px" fontSize="14px" fontFamily="inter">
          {caseInfo?.caseName}
        </Text>
      </Flex>
      <Flex
        borderLeft="2px solid #E4E5E8"
        borderRight="2px solid #E4E5E8"
        px="18px"
        align="center"
      >
        {project ? (
          <ChangeCase
            project={project}
            caseInfo={caseInfo}
            slide={slide}
            changeCaseHandler={changeCaseHandler}
          />
        ) : (
          Object.keys(viewerWindow).length === 1 && (
            <ChangeSlide
              caseInfo={caseInfo}
              viewerId={currentViewer}
              slideUrl={tile}
            />
          )
        )}
        <ToolbarButton
          icon={<SlideNavigatorIcon isNavigatorActive={isNavigatorActive} />}
          label="Slide Navigation"
          ml="8px"
          pl={0}
          pt={0}
          onClick={() => {
            setIsMultiview(false);
            setIsNavigatorActive((state) => !state);
          }}
        />
      </Flex>
      <Move
        annotations={annotations}
        viewerId={currentViewer}
        isMultiview={isMultiview}
        setIsMultiview={setIsMultiview}
        setIsNavigatorActive={setIsNavigatorActive}
        saveAnnotationsHandler={saveAnnotationsHandler}
      />
      <ActionTools
        viewerId={currentViewer}
        saveAnnotationsHandler={saveAnnotationsHandler}
      />
      <ScreenTools
        viewerId={currentViewer}
        morphometry={morphometry}
        uploadPatch={uploadPatch}
        setStartX={setStartX}
        setStartY={setStartY}
        setWindowWidth={setWindowWidth}
        setWindowHeight={setWindowHeight}
      />
    </Flex>
  );
};

export default memo(AdjustmentBar);
