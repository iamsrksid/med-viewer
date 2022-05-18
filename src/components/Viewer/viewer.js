import React, { useEffect, useState } from "react";
import { useOpenSeadragon, OpenSeadragon } from "use-open-seadragon";
import { fabric, initFabricJSOverlay } from "openseadragon-fabricjs-overlay";
import { isBrowser } from "react-device-detect";
import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
import ViewerControls from "./controls";
import { useFabricOverlayState } from "../../state/store";
import { updateOverlay } from "../../state/actions/fabricOverlayActions";

const minZoomLevel = isBrowser ? 0.4 : 0.8;

const osdOptions = {
  constrainDuringPan: !!isBrowser,
  debugMode: false,
  gestureSettingsMouse: {
    clickToZoom: true,
    flickEnabled: true,
    pinchToZoom: true,
    scrollToZoom: true,
  },
  gestureSettingsTouch: {
    clickToZoom: true,
    flickEnabled: true,
    pinchToZoom: true,
    scrollToZoom: true,
  },
  showNavigator: true,
  showNavigationControl: false,
  navigatorPosition: "BOTTOM_RIGHT",
  springStiffness: isBrowser ? 20 : 10,
  viewportMargin: {
    left: 100,
    top: 100,
    right: 100,
    bottom: 100,
  },
  visibilityRatio: isBrowser ? 1 : 0.5,
  zoomPerClick: 1.0,
  crossOriginPolicy: "Anonymous",
};

const Viewer = ({ viewerId, tile, slideName, slideType }) => {
  const { setFabricOverlayState } = useFabricOverlayState();
  const [viewer, setViewer] = useState(null);

  // Customize Fabric selection handles
  fabric.Object.prototype.set({
    borderColor: "#22a2f8",
    borderScaleFactor: 2, // selection stroke width
    cornerColor: "white",
    cornerSize: 10,
    transparentCorners: false,
    hasControls: true,
    evented: true,
  });

  useEffect(() => {
    viewer && viewer.destroy();
    // Initialize OpenSeadragon instance and set to viewer
    setViewer(
      OpenSeadragon({
        ...osdOptions,
        tileSources: tile,
        id: `viewer${viewerId}`,
      })
    );
    initFabricJSOverlay(OpenSeadragon, fabric);
    return () => {
      viewer && viewer.destroy();
    };
  }, []);

  useEffect(() => {
    if (!viewer) return;

    // Create the fabric.js overlay, and set it on a sharable context
    // viewer.open(tile.source);
    setFabricOverlayState(
      updateOverlay({
        id: viewerId,
        fabricOverlay: viewer.fabricjsOverlay({ scale: 1 }),
        viewer,
      })
    );
    return () => {
      setFabricOverlayState(
        updateOverlay({
          id: viewerId,
          fabricOverlay: null,
          viewer: null,
        })
      );
    };
  }, [viewer]);

  return (
    <Box id={`viewer${viewerId}`} position="relative" w="100%">
      {isBrowser && (
        <ViewerControls
          viewerId={viewerId}
          slideName={slideName}
          slideType={slideType}
        />
      )}
    </Box>
  );
};

Viewer.propTypes = {
  tile: PropTypes.string,
  viewerId: PropTypes.string,
};

export default Viewer;
