import { createSlice } from '@reduxjs/toolkit';
import { getPromotions, getPromotionById, createPromotion, updatePromotion, deletePromotion } from '../thunk/promotionThunk';

const initialState = {
    promotions: [],
    promotion: {},
    loading: false,
    error: null
};

const setLoading = (state) => {
    state.loading = true;
};

const setFulfilled = (state) => {
    state.loading = false;
    state.error = null;
};

const setError = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};

const promotionSlice = createSlice({
    name: 'promotions',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getPromotions.pending, setLoading)
            .addCase(getPromotions.fulfilled, (state, action) => {
                setFulfilled(state);
                state.promotions = action.payload;
            })
            .addCase(getPromotions.rejected, setError)

            .addCase(getPromotionById.pending, setLoading)
            .addCase(getPromotionById.fulfilled, (state, action) => {
                setFulfilled(state);
                state.promotion = action.payload;
            })
            .addCase(getPromotionById.rejected, setError)

            .addCase(createPromotion.pending, setLoading)
            .addCase(createPromotion.fulfilled, (state, action) => {
                setFulfilled(state);
                state.promotions.push(action.payload);
            })
            .addCase(createPromotion.rejected, setError)

            .addCase(updatePromotion.pending, setLoading)
            .addCase(updatePromotion.fulfilled, (state, action) => {
                setFulfilled(state);
                state.promotions = state.promotions.map(promotion => promotion._id === action.payload._id ? action.payload : promotion);
            })
            .addCase(updatePromotion.rejected, setError)

            .addCase(deletePromotion.pending, setLoading)
            .addCase(deletePromotion.fulfilled, (state, action) => {
                setFulfilled(state);
                state.promotions = state.promotions.filter(promotion => promotion._id !== action.payload);
            })
            .addCase(deletePromotion.rejected, setError);
    }
});

export default promotionSlice.reducer;