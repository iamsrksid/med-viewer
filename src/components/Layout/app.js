import React, { useState } from "react";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import PropTypes from "prop-types";
import AdjustmentBar from "../AdjustmentBar/adjustmentBar";
import LayoutAppBody from "./body";
import LayoutInnerBody from "./innerbody";
import LayoutOuterBody from "./outerbody";
import LayoutAppSidebar from "./sidebar";
import ViewerFactory from "../Viewer/viewerFactory";
import ViewerImport from "./viewerImport";
import Navigator from "../Navigator/navigator";
import ActivityFeed from "../Feed/activityFeed";

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
  morphometry,
  uploadPatch,
}) => {
  // const { handleEvent } = useKeyboardEvents();

  const [sidebar, setSidebar] = useState(false);
  const [isNavigatorActive, setIsNavigatorActive] = useState(false);
  const [isMultiview, setIsMultiview] = useState(false);
  const [navbar, setNavbar] = useState(true);
  const [totalCells, setTotalCells] = useState(0);
  const [ifBiggerScreen] = useMediaQuery("(min-width:1920px)");
  const [currentViewer, setCurrentViewer] = useState(viewerIds?.[0]?._id);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [viewPortToImagex1, setViewPortToImagex1] = useState(0);
  const [viewPortToImagex2, setViewPortToImagex2] = useState(0);
  const [viewPortToImagey1, setViewPortToImagey1] = useState(0);
  const [viewPortToImagey2, setViewPortToImagey2] = useState(0);
  const [showAnnotationsBar, setShowAnnotationsBar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const showNavbar = () => {
    setNavbar(!navbar);
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
          goToHomeHandler={goToHomeHandler}
          showSidebar={() => showSidebar()}
          sidebar={sidebar}
          morphometry={morphometry}
          uploadPatch={uploadPatch}
          setTotalCells={setTotalCells}
          isNavigatorActive={isNavigatorActive}
          setIsNavigatorActive={setIsNavigatorActive}
          isMultiview={isMultiview}
          setIsMultiview={setIsMultiview}
          onSaveAnnotation={onSaveAnnotation}
          onDeleteAnnotation={onDeleteAnnotation}
          setStartX={setStartX}
          setStartY={setStartY}
          setWindowWidth={setWindowWidth}
          setWindowHeight={setWindowHeight}
          setShowAnnotationsBar={setShowAnnotationsBar}
          showAnnotationsBar={showAnnotationsBar}
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
          {showAnnotationsBar ? (
            <ActivityFeed
              viewerId={currentViewer}
              userInfo={userInfo}
              handlePopup={setShowAnnotationsBar}
              totalCells={totalCells}
              popup={showAnnotationsBar}
              onUpdateAnnotation={onUpdateAnnotation}
            />
          ) : null}
          <LayoutAppBody>
            <ViewerFactory
              viewerIds={viewerIds}
              slideType={project?.slideType}
              caseInfo={caseInfo}
              userInfo={userInfo}
              onLoadAnnotations={onLoadAnnotations}
              setCurrentViewer={setCurrentViewer}
              startX={startX}
              startY={startY}
              windowWidth={windowWidth}
              windowHeight={windowHeight}
              setViewPortToImagex1={setViewPortToImagex1}
              setViewPortToImagey1={setViewPortToImagey1}
              setViewPortToImagex2={setViewPortToImagex2}
              setViewPortToImagey2={setViewPortToImagey2}
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
