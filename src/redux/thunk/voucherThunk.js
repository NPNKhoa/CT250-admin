import { createAsyncThunk } from '@reduxjs/toolkit';
import vouchersService from '../../services/voucher.service';

export const getVouchers = createAsyncThunk(
    'vouchers/getVouchers',
    async (limit = -1, { rejectWithValue }) => {
        try {
            const response = await vouchersService.getVouchers(limit);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getVoucherById = createAsyncThunk(
    'vouchers/getVoucherById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await vouchersService.getVoucherById(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createVoucher = createAsyncThunk(
    'vouchers/createVoucher',
    async (voucher, { rejectWithValue }) => {
        try {
            const response = await vouchersService.createVoucher(voucher);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateVoucher = createAsyncThunk(
    'vouchers/updateVoucher',
    async (voucher, { rejectWithValue }) => {
        try {
            const response = await vouchersService.updateVoucher(voucher._id, voucher);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteVoucher = createAsyncThunk(
    'vouchers/deleteVoucher',
    async (id, { rejectWithValue }) => {
        try {
            await vouchersService.deleteVoucher(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);