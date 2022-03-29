import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    activityFeed: [],
    activeFeed: "viewer1",
  },
  reducers: {
    updateActivityFeed: (state, action) => {
      state.activityFeed = action.payload;
    },
    updateActiveFeed: (state, action) => {
      state.activeFeed = action.payload;
    },
  },
});

export const { updateActivityFeed, updateActiveFeed } = feedSlice.actions;

export default feedSlice.reducer;
