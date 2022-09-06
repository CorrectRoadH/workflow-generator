import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ShowState {
  value: number;
}

const initialState: ShowState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "show",
  initialState,
  reducers: {
    move: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { move } = counterSlice.actions;

export default counterSlice.reducer;
