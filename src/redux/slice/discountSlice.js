import { createSlice } from '@reduxjs/toolkit';
import { getDiscounts, getDiscountById, createDiscount, updateDiscount, deleteDiscount } from '../thunk/discountThunk';

const initialState = {
    discounts: [],
    discount: {},
    loading: false,
    error: null
};

const discountSlice = createSlice({
    name: 'discounts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getDiscounts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDiscounts.fulfilled, (state, action) => {
                state.loading = false;
                state.discounts = action.payload;
            })
            .addCase(getDiscounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getDiscountById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDiscountById.fulfilled, (state, action) => {
                state.loading = false;
                state.discount = action.payload;
            })
            .addCase(getDiscountById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createDiscount.pending, (state) => {
                state.loading = true;
            })
            .addCase(createDiscount.fulfilled, (state, action) => {
                state.loading = false;
                state.discounts.push(action.payload);
            })
            .addCase(createDiscount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateDiscount.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateDiscount.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload); 
                state.discounts = state.discounts.map(discount => discount._id === action.payload._id ? action.payload : discount);
            })
            .addCase(updateDiscount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteDiscount.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteDiscount.fulfilled, (state, action) => {
                state.loading = false;
                state.discounts = state.discounts.filter(discount => discount._id !== action.payload);
            })
            .addCase(deleteDiscount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default discountSlice.reducer;