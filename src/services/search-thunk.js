import * as searchService from "./search-service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAccessTokenThunk = createAsyncThunk(
    "search/getToken",
    async () => {
        const token = await searchService.getAccessToken();
        return token;
    }
)

export const fullTextSearchThunk = createAsyncThunk(
    "search/textSearch",
    async (credentials) => {
        const albums = await searchService.fullTextSearch(credentials);
        return albums;
    }
)

