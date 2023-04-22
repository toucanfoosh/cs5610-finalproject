import { createSlice } from "@reduxjs/toolkit";
import posts from "./posts.json";
import { createPostThunk, deletePostThunk, findPostByIdThunk, findPostsByUserThunk, findPostsThunk, updatePostThunk } from "../../services/posts-thunk";

const initialState = {
    posts: [],
    loading: true,
    numPosts: 0,
    post: {}
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {

    },
    extraReducers: {
        [findPostsThunk.pending]:
            (state) => {
                state.loading = true
                state.posts = []
            },
        [findPostsByUserThunk.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.posts = payload;
            state.numPosts = payload.length;
        },
        [findPostByIdThunk.fulfilled]: (state, { payload }) => {
            state.post = payload;
        },
        [findPostsThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.posts = payload
            },
        [findPostsThunk.rejected]:
            (state, action) => {
                state.loading = false
                state.error = action.error
            },
        [deletePostThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.posts = state.posts
                    .filter(p => p._id !== payload)
            },
        [createPostThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.posts.push(payload)
            },
        [updatePostThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                const postIndex = state.posts
                    .findIndex((t) => t._id === payload._id)
                state.posts[postIndex] = {
                    ...state.posts[postIndex],
                    ...payload
                }
            }
    }
})

export default postsSlice.reducer;