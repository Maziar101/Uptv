import { configureStore } from "@reduxjs/toolkit";
import TokenSlice from "./Slices/TokenSlice";

const store = configureStore({
    token: TokenSlice,
});

export default store

