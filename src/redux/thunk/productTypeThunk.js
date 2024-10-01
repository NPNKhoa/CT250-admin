import { createAsyncThunk } from '@reduxjs/toolkit';
import productTypeService from '../../services/productType.service';

export const getProductTypes = createAsyncThunk(
    'producttype/getProductTypes',
    async (limit = -1, { rejectWithValue }) => {
        try {
            const response = await productTypeService.getProductTypes(limit);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getProductById = createAsyncThunk(
    'producttype/getProductById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await productTypeService.getProductById(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createProduct = createAsyncThunk(
    'producttype/createProduct',
    async (product, { rejectWithValue }) => {
        try {
            const response = await productTypeService.createProduct(product);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    'producttype/updateProduct',
    async (product, { rejectWithValue }) => {
        try {
            const response = await productTypeService.updateProduct(product._id, product);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'producttype/deleteProduct',
    async (id, { rejectWithValue }) => {
        try {
            await productTypeService.deleteProduct(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);