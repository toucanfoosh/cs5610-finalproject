import * as searchService from "./search-service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAccessTokenThunk = createAsyncThunk(
    "search/token",
    async () => {
        const token = await searchService.getAccessToken();
        return token;
    }
)

