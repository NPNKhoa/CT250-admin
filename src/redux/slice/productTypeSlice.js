import { createSlice } from '@reduxjs/toolkit';
import { getProductTypes, getProductTypeById, createProductType, updateProductType, deleteProductType } from '../thunk/productTypeThunk';

const initialState = {
    productTypes: [],
    productType: {},
    loading: false,
    error: null
};

const productTypeSlice = createSlice({
    name: 'productTypes',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getProductTypes.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductTypes.fulfilled, (state, action) => {
                state.loading = false;
                state.productTypes = action.payload;
            })
            .addCase(getProductTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getProductTypeById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductTypeById.fulfilled, (state, action) => {
                state.loading = false;
                state.producttype = action.payload;
            })
            .addCase(getProductTypeById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createProductType.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProductType.fulfilled, (state, action) => {
                state.loading = false;
                state.productTypes.push(action.payload);
            })
            .addCase(createProductType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateProductType.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProductType.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload); 
                state.productTypes = state.productTypes.map(producttype => producttype._id === action.payload._id ? action.payload : producttype);
            })
            .addCase(updateProductType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteProductType.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProductType.fulfilled, (state, action) => {
                state.loading = false;
                state.productTypes = state.productTypes.filter(producttype => producttype._id !== action.payload);
            })
            .addCase(deleteProductType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default productTypeSlice.reducer;