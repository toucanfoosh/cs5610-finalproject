import { createSlice } from "@reduxjs/toolkit";
import { createCommentThunk, findCommentsByPostThunk } from "../../services/comments-thunk";

const initialState = {
    postComments: [],
    loading: true
}

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    extraReducers: {
        [findCommentsByPostThunk.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.postComments = payload;
        },
        [createCommentThunk.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.postComments.push(payload);
        }
    }
})

export default commentsSlice.reducer;