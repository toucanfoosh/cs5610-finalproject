import { createSlice } from "@reduxjs/toolkit";
import posts from "./posts.json";

const postsSlice = createSlice({
    name: 'posts',
    initialState: posts,
    reducers: {

    },
    extraReducers: {

    }
})

export default postsSlice.reducer;