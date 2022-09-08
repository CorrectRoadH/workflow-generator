import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import BoxStruct from "../data/BoxStruct";
import { githubComponentData } from "../data/intData";
import BoxStructInstance, {
  createBoxInstance,
} from "../data/BoxStructInstance";
import { act } from "@testing-library/react";

export interface InputValue {
  componentID: string;
  order: number;
  value: string;
}

export interface ShowState {
  BoxArray: Array<BoxStructInstance>;
  dragObejct: BoxStruct;
  ComponentArray: Array<BoxStruct>;
}

const initialState: ShowState = {
  BoxArray: new Array<BoxStructInstance>(),
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
    setComponentInputValue: (state, action: PayloadAction<InputValue>) => {
      state.BoxArray.forEach((item) => {
        if (item.id === action.payload.componentID) {
          item.args[action.payload.order] = action.payload.value;
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
export const {
  move,
  moveToContainer,
  setComponentInputValue,
  dragObject,
  dropObject,
} = counterSlice.actions;

export default counterSlice.reducer;
