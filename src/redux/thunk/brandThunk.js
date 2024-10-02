import { createAsyncThunk } from '@reduxjs/toolkit';
import brandService from '../../services/brand.service';

export const getBrands = createAsyncThunk(
    'brand/getBrands',
    async (limit = -1, { rejectWithValue }) => {
        try {
            const response = await brandService.getBrands(limit);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getBrandById = createAsyncThunk(
    'brand/getBrandById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await brandService.getBrandById(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createBrand = createAsyncThunk(
    'brand/createBrand',
    async (brand, { rejectWithValue }) => {
        try {
            const response = await brandService.createBrand(brand);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateBrand = createAsyncThunk(
    'brand/updateBrand',
    async (brand, { rejectWithValue }) => {
        try {
            const response = await brandService.updateBrand(brand._id, brand);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteBrand = createAsyncThunk(
    'brand/deleteBrand',
    async (id, { rejectWithValue }) => {
        try {
            await brandService.deleteBrand(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);