import { createSlice } from "@reduxjs/toolkit";

const shareSlice = createSlice({
  name: "share",
  initialState: {
    sharing: false,
  },
  reducers: {
    updateSharing: (state, action) => {
      state.sharing = action.payload;
    },
  },
});

export const { updateSharing } = shareSlice.actions;

export default shareSlice.reducer;
