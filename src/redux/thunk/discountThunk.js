import { createAsyncThunk } from '@reduxjs/toolkit';
import discountsService from '../../services/discount.service';

export const getDiscounts = createAsyncThunk(
    'discount/getDiscounts',
    async (limit = -1, { rejectWithValue }) => {
        try {
            const response = await discountsService.getDiscounts(limit);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getDiscountById = createAsyncThunk(
    'discount/getDiscountById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await discountsService.getDiscountById(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createDiscount = createAsyncThunk(
    'discount/createDiscount',
    async (discount, { rejectWithValue }) => {
        try {
            const response = await discountsService.createDiscount(discount);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateDiscount = createAsyncThunk(
    'discount/updateDiscount',
    async (discount, { rejectWithValue }) => {
        try {
            const response = await discountsService.updateDiscount(discount._id, discount);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteDiscount = createAsyncThunk(
    'discount/deleteDiscount',
    async (id, { rejectWithValue }) => {
        try {
            await discountsService.deleteDiscount(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);