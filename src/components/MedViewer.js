import React, { useState, useEffect, useReducer } from "react";
import LayoutApp from "./Layout/app";
import Loading from "./Loading/loading";
import _ from "lodash";
import { StoreProvider } from "../state/store";
import {
  addViewerWindow,
  resetFabricOverlay,
} from "../state/actions/fabricOverlayActions";
import fabricOverlayReducer from "../state/reducers/fabricOverlayReducer";
import { brandColors } from "../styles/brandPalette";

const MedViewer = ({
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
  const [isReady, setIsReady] = useState(false);
  const [fabricOverlayState, setFabricOverlayState] = useReducer(
    fabricOverlayReducer,
    {
      activeTool: "Move",
      color: brandColors[0],
      viewerWindow: {},
      username: "",
      roomName: "",
    }
  );

  console.log({
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
  });
  console.log(fabricOverlayState);

  useEffect(() => {
    if (
      !fabricOverlayState?.viewerWindow ||
      _.keys(fabricOverlayState?.viewerWindow).length !== 0
    )
      return;
    const viewerWindows = [];
    projectCase?.slides.map((slide) => {
      viewerWindows.push({ id: slide._id, tile: slide.awsImageBucketUrl });
    });
    setFabricOverlayState(addViewerWindow(viewerWindows));
    setIsReady(true);
  }, [fabricOverlayState, projectCase]);

  useEffect(() => {
    return () => {
      setFabricOverlayState(resetFabricOverlay());
    };
  }, []);

  return isReady &&
    _.keys(fabricOverlayState?.viewerWindow).length ===
      projectCase?.slides.length ? (
    <StoreProvider value={{ fabricOverlayState, setFabricOverlayState }}>
      <LayoutApp
        userInfo={userInfo}
        projectCase={projectCase}
        tile={tile}
        viewerIds={viewerIds}
        questionnaire={questionnaire}
        userIdToQuery={userIdToQuery}
        project={project}
        response={response}
        finalSubmitHandler={finalSubmitHandler}
        goToHomeHandler={goToHomeHandler}
        changeCaseHandler={changeCaseHandler}
        saveAnnotationsHandler={saveAnnotationsHandler}
        loadAnnotationsHandler={loadAnnotationsHandler}
      />
    </StoreProvider>
  ) : (
    <Loading />
  );
};

export default MedViewer;
