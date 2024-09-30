import { createAsyncThunk } from '@reduxjs/toolkit';
import productsService from '../../services/products.service';

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (limit = -1, { rejectWithValue }) => {
        try {
            const response = await productsService.getProducts(limit);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getProductById = createAsyncThunk(
    'products/getProductById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await productsService.getProductById(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (product, { rejectWithValue }) => {
        try {
            const response = await productsService.createProduct(product);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async (product, { rejectWithValue }) => {
        try {
            const response = await productsService.updateProduct(product._id, product);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id, { rejectWithValue }) => {
        try {
            await productsService.deleteProduct(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);