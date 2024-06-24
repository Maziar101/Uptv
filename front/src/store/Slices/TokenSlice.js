import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
};

const TokenSlice = createSlice({
    name: "User Token Slice",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
        },
        login: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
    },
});

export const { login, logout } = TokenSlice.actions;
export default TokenSlice.reducer;
