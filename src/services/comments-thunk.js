import * as service from "./comments-service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const findAllCommentsThunk = createAsyncThunk(
    "comments/findAllComments",
    async () => {
        const comments = await service.findAllComments();
        return comments;
    }
)

export const findCommentsByPostThunk = createAsyncThunk(
    "comments/findCommentsByPost",
    async (pid) => {
        const comments = await service.findCommentsByPost(pid);
        return comments;
    }
)

export const findCommentsByUserThunk = createAsyncThunk(
    "comments/findCommentsByUser",
    async (uid) => {
        const comments = await service.findCommentsByUser(uid);
        return comments;
    }
)

export const createCommentThunk = createAsyncThunk(
    "comments/createComment",
    async (comment) => {
        const response = await service.createComment(comment);
        return response;
    }
)

export const updateCommentThunk = createAsyncThunk(
    "comments/updateComment",
    async (comment) => {
        const response = await service.updateComment(comment);
        return response;
    }
)

export const deleteCommentThunk = createAsyncThunk(
    "comments/deleteComment",
    async (cid) => {
        const response = await service.deleteComment(cid);
        return cid;
    }
)