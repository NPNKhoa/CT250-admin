import { createAsyncThunk } from '@reduxjs/toolkit';
import specificationsService from '../../services/specifications.service';

export const getSpecifications = createAsyncThunk(
    'specifications/getSpecifications',
    async (limit = -1, { rejectWithValue }) => {
        try {
            const response = await specificationsService.getSpecifications(limit);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getSpecificationById = createAsyncThunk(
    'specifications/getSpecificationById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await specificationsService.getSpecificationById(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createSpecification = createAsyncThunk(
    'specifications/createSpecification',
    async (specification, { rejectWithValue }) => {
        try {
            const response = await specificationsService.createSpecification(specification);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateSpecification = createAsyncThunk(
    'specifications/updateSpecification',
    async (specification, { rejectWithValue }) => {
        try {
            const response = await specificationsService.updateSpecification(specification._id, specification);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteSpecification = createAsyncThunk(
    'specifications/deleteSpecification',
    async (id, { rejectWithValue }) => {
        try {
            await specificationsService.deleteSpecification(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);