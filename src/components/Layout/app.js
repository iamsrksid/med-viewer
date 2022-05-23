import React, { useState } from "react";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import Div100vh from "react-div-100vh";
import PropTypes from "prop-types";
import AdjustmentBar from "../AdjustmentBar/adjustmentBar";
import LayoutAppBody from "./body";
import LayoutInnerBody from "./innerbody";
import LayoutOuterBody from "./outerbody";
import LayoutAppSidebar from "./sidebar";
import ViewerFactory from "../Viewer/viewerFactory";
import ViewerImport from "./viewerImport";

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
  saveAnnotationsHandler,
  loadAnnotationsHandler,
  morphometry,
  uploadPatch,
}) => {
  // const { handleEvent } = useKeyboardEvents();

  const [sidebar, setSidebar] = useState(true);
  const [navbar, setNavbar] = useState(true);
  const [ifBiggerScreen] = useMediaQuery("(min-width:1920px)");
  const [currentViewer, setCurrentViewer] = useState(viewerIds?.[0]?._id);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const showNavbar = () => {
    setNavbar(!navbar);
  };

  return (
    <Flex as={Div100vh} h="100vh" direction="column">
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
        />
        <LayoutInnerBody>
          {sidebar ? (
            <LayoutAppSidebar
              project={project}
              questionnaire={questionnaire}
              annotations={annotations}
              report={report}
              viewerIds={viewerIds}
              userIdToQuery={userIdToQuery}
              userInfo={userInfo}
              finalSubmitHandler={finalSubmitHandler}
              response={response}
              currentViewer={currentViewer}
              saveAnnotationsHandler={saveAnnotationsHandler}
              loadAnnotationsHandler={loadAnnotationsHandler}
            />
          ) : null}
          <LayoutAppBody>
            <ViewerFactory
              viewerIds={viewerIds}
              slideType={project?.slideType}
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
