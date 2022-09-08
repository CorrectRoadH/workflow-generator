import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import BoxStruct from "../data/BoxStruct";
import { githubComponentData } from "../data/intData";
import BoxStructInstance, { createBoxInstance } from "../data/BoxStructInstance";

export interface ShowState {
  BoxArray: Array<BoxStructInstance>;
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
    moveToContainer: (state, action: PayloadAction<string>) => {
      console.log("容器收到数据");
      state.BoxArray.forEach((item) => {
        if (item.componentType === "container" && item.id === action.payload) {
          item.children.push(createBoxInstance(state.dragObejct));
        }
      });
    },
    move: (state) => {
      state.BoxArray.push(createBoxInstance(state.dragObejct));
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
export const { move, moveToContainer, dragObject, dropObject } =
  counterSlice.actions;

export default counterSlice.reducer;
