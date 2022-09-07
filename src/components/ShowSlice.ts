import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import BoxStruct from "../data/BoxStruct";
import { githubComponentData } from "../data/intData";

export interface ShowState {
  BoxArray: Array<BoxStruct>;
  dragObejct: BoxStruct;
  ComponentArray: Array<BoxStruct>;
}

const initialState: ShowState = {
  BoxArray: new Array<BoxStruct>(),
  dragObejct: { title: "null" },
  ComponentArray: githubComponentData,
};

export const counterSlice = createSlice({
  name: "show",
  initialState,
  reducers: {
    move: (state) => {
      state.BoxArray.push(state.dragObejct);
    },
    dragObject: (state, action: PayloadAction<BoxStruct>) => {
      state.dragObejct = action.payload;
    },
    dropObject: (state, action: PayloadAction<BoxStruct>) => {
      state.dragObejct = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { move, dragObject, dropObject } = counterSlice.actions;

export default counterSlice.reducer;
