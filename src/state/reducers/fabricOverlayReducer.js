import _ from "lodash";
import { brandColors } from "../../styles/brandPalette";

export const getLocalUserCanvases = () => {
  const userCanvases = window.localStorage.getItem("userCanvases");
  if (!userCanvases) {
    window.localStorage.setItem("userCanvases", JSON.stringify({}));
    return {};
  }
  return JSON.parse(userCanvases);
};

const defaultViewerWindow = {
  activeUserCanvas: "",
  fabricOverlay: null,
  userCanvases: getLocalUserCanvases(),
  viewer: null,
  activityFeed: [],
  tile: "",
};

const fabricOverlayReducer = (state, action) => {
  switch (action.type) {
    case "updateColor":
      return { ...state, color: action.payload };

    case "updateTool":
      return { ...state, activeTool: action.payload.tool };

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

    case "addViewerWindow": {
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
    }

    case "removeViewerWindow": {
      const newViewerWindow = {};
      _.keys(state.viewerWindow).forEach((id) => {
        if (id !== action.payload.id)
          newViewerWindow[id] = state.viewerWindow[id];
      });
      return { ...state, ...newViewerWindow };
    }

    case "resetFabricOverlay":
      return {
        ...state,
        viewerWindow: {},
        activeTool: "Move",
        color: brandColors[0],
      };

    default:
      console.error("unknown type");
      return null;
  }
};

export default fabricOverlayReducer;
