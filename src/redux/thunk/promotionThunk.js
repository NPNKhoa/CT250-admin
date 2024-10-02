import { createAsyncThunk } from '@reduxjs/toolkit';
import promotionsService from '../../services/promotion.service';

export const getPromotions = createAsyncThunk(
    'promotions/getPromotions',
    async (limit = -1, { rejectWithValue }) => {
        try {
            const response = await promotionsService.getPromotions(limit);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getPromotionById = createAsyncThunk(
    'promotions/getPromotionById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await promotionsService.getPromotionById(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createPromotion = createAsyncThunk(
    'promotions/createPromotion',
    async (promotion, { rejectWithValue }) => {
        try {
            const response = await promotionsService.createPromotion(promotion);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updatePromotion = createAsyncThunk(
    'promotions/updatePromotion',
    async (promotion, { rejectWithValue }) => {
        try {
            const response = await promotionsService.updatePromotion(promotion._id, promotion);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deletePromotion = createAsyncThunk(
    'promotions/deletePromotion',
    async (id, { rejectWithValue }) => {
        try {
            await promotionsService.deletePromotion(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);