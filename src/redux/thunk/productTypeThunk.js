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

export const getProductTypeById = createAsyncThunk(
    'producttype/getProductTypeById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await productTypeService.getProductTypeById(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createProductType = createAsyncThunk(
    'producttype/createProductType',
    async (product, { rejectWithValue }) => {
        try {
            const response = await productTypeService.createProductType(product);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateProductType = createAsyncThunk(
    'producttype/updateProductType',
    async (product, { rejectWithValue }) => {
        try {
            const response = await productTypeService.updateProductType(product._id, product);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteProductType = createAsyncThunk(
    'producttype/deleteProductType',
    async (id, { rejectWithValue }) => {
        try {
            await productTypeService.deleteProductType(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);