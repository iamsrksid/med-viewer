import { createSlice } from "@reduxjs/toolkit";

const shapeSlice = createSlice({
  name: "shape",
  initialState: {
    activeShape: null, // active shape in Options Panel
    color: null,
    currentDragShape: null,
    isActive: false, // Is the Shape tool itself active
    isMouseDown: false,
    origX: null, // starting X point for drag creating an object
    origY: null,
  },
  reducers: {
    updateActive: (state, action) => {
      state.activeShape = action.payload.activeShape;
      state.isActive = action.payload.isActive;
    },
    updateShapeColor: (state, action) => {
      state.color = action.payload.color;
    },
    updateShape: (state, action) => {
      state = action.payload;
    },
    updateActiveShape: (state, action) => {
      state.activeShape = action.payload.activeShape;
    },
  },
});

export const {
  updateActive,
  updateShapeColor,
  updateShape,
  updateActiveShape,
} = shapeSlice.actions;

export default shapeSlice.reducer;
