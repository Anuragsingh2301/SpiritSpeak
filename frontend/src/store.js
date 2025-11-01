import { configureStore } from "@reduxjs/toolkit";
import { APISlice } from "./apis/APISlice";
import xpReducer from "./features/xpSlice";

export const store = configureStore({
  reducer: {
    [APISlice.reducerPath]: APISlice.reducer,
    xp: xpReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(APISlice.middleware),
});