import React from "react";
import { useSelector } from "react-redux";
import { SimpleGrid } from "@chakra-ui/react";
import ViewerContainer from "./container";

const ViewerFactory = () => {
  const { viewerIds } = useSelector((state) => state.viewerState);
  return (
    <>
      {viewerIds.map((viewerId) => (
        <ViewerContainer key={viewerId} viewerId={viewerId} />
      ))}
    </>
  );
};

export default ViewerFactory;
