import { createSlice } from "@reduxjs/toolkit";
import { findReviewsByAlbumThunk } from "../../services/reviews-thunk";

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
            }
        }
    }
)

export default reviewsSlice.reducer;