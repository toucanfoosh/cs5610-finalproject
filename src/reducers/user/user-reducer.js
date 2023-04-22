import { createSlice } from "@reduxjs/toolkit";
import {
    loginThunk,
    logoutThunk,
    registerThunk,
    profileThunk,
    updateUserThunk,
} from "../../services/user-thunk";

const initialState = {
    currentUser: null,
};
const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: {
        [loginThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [logoutThunk.fulfilled]: (state) => {
            state.currentUser = null;
        },
        [profileThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [registerThunk.fulfilled]: (state, { payload }) => {
            if (payload === 404 || payload === 409) {
                return;
            }
            state.currentUser = payload;
        },
        [updateUserThunk.fulfilled]: (state, { payload }) => {
            if (state.currentUser._id === payload._id) {
                console.log("same user");
                state.currentUser = payload;
            }
        },
    },
});

export default userSlice.reducer;