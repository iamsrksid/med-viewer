import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Viewer from "./viewer";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const ViewerContainer = ({ viewerId }) => {
  const location = useLocation();

  //get fabricOverlay state from redux store
  const { fabricOverlay, userCanvases, tile } = useSelector(
    (state) => state.fabricOverlayState.viewerWindow[viewerId]
  );
  const [tileSource, setTileSource] = useState({});

  const newCanvasTitle =
    location.state && location.state.canvasTitle
      ? location.state.canvasTitle
      : "";

  useEffect(() => {
    if (!fabricOverlay) return;
    fabricOverlay.fabricCanvas().hoverCursor = "move";
  }, [fabricOverlay]);

  /**
   * Handle changes to selected LOC work.
   * User selected a Saved Annotation from their list, so update the Fabric canvas
   */
  useEffect(() => {
    if (!fabricOverlay || !location.state) return;
    fabricOverlay
      .fabricCanvas()
      .loadFromJSON(userCanvases[location.state.canvasTitle]["fabricCanvas"]);
  }, [newCanvasTitle]);

  // Handle no match
  if (tileSource == {}) {
    return (
      <Box w="100%" p={8}>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Image loading error!</AlertTitle>
          <AlertDescription>No image with that id exists.</AlertDescription>
        </Alert>
      </Box>
    );
  }

  // Success
  // return <Viewer tile={tileSource} />;

  return <Viewer viewerId={viewerId} tile={tile} />;
};

export default ViewerContainer;
