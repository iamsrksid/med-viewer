export const updateColor = (payload) => ({
  type: "updateColor",
  payload: payload,
});

export const updateTool = (payload) => ({
  type: "updateTool",
  payload: payload,
});

export const updateOverlay = (payload) => ({
  type: "updateOverlay",
  payload: payload,
});

export const updateUserCanvases = (payload) => ({
  type: "updateUserCanvases",
  payload: payload,
});

export const updateZoomValue = (payload) => ({
  type: "updateZoomValue",
  payload: payload,
});

export const updateActivityFeed = (payload) => ({
  type: "updateActivityFeed",
  payload: payload,
});

export const addViewerWindow = (payload) => ({
  type: "addViewerWindow",
  payload: payload,
});

export const removeViewerWindow = (payload) => ({
  type: "removeViewerWindow",
  payload: payload,
});

export const resetFabricOverlay = (payload) => ({
  type: "resetFabricOverlay",
  payload: payload,
});
