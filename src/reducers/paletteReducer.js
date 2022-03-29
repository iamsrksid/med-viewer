import { createSlice } from "@reduxjs/toolkit";

const paletteSlice = createSlice({
  name: "palette",
  initialState: {
    isVisual: false,
    basicInfo: null,
  },
  reducers: {
    updateIsVisual: (state, action) => {
      state.isVisual = action.payload;
      state.basicInfo = null;
    },
    updateBasicInfo: (state, action) => {
      state.isVisual = true;
      state.basicInfo = action.payload;
    },
  },
});

export const { updateIsVisual, updateBasicInfo } = paletteSlice.actions;

export default paletteSlice.reducer;
