import React, { useState } from "react";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import PropTypes from "prop-types";
import AdjustmentBar from "../AdjustmentBar/adjustmentBar";
import LayoutAppBody from "./body";
import LayoutInnerBody from "./innerbody";
import LayoutOuterBody from "./outerbody";
import LayoutAppSidebar from "./sidebar";
import ViewerFactory from "../Viewer/viewerFactory";
import Navigator from "../Navigator/navigator";
import SlideFeed from "../Feed/feed";

const LayoutApp = ({
  userInfo,
  caseInfo,
  viewerIds,
  questionnaire,
  report,
  annotations,
  userIdToQuery,
  project,
  response,
  finalSubmitHandler,
  changeCaseHandler,
  goToHomeHandler,
  onSaveAnnotation,
  onUpdateAnnotation,
  onDeleteAnnotation,
  onLoadAnnotations,
  onVhutAnalysis,
  onVhutViewportAnalysis,
  onGetVhutAnalysis,
  onMessageListener,
  saveReport,
  mediaUpload,
  slideInfo,
}) => {
  // const { handleEvent } = useKeyboardEvents();

  const [sidebar, setSidebar] = useState(false);
  const [isNavigatorActive, setIsNavigatorActive] = useState(false);
  const [isMultiview, setIsMultiview] = useState(false);
  const [totalCells, setTotalCells] = useState(0);
  const [ifBiggerScreen] = useMediaQuery("(min-width:1920px)");
  const [currentViewer, setCurrentViewer] = useState(viewerIds?.[0]?._id);
  const [showAnnotationsBar, setShowAnnotationsBar] = useState(false);
  const [showFeedBar, setShowFeedBar] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [feedTab, setFeedBar] = useState(0);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleFeedBar = () => {
    setShowFeedBar(true);
    setFeedBar(0);
  };
  const handleFeedBarClose = () => {
    setShowFeedBar(false);
  };
  const handleReport = () => {
    setShowReport(true);
  };
  const handleAnnotationBar = () => {
    setShowAnnotationsBar(!showAnnotationsBar);
    setShowFeedBar(true);

    setFeedBar(1);
  };
  return (
    <Flex
      h={ifBiggerScreen ? "calc(100vh - 5.5vh)" : "calc(100vh - 44px)"}
      direction="column"
    >
      <LayoutOuterBody>
        <AdjustmentBar
          userInfo={userInfo}
          project={project}
          caseInfo={caseInfo}
          slide={viewerIds?.[0]}
          annotations={annotations}
          changeCaseHandler={changeCaseHandler}
          currentViewer={currentViewer}
          showSidebar={() => showSidebar()}
          sidebar={sidebar}
          setTotalCells={setTotalCells}
          isNavigatorActive={isNavigatorActive}
          setIsNavigatorActive={setIsNavigatorActive}
          isMultiview={isMultiview}
          setIsMultiview={setIsMultiview}
          onSaveAnnotation={onSaveAnnotation}
          onDeleteAnnotation={onDeleteAnnotation}
          handleAnnotationBar={handleAnnotationBar}
          onVhutViewportAnalysis={onVhutViewportAnalysis}
          saveReport={saveReport}
          mediaUpload={mediaUpload}
          slideInfo={slideInfo}
          handleFeedBar={handleFeedBar}
          handleReport={handleReport}
          showReport={showReport}
          setShowReport={setShowReport}
        />

        {isNavigatorActive && (
          <Navigator
            caseInfo={caseInfo}
            viewerId={currentViewer}
            isActive={isNavigatorActive}
            setIsNavigatorActive={setIsNavigatorActive}
          />
        )}
        {isMultiview && (
          <Navigator
            caseInfo={caseInfo}
            viewerId={currentViewer}
            isActive={isMultiview}
            isMultiview={isMultiview}
            setIsMultiview={setIsMultiview}
          />
        )}
        <LayoutInnerBody>
          {sidebar ? (
            <LayoutAppSidebar
              project={project}
              caseInfo={caseInfo}
              questionnaire={questionnaire}
              annotations={annotations}
              report={report}
              viewerIds={viewerIds}
              userIdToQuery={userIdToQuery}
              userInfo={userInfo}
              finalSubmitHandler={finalSubmitHandler}
              response={response}
              currentViewer={currentViewer}
              setSidebar={setSidebar}
            />
          ) : null}
          {/* {showAnnotationsBar && !showFeedBar && !showReport ? (
            <ActivityFeed
              viewerId={currentViewer}
              userInfo={userInfo}
              handlePopup={setShowAnnotationsBar}
              totalCells={totalCells}
              popup={showAnnotationsBar}
              onUpdateAnnotation={onUpdateAnnotation}
            />
          ) : null} */}
          {showFeedBar ? (
            <SlideFeed
              viewerId={currentViewer}
              showFeedBar={showFeedBar}
              handleFeedBarClose={handleFeedBarClose}
              showReport={showReport}
              feedTab={feedTab}
            />
          ) : null}
          <LayoutAppBody>
            <ViewerFactory
              viewerIds={viewerIds}
              slideType={project?.slideType}
              caseInfo={caseInfo}
              userInfo={userInfo}
              onLoadAnnotations={onLoadAnnotations}
              onSaveAnnotation={onSaveAnnotation}
              onDeleteAnnotation={onDeleteAnnotation}
              onUpdateAnnotation={onUpdateAnnotation}
              setCurrentViewer={setCurrentViewer}
              onVhutAnalysis={onVhutAnalysis}
              onGetVhutAnalysis={onGetVhutAnalysis}
              onMessageListener={onMessageListener}
            />
          </LayoutAppBody>

          {/* <ViewerImport /> */}
        </LayoutInnerBody>
      </LayoutOuterBody>
    </Flex>
  );
};

LayoutApp.propTypes = {
  finalSubmitHandler: PropTypes.func,
};

export default LayoutApp;
