import { createSlice } from '@reduxjs/toolkit';
import { getSpecifications, getSpecificationById, createSpecification, updateSpecification, deleteSpecification } from '../thunk/specificationThunk';

const initialState = {
    specifications: [],
    specification: {},
    loading: false,
    error: null
};

const specificationSlice = createSlice({
    name: 'specifications',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getSpecifications.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSpecifications.fulfilled, (state, action) => {
                state.loading = false;
                state.specifications = action.payload;
            })
            .addCase(getSpecifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getSpecificationById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSpecificationById.fulfilled, (state, action) => {
                state.loading = false;
                state.specification = action.payload;
            })
            .addCase(getSpecificationById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createSpecification.pending, (state) => {
                state.loading = true;
            })
            .addCase(createSpecification.fulfilled, (state, action) => {
                state.loading = false;
                state.specifications.push(action.payload);
            })
            .addCase(createSpecification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateSpecification.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateSpecification.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload); 
                state.specifications = state.specifications.map(specification => specification._id === action.payload._id ? action.payload : specification);
            })
            .addCase(updateSpecification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteSpecification.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteSpecification.fulfilled, (state, action) => {
                state.loading = false;
                state.specifications = state.specifications.filter(specification => specification._id !== action.payload);
            })
            .addCase(deleteSpecification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default specificationSlice.reducer;