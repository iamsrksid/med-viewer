import React, { useEffect, useState } from "react";
import { useOpenSeadragon, OpenSeadragon } from "use-open-seadragon";
import { fabric, initFabricJSOverlay } from "openseadragon-fabricjs-overlay";
import { useDispatch, useSelector } from "react-redux";
import {
  updateOverlay,
  updateUserCanvases,
} from "../../reducers/fabricOverlayReducer";
import { isBrowser } from "react-device-detect";
import { Box } from "@chakra-ui/react";
import ViewerControls from "./controls";
import PropTypes from "prop-types";

const minZoomLevel = isBrowser ? 0.4 : 0.8;

const osdOptions = {
  constrainDuringPan: isBrowser ? true : false,
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

const Viewer = ({ viewerId, tile }) => {
  const dispatch = useDispatch();
  const { isMultiView } = useSelector((state) => state.viewerState);
  const [viewer, setViewer] = useState(null);

  // Customize Fabric selection handles
  fabric.Object.prototype.set({
    borderColor: "#22a2f8",
    borderScaleFactor: 2, // selection stroke width
    cornerColor: "white",
    cornerSize: 10,
    transparentCorners: false,
    hasControls: false,
    lockMovementX: true,
    lockMovementY: true,
    evented: true,
  });

  useEffect(() => {
    viewer && viewer.destroy();
    //Initialize OpenSeadragon instance and set to viewer
    setViewer(
      OpenSeadragon({
        ...osdOptions,
        tileSources: tile,
        id: "viewer" + viewerId,
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
    dispatch(
      updateOverlay({
        id: viewerId,
        fabricOverlay: viewer.fabricjsOverlay({ scale: 1 }),
        viewer: viewer,
      })
    );
    return () => {
      updateOverlay({
        id: viewerId,
        fabricOverlay: null,
        viewer: null,
      });
    };
  }, [dispatch, viewer]);

  return (
    <Box
      id={"viewer" + viewerId}
      border={isMultiView && viewerId === "viewer1" ? "2px solid #000" : "none"}
      position="relative"
      w="100%"
    >
      {isBrowser && <ViewerControls viewerId={viewerId} />}
    </Box>
  );
};

Viewer.propTypes = {
  tile: PropTypes.string,
  viewerId: PropTypes.string,
};

export default Viewer;
