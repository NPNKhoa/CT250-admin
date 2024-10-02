import { createSlice } from '@reduxjs/toolkit';
import { getVouchers, getVoucherById, createVoucher, updateVoucher, deleteVoucher } from '../thunk/voucherThunk';

const initialState = {
    vouchers: [],
    voucher: {},
    loading: false,
    error: null
};

const voucherSlice = createSlice({
    name: 'vouchers',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getVouchers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getVouchers.fulfilled, (state, action) => {
                state.loading = false;
                state.vouchers = action.payload;
            })
            .addCase(getVouchers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getVoucherById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getVoucherById.fulfilled, (state, action) => {
                state.loading = false;
                state.voucher = action.payload;
            })
            .addCase(getVoucherById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createVoucher.pending, (state) => {
                state.loading = true;
            })
            .addCase(createVoucher.fulfilled, (state, action) => {
                state.loading = false;
                state.vouchers.push(action.payload);
            })
            .addCase(createVoucher.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateVoucher.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateVoucher.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload); 
                state.vouchers = state.vouchers.map(voucher => voucher._id === action.payload._id ? action.payload : voucher);
            })
            .addCase(updateVoucher.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteVoucher.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteVoucher.fulfilled, (state, action) => {
                state.loading = false;
                state.vouchers = state.vouchers.filter(voucher => voucher._id !== action.payload);
            })
            .addCase(deleteVoucher.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default voucherSlice.reducer;