import { configureStore } from "@reduxjs/toolkit";
import ShowSlice from "./components/ShowSlice";

export const store = configureStore({
  reducer: {
    show: ShowSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
