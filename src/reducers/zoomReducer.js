import { createSlice } from "@reduxjs/toolkit";

const zoomSlice = createSlice({
  name: "zoom",
  initialState: {
    zoomValue: 0,
  },
  reducers: {
    updateZoomValue: (state, action) => {
      state.zoomValue = action.payload > 40 ? 40 : action.payload;
    },
  },
});

export const { updateZoomValue } = zoomSlice.actions;

export default zoomSlice.reducer;
