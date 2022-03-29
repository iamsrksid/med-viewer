import { createSlice } from "@reduxjs/toolkit";

const colorSlice = createSlice({
  name: "color",
  initialState: {
    isObjectSelected: false,
    isActiveTool: false,
  },
  reducers: {
    updateIsActiveTool: (state, action) => {
      state.isActiveTool = action.payload.isActiveTool;
    },
    updateIsObjectSelected: (state, action) => {
      state.isObjectSelected = action.payload.isObjectSelected;
    },
  },
});

export const {
  updateIsActiveTool,
  updateIsObjectSelected,
} = colorSlice.actions;

export default colorSlice.reducer;
