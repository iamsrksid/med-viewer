import { createSlice } from "@reduxjs/toolkit";
import { brandColors } from "../styles/brandPalette";
import _ from "lodash";

export const getLocalUserCanvases = () => {
  const userCanvases = window.localStorage.getItem("userCanvases");
  if (!userCanvases) {
    window.localStorage.setItem("userCanvases", JSON.stringify({}));
    return {};
  } else {
    return JSON.parse(userCanvases);
  }
};

const defaultViewerWindow = {
  activeUserCanvas: "",
  fabricOverlay: null,
  userCanvases: getLocalUserCanvases(),
  viewer: null,
  activityFeed: [],
  zoomValue: 0,
  tile: "",
};

const fabricOverlaySlice = createSlice({
  name: "fabricOverlay",
  initialState: {
    activeTool: "Move",
    color: brandColors[0],
    viewerWindow: {},
    username: "",
    roomName: "",
  },
  reducers: {
    updateActiveUserCanvas: (state, action) => {
      state.viewerWindow[action.payload.id].activeUserCanvas = action.payload;
    },
    updateColor: (state, action) => {
      state.color = action.payload;
    },

    updateTool: (state, action) => {
      state.activeTool = action.payload.tool;
    },
    updateOverlay: (state, action) => {
      state.viewerWindow[action.payload.id].fabricOverlay =
        action.payload.fabricOverlay;
      state.viewerWindow[action.payload.id].viewer = action.payload.viewer;
    },
    updateUserCanvases: (state, action) => {
      state.viewerWindow[action.payload.id].activeUserCanvas =
        action.payload.activeUserCanvas;
      state.viewerWindow[action.payload.id].userCanvases =
        action.payload.userCanvases;
    },
    updateSocketDetails: (state, action) => {
      state.username = action.payload.username;
      state.roomName = action.payload.roomName;
    },
    updateZoomValue: (state, action) => {
      if (!_.has(state.viewerWindow, action.payload.id)) return;
      state.viewerWindow[action.payload.id].zoomValue =
        action.payload.value > 40 ? 40 : action.payload.value;
    },
    updateActivityFeed: (state, action) => {
      state.viewerWindow[action.payload.id].activityFeed = action.payload.feed;
    },
    addViewerWindow: (state, action) => {
      action.payload.map((window) => {
        state.viewerWindow[window.id] = {
          ...defaultViewerWindow,
          tile: window.tile,
        };
      });
    },
    removeViewerWindow: (state, action) => {
      delete state.viewerWindow[action.payload.id];
    },
    resetViewer: (state, action) => {
      state.viewerWindow[action.payload.id].activityFeed = [];
      state.viewerWindow[action.payload.id].zoomValue = 0;
    },
    resetFabricOverlay: (state, action) => {
      state.viewerWindow = {};
      state.activeTool = "Move";
      state.color = brandColors[0];
    },
  },
});

export const {
  updateActiveUserCanvas,
  updateColor,
  updateOverlay,
  updateSocketDetails,
  updateTool,
  updateUserCanvases,
  addViewerWindow,
  removeViewerWindow,
  updateZoomValue,
  updateActivityFeed,
  resetViewer,
  resetFabricOverlay,
} = fabricOverlaySlice.actions;

export default fabricOverlaySlice.reducer;
