import { createSlice } from '@reduxjs/toolkit';
import { getBrands, getBrandById, createBrand, updateBrand, deleteBrand } from '../thunk/brandThunk';

const initialState = {
    brands: [],
    brand: {},
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

const brandSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getBrands.pending, setLoading)
            .addCase(getBrands.fulfilled, (state, action) => {
                setFulfilled(state);
                state.brands = action.payload;
            })
            .addCase(getBrands.rejected, setError)

            .addCase(getBrandById.pending, setLoading)
            .addCase(getBrandById.fulfilled, (state, action) => {
                setFulfilled(state);
                state.brand = action.payload;
            })
            .addCase(getBrandById.rejected, setError)

            .addCase(createBrand.pending, setLoading)
            .addCase(createBrand.fulfilled, (state, action) => {
                setFulfilled(state);
                state.brands.push(action.payload);
            })
            .addCase(createBrand.rejected, setError)

            .addCase(updateBrand.pending, setLoading)
            .addCase(updateBrand.fulfilled, (state, action) => {
                setFulfilled(state);
                state.brands = state.brands.map(brand => brand._id === action.payload._id ? action.payload : brand);
            })
            .addCase(updateBrand.rejected, setError)

            .addCase(deleteBrand.pending, setLoading)
            .addCase(deleteBrand.fulfilled, (state, action) => {
                setFulfilled(state);
                state.brands = state.brands.filter(brand => brand._id !== action.payload);
            })
            .addCase(deleteBrand.rejected, setError);
    }
});

export default brandSlice.reducer;