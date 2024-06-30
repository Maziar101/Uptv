import { configureStore } from "@reduxjs/toolkit";
import TokenSlice from "./Slices/TokenSlice";

const store = configureStore({
  reducer: {
    token: TokenSlice,
  },
});

export default store;
