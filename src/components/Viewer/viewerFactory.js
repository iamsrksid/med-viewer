import React from "react";
import ViewerContainer from "./container";

const ViewerFactory = ({
  viewerIds,
  slideType,
  startX,
  startY,
  windowWidth,
  windowHeight,
  setViewPortToImagex1,
  setViewPortToImagey1,
  setViewPortToImagex2,
  setViewPortToImagey2,
}) => {
  return (
    <>
      {viewerIds.map((viewer) => (
        <ViewerContainer
          key={viewer?._id}
          viewerId={viewer?._id}
          slideName={viewer?.slideName}
          slideType={slideType}
          startX={startX}
          startY={startY}
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          setViewPortToImagex1={setViewPortToImagex1}
          setViewPortToImagey1={setViewPortToImagey1}
          setViewPortToImagex2={setViewPortToImagex2}
          setViewPortToImagey2={setViewPortToImagey2}
        />
      ))}
    </>
  );
};

export default ViewerFactory;
