import { createSlice } from "@reduxjs/toolkit";

const drawerSlice = createSlice({
  name: "drawer",
  initialState: {
    activeDrawerTool: "",
  },
  reducers: {
    updateActiveDrawerTool: (state, action) => {
      state.activeDrawerTool = action.payload.tool;
    },
  },
});

export const { updateActiveDrawerTool } = drawerSlice.actions;

export default drawerSlice.reducer;
