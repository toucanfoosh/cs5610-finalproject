import * as service from "./lists-service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const findListsThunk = createAsyncThunk(
    "lists/findLists",
    async () => {
        const lists = await service.findLists();
        return lists;
    }
);

export const findListByIdThunk = createAsyncThunk(
    "lists/findListById",
    async (lid) => {
        const list = await service.findListById(lid);
        return list;
    }
)

export const findListsByUserThunk = createAsyncThunk(
    "lists/findListsByUser",
    async (uid) => {
        const lists = await service.findLists(uid);
        return lists;
    }
);

export const createListThunk = createAsyncThunk(
    "lists/createList",
    async (list) => {
        const newList = await service.createList(list);
        return newList;
    }
);

export const updateListThunk = createAsyncThunk(
    "lists/updateList",
    async (list) => {
        const updatedList = await service.updateList(list);
        return updatedList;
    }
);

export const deleteListThunk = createAsyncThunk(
    "lists/deleteList",
    async (lid) => {
        const deleted = await service.deleteList(lid);
        return deleted;
    }
);