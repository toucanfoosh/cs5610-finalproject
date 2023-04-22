import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;
const COMMENTS_API = `${API_BASE}/comments`;

export const findAllComments = async () => {
    const response = await axios.get(COMMENTS_API);
    return response.data;
}

export const findCommentsByPost = async (pid) => {
    const response = await axios.get(`${COMMENTS_API}/posts/${pid}`);
    return response.data;
}

export const findCommentsByUser = async (uid) => {
    const response = await axios.get(`${COMMENTS_API}/users/${uid}`);
    return response.data;
}

export const createComment = async (comment) => {
    const response = await axios.post(COMMENTS_API, comment);
    return response.data;
}

export const updateComment = async (comment) => {
    const response = await axios.put(COMMENTS_API, comment);
    return response.data;
}

export const deleteComment = async (cid) => {
    const response = await axios.delete(`${COMMENTS_API}/${cid}`);
    return response.data;
}
