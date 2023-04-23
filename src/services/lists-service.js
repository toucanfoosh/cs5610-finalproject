import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const LISTS_API = `${API_BASE}/lists`;

export const findLists = async () => {
    const response = await axios.get(LISTS_API);
    return response.data;
}

export const findListsByUser = async (uid) => {
    const response = await axios.get(`${LISTS_API}/${uid}`);
    return response.data;
}

export const createList = async (list) => {
    const response = await axios.post(LISTS_API, list);
    return response.data;
}

export const updateList = async (list) => {
    const response = await axios.put(LISTS_API, list);
    return response.data;
}

export const deleteList = async (lid) => {
    const response = await axios.delete(`${LISTS_API}/${lid}`);
    return response.data;
}