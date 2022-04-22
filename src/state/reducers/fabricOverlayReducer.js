import { brandColors } from "../../styles/brandPalette";
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

const fabricOverlayReducer = (state, action) => {
  switch (action.type) {
    case "updateColor":
      return { ...state, color: action.payload };

    case "updateTool":
      return { ...state, activeTool: action.payload };

    case "updateOverlay":
      return {
        ...state,
        viewerWindow: {
          ...state.viewerWindow,
          [action.payload.id]: {
            ...state.viewerWindow[action.payload.id],
            fabricOverlay: action.payload.fabricOverlay,
            viewer: action.payload.viewer,
          },
        },
      };

    case "updateUserCanvases":
      return {
        ...state,
        viewerWindow: {
          ...state.viewerWindow,
          [action.payload.id]: {
            ...state.viewerWindow[action.payload.id],
            activeUserCanvas: action.payload.activeUserCanvas,
            userCanvases: action.payload.userCanvases,
          },
        },
      };

    case "updateZoomValue":
      const zoomValue = action.payload.value;
      return {
        ...state,
        viewerWindow: {
          ...state.viewerWindow,
          [action.payload.id]: {
            ...state.viewerWindow[action.payload.id],
            zoomValue: zoomValue > 40 ? 40 : zoomValue,
          },
        },
      };

    case "updateActivityFeed":
      return {
        ...state,
        viewerWindow: {
          ...state.viewerWindow,
          [action.payload.id]: {
            ...state.viewerWindow[action.payload.id],
            activityFeed: action.payload.feed,
          },
        },
      };

    case "addViewerWindow":
      const viewerWindow = {};
      action.payload.forEach((w) => {
        viewerWindow[w.id] = { ...defaultViewerWindow, tile: w.tile };
      });
      return {
        ...state,
        viewerWindow: {
          ...state.viewerWindow,
          ...viewerWindow,
        },
      };

    case "removeViewerWindow":
      let newViewerWindow = {};
      _.keys(state.viewerWindow).forEach((id) => {
        if (id !== action.payload.id)
          newViewerWindow[id] = state.viewerWindow[id];
      });
      return { ...state, ...newViewerWindow };

    case "resetFabricOverlay":
      return {
        ...state,
        viewerWindow: {},
        activeTool: "Move",
        color: brandColors[0],
      };
  }
};

export default fabricOverlayReducer;
