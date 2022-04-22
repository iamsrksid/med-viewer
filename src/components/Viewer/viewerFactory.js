import React from "react";
import ViewerContainer from "./container";

const ViewerFactory = ({ viewerIds, slideType }) => {
  return (
    <>
      {viewerIds.map((viewer) => (
        <ViewerContainer
          key={viewer?._id}
          viewerId={viewer?._id}
          slideName={viewer?.slideName}
          slideType={slideType}
        />
      ))}
    </>
  );
};

export default ViewerFactory;
