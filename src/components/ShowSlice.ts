import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import BoxStruct from "../data/BoxStruct";

export interface ShowState {
  BoxArray: Array<BoxStruct>;
  dragObejct: BoxStruct;
  ComponentArray: Array<BoxStruct>;
}

const initialState: ShowState = {
  BoxArray: new Array<BoxStruct>(),
  dragObejct: { title: "null" },
  ComponentArray: new Array<BoxStruct>(
    {
      title: "执行shell命令",
      argNum: 1,
      args: [],
      componentType: "component",
    },
    {
      title: "上传产物到aur",
      argNum: 1,
      args: [],
      componentType: "component",
    }
  ),
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
