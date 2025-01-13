import { configureStore } from "@reduxjs/toolkit";
import TaskSlice from "./TaskSlice";

export const Store = configureStore({
  reducer: {
    tasks: TaskSlice,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
