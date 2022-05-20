import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
} from "@chakra-ui/react";
import Viewer from "./viewer";
import { useFabricOverlayState } from "../../state/store";

const ViewerContainer = ({ viewerId, slideName, slideType }) => {
  const location = useLocation();

  const { fabricOverlayState } = useFabricOverlayState();
  const { fabricOverlay, userCanvases, tile } =
    fabricOverlayState?.viewerWindow[viewerId];
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
      .loadFromJSON(userCanvases[location.state.canvasTitle].fabricCanvas);
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

  return (
    <Viewer
      viewerId={viewerId}
      tile={tile}
      slideName={slideName}
      slideType={slideType}
    />
  );
};

export default ViewerContainer;
