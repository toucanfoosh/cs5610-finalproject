import { createAsyncThunk } from "@reduxjs/toolkit";
import * as reviewsService from "./reviews-service";

export const findAllReviewsThunk = createAsyncThunk(
    "reviews/findAllReviews",
    async () => {
        const reviews = await reviewsService.findAllReviews();
        return reviews;
    }
);

export const findReviewsByAlbumThunk = createAsyncThunk(
    "reviews/findReviewsByAlbum",
    async (aid) => {
        const reviews = await reviewsService.findReviewsByAlbum(aid);
        return reviews;
    }
);

export const createReviewThunk = createAsyncThunk(
    "reviews/createReview",
    async (review) => {
        const newReview = await reviewsService.createReview(review);
        return newReview;
    }
)