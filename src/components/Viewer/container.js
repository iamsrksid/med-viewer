import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Flex,
  VStack,
} from "@chakra-ui/react";
import Viewer from "./viewer";
import { useFabricOverlayState } from "../../state/store";

const ViewerContainer = ({
  viewerId,
  slideName,
  slideType,
  userInfo,
  onLoadAnnotations,
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
  const location = useLocation();

  const { fabricOverlayState, setFabricOverlayState } = useFabricOverlayState();
  const { viewerWindow } = fabricOverlayState;
  const { fabricOverlay, userCanvases, tile } = viewerWindow[viewerId];
  const [tileSource, setTileSource] = useState({});

  const newCanvasTitle =
    location.state && location.state.canvasTitle
      ? location.state.canvasTitle
      : "";

  useEffect(() => {
    if (!fabricOverlay) return;
    const canvas = fabricOverlay.fabricCanvas();
    canvas.hoverCursor = "move";
    canvas.fireRightClick = true;
    canvas.stopContextMenu = true;
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
      onLoadAnnotations={onLoadAnnotations}
      userInfo={userInfo}
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
  );
};

export default ViewerContainer;
