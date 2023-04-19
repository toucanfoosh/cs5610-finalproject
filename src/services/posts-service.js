import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const POSTS_API = `${API_BASE}/posts`;

export const createPost = async (post) => {
    const response = await axios.post(POSTS_API, post);
    return response.data;
}

export const findPosts = async () => {
    const response = await axios.get(POSTS_API);
    const posts = response.data;
    return posts;
}

export const findPostById = async (pid) => {
    const response = await axios.get(`${POSTS_API}/post/${pid}`);
    return response.data;
}

export const findPostsByUser = async (uid) => {
    const response = await axios.get(`${POSTS_API}/user/${uid}`);
    return response.data;
}

export const deletePost = async (pid) => {
    const response = await axios.delete(`${POSTS_API}/${pid}`);
    return response.data;
}

export const updatePost = async (post) => {
    const response = await axios.put(`${POSTS_API}/${post._id}`, post);
    return post;
}