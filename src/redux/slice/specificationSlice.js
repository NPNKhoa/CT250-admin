import { createSlice } from '@reduxjs/toolkit';
import { getSpecifications, getSpecificationById, createSpecification, updateSpecification, deleteSpecification } from '../thunk/specificationThunk';

const initialState = {
    specifications: [],
    specification: {},
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

const specificationSlice = createSlice({
    name: 'specifications',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getSpecifications.pending, setLoading)
            .addCase(getSpecifications.fulfilled, (state, action) => {
                setFulfilled(state);
                state.specifications = action.payload;
            })
            .addCase(getSpecifications.rejected, setError)

            .addCase(getSpecificationById.pending, setLoading)
            .addCase(getSpecificationById.fulfilled, (state, action) => {
                setFulfilled(state);
                state.specification = action.payload;
            })
            .addCase(getSpecificationById.rejected, setError)

            .addCase(createSpecification.pending, setLoading)
            .addCase(createSpecification.fulfilled, (state, action) => {
                setFulfilled(state);
                state.specifications.push(action.payload);
            })
            .addCase(createSpecification.rejected, setError)

            .addCase(updateSpecification.pending, setLoading)
            .addCase(updateSpecification.fulfilled, (state, action) => {
                setFulfilled(state);
                state.specifications = state.specifications.map(specification => specification._id === action.payload._id ? action.payload : specification);
            })
            .addCase(updateSpecification.rejected, setError)

            .addCase(deleteSpecification.pending, setLoading)
            .addCase(deleteSpecification.fulfilled, (state, action) => {
                setFulfilled(state);
                state.specifications = state.specifications.filter(specification => specification._id !== action.payload);
            })
            .addCase(deleteSpecification.rejected, setError);
    }
});

export default specificationSlice.reducer;