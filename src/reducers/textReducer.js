import { createSlice } from "@reduxjs/toolkit";
import { fonts } from "../components/Text/fontPicker";

const textSlice = createSlice({
  name: "text",
  initialState: {
    activeFont: fonts[0],
    color: null,
    isActive: false, // Is the main Type tool active
    isEditing: false,
    selectedCoords: { top: 0, left: 0 },
  },
  reducers: {
    updateColorActive: (state, action) => {
      state.color = action.payload.color;
      state.isActive = action.payload.isActive;
    },
    editing: (state, action) => {
      state = action.payload;
    },
    selectionCleared: (state, action) => {
      state = action.payload;
    },
    selected: (state, action) => {
      state = action.payload;
    },
    fontChange: (state, action) => {
      state.activeFont = action.payload.activeFont;
    },
  },
});

export const {
  updateColorActive,
  editing,
  selectionCleared,
  selected,
  fontChange,
} = textSlice.actions;

export default textSlice.reducer;
