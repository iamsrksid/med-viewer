import React, { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import ViewerContainer from "./container";
import { useFabricOverlayState } from "../../state/store";
import ViewerHeader from "./viewerHeader";

const ViewerFactory = ({
  viewerIds,
  slideType,
  caseInfo,
  userInfo,
  setCurrentViewer,
  onLoadAnnotations,
  onSaveAnnotation,
  onVhutAnalysis,
  onGetVhutAnalysis,
  onMessageListener,
  startX,
  startY,
  windowWidth,
  windowHeight,
  setViewPortToImagex1,
  setViewPortToImagey1,
  setViewPortToImagex2,
  setViewPortToImagey2,
}) => {
  const { fabricOverlayState } = useFabricOverlayState();
  const { viewerWindow, sync } = fabricOverlayState;

  useEffect(() => {
    if (!sync) return null;

    let isLeading1 = false;
    let isLeading2 = false;

    const vKeys = Object.keys(viewerWindow);
    const { viewer: viewer1 } = viewerWindow[vKeys[0]];
    const { viewer: viewer2 } = viewerWindow[vKeys[1]];

    const handler1 = () => {
      if (isLeading2) return;

      isLeading1 = true;
      viewer2.viewport.zoomTo(viewer1.viewport.getZoom());
      viewer2.viewport.panTo(viewer1.viewport.getCenter());
      isLeading1 = false;
    };

    const handler2 = () => {
      if (isLeading1) return;

      isLeading2 = true;
      viewer1.viewport.zoomTo(viewer2.viewport.getZoom());
      viewer1.viewport.panTo(viewer2.viewport.getCenter());
      isLeading2 = false;
    };

    viewer1.addHandler("zoom", handler1);
    viewer2.addHandler("zoom", handler2);
    viewer1.addHandler("pan", handler1);
    viewer2.addHandler("pan", handler2);

    return () => {
      viewer1.removeHandler("zoom", handler1);
      viewer2.removeHandler("zoom", handler2);
      viewer1.removeHandler("pan", handler1);
      viewer2.removeHandler("pan", handler2);
    };
  }, [sync]);

  return (
    <>
      {Object.keys(viewerWindow).map((viewer) => (
        <Flex w="100%" h="100%" direction="column" key={viewer}>
          {Object.keys(viewerWindow).length > 1 ? (
            <ViewerHeader
              caseInfo={caseInfo}
              viewerId={viewer}
              slideUrl={viewerWindow[viewer].tile}
              setCurrentViewer={setCurrentViewer}
            />
          ) : null}
          <ViewerContainer
            viewerId={viewer}
            slideName={viewerWindow[viewer]?.slideName}
            slideType={slideType}
            userInfo={userInfo}
            onLoadAnnotations={onLoadAnnotations}
            onSaveAnnotation={onSaveAnnotation}
            onVhutAnalysis={onVhutAnalysis}
            onGetVhutAnalysis={onGetVhutAnalysis}
            onMessageListener={onMessageListener}
            startX={startX}
            startY={startY}
            windowWidth={windowWidth}
            windowHeight={windowHeight}
            setViewPortToImagex1={setViewPortToImagex1}
            setViewPortToImagey1={setViewPortToImagey1}
            setViewPortToImagex2={setViewPortToImagex2}
            setViewPortToImagey2={setViewPortToImagey2}
          />
        </Flex>
      ))}
    </>
  );
};

export default ViewerFactory;
