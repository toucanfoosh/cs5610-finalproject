import { createSlice } from "@reduxjs/toolkit";
import { createReviewThunk, findReviewsByAlbumThunk } from "../../services/reviews-thunk";

const initialState = {
    reviews: null
}

const reviewsSlice = createSlice(
    {
        name: 'reviews',
        initialState,
        extraReducers: {
            [findReviewsByAlbumThunk.fulfilled]: (state, { payload }) => {
                state.reviews = payload;
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