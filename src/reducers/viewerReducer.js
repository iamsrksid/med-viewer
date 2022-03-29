import { createSlice } from "@reduxjs/toolkit";

const viewerSlice = createSlice({
  name: "viewer",
  initialState: {
    viewerIds: [],
    currentViewer: "",
    isMultiView: false,
  },
  reducers: {
    addViewer: (state, action) => {
      action.payload.map((id) => {
        if (!state.currentViewer) state.currentViewer = id;
        state.viewerIds.push(id);
      });
    },
    removeViewer: (state, action) => {
      state.viewerIds = state.viewerIds.filter(
        (viewerId) => viewerId !== action.payload
      );
    },
    updateCurrentViewer: (state, action) => {
      state.currentViewer = action.payload;
    },
    toggleMultiView: (state) => {
      state.isMultiView = !state.isMultiView;
    },
    resetViewerIds: (state) => {
      state.viewerIds = [];
      state.currentViewer = "";
    },
  },
});

export const {
  addViewer,
  removeViewer,
  updateCurrentViewer,
  toggleMultiView,
  resetViewerIds,
} = viewerSlice.actions;

export default viewerSlice.reducer;
