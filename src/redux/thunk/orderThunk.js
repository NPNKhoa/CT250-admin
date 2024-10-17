import { createAsyncThunk } from '@reduxjs/toolkit';
import orderService from '../../services/order.service';

export const getOrders = createAsyncThunk(
    'order/getOrders',
    async (limit = 0, { rejectWithValue }) => {
        try {
            const response = await orderService.getOrders(limit);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getOrderById = createAsyncThunk(
    'order/getOrderById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await orderService.getOrderById(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (order, { rejectWithValue }) => {
        try {
            const response = await orderService.createOrder(order);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);