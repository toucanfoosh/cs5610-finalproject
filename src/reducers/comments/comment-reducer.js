import { createSlice } from "@reduxjs/toolkit";
import { createCommentThunk, deleteCommentThunk, findCommentsByPostThunk, findCommentsByUserThunk } from "../../services/comments-thunk";

const initialState = {
    postComments: [],
    userComments: [],
    numComments: 0,
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
        [findCommentsByUserThunk.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.userComments = payload;
            state.numComments = payload.length;
        },
        [createCommentThunk.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.postComments.push(payload);
        },
        [deleteCommentThunk.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.postComments = state.postComments.filter(e => e._id !== payload);
        }
    }
})

export default commentsSlice.reducer;