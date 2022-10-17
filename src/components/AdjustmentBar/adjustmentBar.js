import React, { memo } from "react";
import { Flex, Text, useMediaQuery } from "@chakra-ui/react";
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
import TooltipLabel from "./ToolTipLabel";

const AdjustmentBar = ({
  userInfo,
  project,
  caseInfo,
  slide,
  currentViewer,
  annotations,
  changeCaseHandler,
  showSidebar,
  sidebar,
  isNavigatorActive,
  setIsNavigatorActive,
  isMultiview,
  setIsMultiview,
  setTotalCells,
  onSaveAnnotation,
  onDeleteAnnotation,
  handleAnnotationBar,
  onVhutViewportAnalysis,
  saveReport,
  mediaUpload,
  slideInfo,
  handleFeedBar,
  handleReport,
  showReport,
  setShowReport,
  clinicalStudy,
  questions,
  responseHandler,
  questionnaireResponse,
}) => {
  const [ifWidthLessthan1920] = useMediaQuery("(max-width:1920px)");
  const { fabricOverlayState } = useFabricOverlayState();
  const { viewerWindow, isAnnotationLoading } = fabricOverlayState;
  const { tile } = viewerWindow[currentViewer];

  const handleSidebar = () => {
    showSidebar();
  };

  return (
    <Flex
      className="adjustmentbar"
      alignItems="center"
      height={ifWidthLessthan1920 ? "46px" : "5.185vh"}
      bgColor="#F8F8F5"
      fontFamily="fira sans"
      fontSize={ifWidthLessthan1920 ? "14px" : "16px"}
      fontWeight="500"
      zIndex={2}
    >
      <Flex alignItems="center" ml="18px" mr="20px" minW="150px">
        <ToolbarButton
          onClick={handleSidebar}
          backgroundColor={sidebar ? "#E4E5E8" : ""}
          outline={sidebar ? "0.5px solid rgba(0, 21, 63, 1)" : ""}
          icon={<GiHamburgerMenu size={IconSize()} color="#151C25" />}
          label={<TooltipLabel heading="Case Info" />}
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
          label={
            <TooltipLabel
              heading="Slide Navigation"
              paragraph="Navigate any slide in this case"
            />
          }
          ml="8px"
          pl={0}
          pt={0}
          isDisabled={isAnnotationLoading}
          isActive={isNavigatorActive}
          onClick={() => {
            setIsMultiview(false);
            setIsNavigatorActive((state) => !state);
          }}
        />
      </Flex>
      <Move
        userInfo={userInfo}
        sidebar={sidebar}
        annotations={annotations}
        viewerId={currentViewer}
        isMultiview={isMultiview}
        setIsMultiview={setIsMultiview}
        isNavigatorActive={isNavigatorActive}
        setIsNavigatorActive={setIsNavigatorActive}
        setTotalCells={setTotalCells}
        onSaveAnnotation={onSaveAnnotation}
        onDeleteAnnotation={onDeleteAnnotation}
        onVhutViewportAnalysis={onVhutViewportAnalysis}
      />
      <ActionTools viewerId={currentViewer} />
      <ScreenTools
        viewerId={currentViewer}
        handleAnnotationBar={handleAnnotationBar}
        caseInfo={caseInfo}
        saveReport={saveReport}
        mediaUpload={mediaUpload}
        slideInfo={slideInfo}
        handleFeedBar={handleFeedBar}
        handleReport={handleReport}
        showReport={showReport}
        setShowReport={setShowReport}
        userInfo={userInfo}
        clinicalStudy={clinicalStudy}
        questions={questions}
        responseHandler={responseHandler}
        questionnaireResponse={questionnaireResponse}
      />
    </Flex>
  );
};

export default memo(AdjustmentBar);
