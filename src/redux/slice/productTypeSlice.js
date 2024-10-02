import { createSlice } from '@reduxjs/toolkit';
import { getProductTypes, getProductTypeById, createProductType, updateProductType, deleteProductType } from '../thunk/productTypeThunk';

const initialState = {
    productTypes: [],
    productType: {},
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

const productTypeSlice = createSlice({
    name: 'productTypes',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getProductTypes.pending, setLoading)
            .addCase(getProductTypes.fulfilled, (state, action) => {
                setFulfilled(state);
                state.productTypes = action.payload;
            })
            .addCase(getProductTypes.rejected, setError)

            .addCase(getProductTypeById.pending, setLoading)
            .addCase(getProductTypeById.fulfilled, (state, action) => {
                setFulfilled(state);
                state.productTypes = action.payload;
            })
            .addCase(getProductTypeById.rejected, setError)

            .addCase(createProductType.pending, setLoading)
            .addCase(createProductType.fulfilled, (state, action) => {
                setFulfilled(state);
                state.productTypes.push(action.payload);
            })
            .addCase(createProductType.rejected, setError)

            .addCase(updateProductType.pending, setLoading)
            .addCase(updateProductType.fulfilled, (state, action) => {
                setFulfilled(state);
                state.productTypes = state.productTypes.map(producttype => producttype._id === action.payload._id ? action.payload : producttype);
            })
            .addCase(updateProductType.rejected, setError)

            .addCase(deleteProductType.pending, setLoading)
            .addCase(deleteProductType.fulfilled, (state, action) => {
                setFulfilled(state);
                state.productTypes = state.productTypes.filter(producttype => producttype._id !== action.payload);
            })
            .addCase(deleteProductType.rejected, setError);
    }
});

export default productTypeSlice.reducer;