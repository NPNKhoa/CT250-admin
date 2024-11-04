import { createAsyncThunk } from '@reduxjs/toolkit';
import articleService from '../../services/article.service';

export const getArticles = createAsyncThunk(
    'article/getArticles',
    async (limit = 0, { rejectWithValue }) => {
        try {
            const response = await articleService.getArticles(limit);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getArticleById = createAsyncThunk(
    'article/getArticleById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await articleService.getArticleById(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createArticle = createAsyncThunk(
    'article/createArticle',
    async (article, { rejectWithValue }) => {
        try {
            const response = await articleService.createArticle(article);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateArticle = createAsyncThunk(
    'article/updateArticle',
    async (article, { rejectWithValue }) => {
        try {
            const response = await articleService.updateArticle(article._id, article);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteArticle = createAsyncThunk(
    'article/deleteArticle',
    async (id, { rejectWithValue }) => {
        try {
            await articleService.deleteArticle(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);