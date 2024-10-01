import { createSlice } from '@reduxjs/toolkit';
import { getDiscounts, getDiscountById, createDiscount, updateDiscount, deleteDiscount } from '../thunk/discountThunk';

const initialState = {
    discounts: [],
    discount: {},
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

const discountSlice = createSlice({
    name: 'discount',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getDiscounts.pending, setLoading)
            .addCase(getDiscounts.fulfilled, (state, action) => {
                setFulfilled(state);
                state.discounts = action.payload;
            })
            .addCase(getDiscounts.rejected, setError)

            .addCase(getDiscountById.pending, setLoading)
            .addCase(getDiscountById.fulfilled, (state, action) => {
                setFulfilled(state);
                state.discount = action.payload;
            })
            .addCase(getDiscountById.rejected, setError)

            .addCase(createDiscount.pending, setLoading)
            .addCase(createDiscount.fulfilled, (state, action) => {
                setFulfilled(state);
                state.discounts.push(action.payload);
            })
            .addCase(createDiscount.rejected, setError)

            .addCase(updateDiscount.pending, setLoading)
            .addCase(updateDiscount.fulfilled, (state, action) => {
                setFulfilled(state);
                state.discounts = state.discounts.map(discount => discount._id === action.payload._id ? action.payload : discount);
            })
            .addCase(updateDiscount.rejected, setError)

            .addCase(deleteDiscount.pending, setLoading)
            .addCase(deleteDiscount.fulfilled, (state, action) => {
                setFulfilled(state);
                state.discounts = state.discounts.filter(discount => discount._id !== action.payload);
            })
            .addCase(deleteDiscount.rejected, setError);
    }
});

export default discountSlice.reducer;