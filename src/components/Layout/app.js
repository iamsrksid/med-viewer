import React, { useState } from "react";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import AdjustmentBar from "../AdjustmentBar/adjustmentBar";
import LayoutAppBody from "./body";
import LayoutInnerBody from "./innerbody";
import LayoutOuterBody from "./outerbody";
import LayoutAppSidebar from "./sidebar";
import Div100vh from "react-div-100vh";
import ViewerFactory from "../Viewer/viewerFactory";

const LayoutApp = ({
  userInfo,
  projectCase,
  tile,
  viewerIds,
  questionnaire,
  userIdToQuery,
  project,
  response,
  finalSubmitHandler,
  changeCaseHandler,
  goToHomeHandler,
  saveAnnotationsHandler,
  loadAnnotationsHandler,
}) => {
  // const { handleEvent } = useKeyboardEvents();

  const [sidebar, setSidebar] = useState(true);
  const [navbar, setNavbar] = useState(true);
  const [ifBiggerScreen] = useMediaQuery("(min-width:1920px)");

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
          caseId={projectCase?._id}
          changeCaseHandler={changeCaseHandler}
          goToHomeHandler={goToHomeHandler}
          showSidebar={() => showSidebar()}
          sidebar={sidebar}
        />
        <LayoutInnerBody>
          {sidebar ? (
            <LayoutAppSidebar
              project={project}
              questionnaire={questionnaire}
              viewerIds={viewerIds}
              userIdToQuery={userIdToQuery}
              userInfo={userInfo}
              finalSubmitHandler={finalSubmitHandler}
              response={response}
              saveAnnotationsHandler={saveAnnotationsHandler}
              loadAnnotationsHandler={loadAnnotationsHandler}
            />
          ) : null}
          <LayoutAppBody>
            <ViewerFactory />
          </LayoutAppBody>
        </LayoutInnerBody>
      </LayoutOuterBody>
    </Flex>
  );
};

export default LayoutApp;
