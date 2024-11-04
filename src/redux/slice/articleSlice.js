import { createSlice } from '@reduxjs/toolkit';
import { getArticles, getArticleById, createArticle, updateArticle, deleteArticle } from '../thunk/articleThunk';

const initialState = {
    articles: [],
    article: {},
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

const articleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getArticles.pending, setLoading)
            .addCase(getArticles.fulfilled, (state, action) => {
                setFulfilled(state);
                state.articles = action.payload;
            })
            .addCase(getArticles.rejected, setError)

            .addCase(getArticleById.pending, setLoading)
            .addCase(getArticleById.fulfilled, (state, action) => {
                setFulfilled(state);
                state.article = action.payload;
            })
            .addCase(getArticleById.rejected, setError)

            .addCase(createArticle.pending, setLoading)
            .addCase(createArticle.fulfilled, (state, action) => {
                setFulfilled(state);
                state.articles.push(action.payload);
            })
            .addCase(createArticle.rejected, setError)

            .addCase(updateArticle.pending, setLoading)
            .addCase(updateArticle.fulfilled, (state, action) => {
                setFulfilled(state);
                state.articles = state.articles.map(article => article._id === action.payload._id ? action.payload : article);
            })
            .addCase(updateArticle.rejected, setError)

            .addCase(deleteArticle.pending, setLoading)
            .addCase(deleteArticle.fulfilled, (state, action) => {
                setFulfilled(state);
                state.articles = state.articles.filter(article => article._id !== action.payload);
            })
            .addCase(deleteArticle.rejected, setError);
    }
});

export default articleSlice.reducer;