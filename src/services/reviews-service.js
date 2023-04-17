import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const REVIEWS_URL = `${API_BASE}/reviews`

export const findAllReviews = async () => {
    const response = await axios.get(REVIEWS_URL);
    const reviews = response.data;
    return reviews;
};

export const findReviewsByAlbum = async (aid) => {
    const response = await axios.get(`${REVIEWS_URL}/album/${aid}`)
    const reviewsFiltered = response.data;
    return reviewsFiltered;
}

export const findReviewsByUser = async (uid) => {
    const response = await axios.get(`${REVIEWS_URL}/user/${uid}`);
    const reviews = response.data;
    return reviews;
}

export const createReview = async (review) => {
    try {
        const response = await axios.post(REVIEWS_URL, review);
        const newReview = response.data;
        return newReview;
    }
    catch (error) {
        return error.response.status;
    }

};

export const deleteReview = async (rid) => {
    const response = await axios.delete(`${REVIEWS_URL}/${rid}`);
    const status = response.data;
    return status;
};

export const updateReview = async (review) => {
    console.log(review);
    const response = await axios.put(`${REVIEWS_URL}/${review._id}`, review);
    const status = response.data;
    return status;
};