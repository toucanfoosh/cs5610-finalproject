import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_URL = `${API_BASE}/users`

const api = axios.create({
    withCredentials: true,
});

export const findAllUsers = async () => {
    const response = await api.get(USERS_URL);
    const users = response.data;
    return users;
};

export const createUser = async (user) => {
    const response = await api.post(USERS_URL, user);
    const userCreated = response.data;
    return userCreated;
};

export const deleteUser = async (userId) => {
    const response = await api.delete(`${USERS_URL}/${userId}`);
    const status = response.data;
    return status;
};

export const updateUser = async (user) => {
    const response = await api.put(`${USERS_URL}/${user._id}`, user);
    const status = response.data;
    return status;
};

export const login = async ({ username, password }) => {
    const response = await api.post(`${USERS_URL}/login`, {
        username,
        password,
    });
    const user = response.data;
    return user;
};

export const logout = async () => {
    const response = await api.post(`${USERS_URL}/logout`);
    const status = response.data;
    return status;
};

export const profile = async () => {
    const response = await api.post(`${USERS_URL}/profile`);
    const user = response.data;
    return user;
};

export const register = async ({ username, password }) => {
    const response = await api.post(`${USERS_URL}/register`, {
        username,
        password,
    });
    const user = response.data;
    return user;
};