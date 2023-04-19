import * as service from "./posts-service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const findPostsThunk = createAsyncThunk(
    'posts/findPosts', async () => {
        const posts = await service.findPosts();
        return posts;
    }
);

export const findPostByIdThunk = createAsyncThunk(
    'posts/findPostById', async (pid) => {
        const posts = await service.findPostById(pid);
        return posts;
    }
)

export const findPostsByUserThunk = createAsyncThunk(
    'posts/findPostsByUser', async (uid) => {
        const posts = await service.findPostsByUser(uid);
        return posts;
    }
)

export const deletePostThunk = createAsyncThunk(
    'posts/deletePost', async (pid) => {
        await service.deletePost(pid);
        return pid;
    }
);

export const createPostThunk = createAsyncThunk(
    'posts/createPost', async (post) => {
        const newPost = await service.createPost(post);
        return newPost;
    }
);

export const updatePostThunk = createAsyncThunk(
    'posts/updatePost', async (post) => {
        await service.updatePost(post);
        return post;
    }
);