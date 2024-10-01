import { createAsyncThunk } from '@reduxjs/toolkit';
import serviceService from '../../services/service.service';

export const getServices = createAsyncThunk(
    'service/getServices',
    async (limit = -1, { rejectWithValue }) => {
        try {
            const response = await serviceService.getServices(limit);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getServiceById = createAsyncThunk(
    'service/getServiceById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await serviceService.getServiceById(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createService = createAsyncThunk(
    'service/createService',
    async (service, { rejectWithValue }) => {
        try {
            const response = await serviceService.createService(service);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateService = createAsyncThunk(
    'service/updateService',
    async (service, { rejectWithValue }) => {
        try {
            const response = await serviceService.updateService(service._id, service);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteService = createAsyncThunk(
    'service/deleteService',
    async (id, { rejectWithValue }) => {
        try {
            await serviceService.deleteService(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);