import { createSlice } from '@reduxjs/toolkit';
import { getPromotions, getPromotionById, createPromotion, updatePromotion, deletePromotion } from '../thunk/promotionThunk';

const initialState = {
    promotions: [],
    promotion: {},
    loading: false,
    error: null
};

const promotionSlice = createSlice({
    name: 'promotions',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getPromotions.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPromotions.fulfilled, (state, action) => {
                state.loading = false;
                state.promotions = action.payload;
            })
            .addCase(getPromotions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getPromotionById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPromotionById.fulfilled, (state, action) => {
                state.loading = false;
                state.promotion = action.payload;
            })
            .addCase(getPromotionById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createPromotion.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPromotion.fulfilled, (state, action) => {
                state.loading = false;
                state.promotions.push(action.payload);
            })
            .addCase(createPromotion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updatePromotion.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePromotion.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload); 
                state.promotions = state.promotions.map(promotion => promotion._id === action.payload._id ? action.payload : promotion);
            })
            .addCase(updatePromotion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deletePromotion.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePromotion.fulfilled, (state, action) => {
                state.loading = false;
                state.promotions = state.promotions.filter(promotion => promotion._id !== action.payload);
            })
            .addCase(deletePromotion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default promotionSlice.reducer;