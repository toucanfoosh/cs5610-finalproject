import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userService from "./user-service";

export const loginThunk = createAsyncThunk(
    "user/login",
    async (credentials) => {
        const user = await userService.login(credentials);
        return user;
    }
);

export const updateUserThunk = createAsyncThunk(
    "user/updateUser",
    async (user) => {
        const status = await userService.updateUser(user);
        return user;
    }
);

export const logoutThunk = createAsyncThunk(
    "user/logout",
    async () => {
        const status = await userService.logout();
        return status;
    });

export const profileThunk = createAsyncThunk(
    "user/profile",
    async () => {
        const user = await userService.profile();
        return user;
    });

export const registerThunk = createAsyncThunk(
    "user/register",
    async (credentials) => {
        const user = await userService.register(credentials);
        return user;
    }
);