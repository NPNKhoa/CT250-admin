import { createSlice } from '@reduxjs/toolkit';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../thunk/categoryThunk';

const initialState = {
    categories: [],
    category: {},
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

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getCategories.pending, setLoading)
            .addCase(getCategories.fulfilled, (state, action) => {
                setFulfilled(state);
                state.categories = action.payload;
                console.log('hehe')
            })
            .addCase(getCategories.rejected, setError)

            .addCase(createCategory.pending, setLoading)
            .addCase(createCategory.fulfilled, (state, action) => {
                setFulfilled(state);
                state.categories.push(action.payload);
            })
            .addCase(createCategory.rejected, setError)

            .addCase(updateCategory.pending, setLoading)
            .addCase(updateCategory.fulfilled, (state, action) => {
                setFulfilled(state);
                state.categories = state.categories.map(category => category._id === action.payload._id ? action.payload : category);
            })
            .addCase(updateCategory.rejected, setError)

            .addCase(deleteCategory.pending, setLoading)
            .addCase(deleteCategory.fulfilled, (state, action) => {
                setFulfilled(state);
                state.categories = state.categories.filter(category => category._id !== action.payload);
            })
            .addCase(deleteCategory.rejected, setError);
    }
});

export default categorySlice.reducer;