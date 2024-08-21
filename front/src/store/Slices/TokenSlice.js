import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    token: null,
    role: null,
};

const TokenSlice = createSlice({
    name: "User Token Slice",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.name = null;
            state.role = null;
        },
        login: (state, action) => {
            state.token = action.payload.token;
            state.name = action.payload.user;
            state.userRole = action.payload.userRole;
        },
    },
});

export const { login, logout } = TokenSlice.actions;
export default TokenSlice.reducer;
