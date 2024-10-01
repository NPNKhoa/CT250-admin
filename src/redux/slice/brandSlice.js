import { createSlice } from '@reduxjs/toolkit';
import { getBrands, getBrandById, createBrand, updateBrand, deleteBrand } from '../thunk/brandThunk';

const initialState = {
    brands: [],
    brand: {},
    loading: false,
    error: null
};

const brandSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getBrands.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBrands.fulfilled, (state, action) => {
                state.loading = false;
                state.brands = action.payload;
            })
            .addCase(getBrands.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getBrandById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBrandById.fulfilled, (state, action) => {
                state.loading = false;
                state.brand = action.payload;
            })
            .addCase(getBrandById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createBrand.pending, (state) => {
                state.loading = true;
            })
            .addCase(createBrand.fulfilled, (state, action) => {
                state.loading = false;
                state.brands.push(action.payload);
            })
            .addCase(createBrand.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateBrand.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateBrand.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload); 
                state.brands = state.brands.map(brand => brand._id === action.payload._id ? action.payload : brand);
            })
            .addCase(updateBrand.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteBrand.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteBrand.fulfilled, (state, action) => {
                state.loading = false;
                state.brands = state.brands.filter(brand => brand._id !== action.payload);
            })
            .addCase(deleteBrand.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default brandSlice.reducer;