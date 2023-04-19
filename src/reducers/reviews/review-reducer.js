import { createSlice } from "@reduxjs/toolkit";
import { createReviewThunk, findReviewsByAlbumThunk, findReviewsByUserThunk } from "../../services/reviews-thunk";
import { findReviewsByUser } from "../../services/reviews-service";

const initialState = {
    reviews: [],
    numReviews: 0
}

const reviewsSlice = createSlice(
    {
        name: 'reviews',
        initialState,
        extraReducers: {
            [findReviewsByAlbumThunk.fulfilled]: (state, { payload }) => {
                state.reviews = payload;
            },
            [findReviewsByUserThunk.fulfilled]: (state, { payload }) => {
                state.reviews = payload;
                state.numReviews = payload.length;
            },
            [createReviewThunk.fulfilled]: (state, { payload }) => {
                if (payload === 404 || payload === 409) {
                    return;
                }
                if (state.reviews) {
                    state.reviews.push(payload);
                }
                else {
                    state.reviews = [payload];
                }
            }
        }
    }
)

export default reviewsSlice.reducer;