import { widths } from "../components/Draw/width";
import { createSlice } from "@reduxjs/toolkit";

const drawSlice = createSlice({
  name: "draw",
  initialState: {
    width: widths[0],
    isActive: false,
  },
  reducers: {
    updateWidth: (state, action) => {
      state.width = action.payload;
    },
    updateActive: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

export const { updateWidth, updateActive } = drawSlice.actions;

export default drawSlice.reducer;
