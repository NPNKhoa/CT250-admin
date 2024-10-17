import { createSlice } from '@reduxjs/toolkit';
import { getOrders, getOrderById, createOrder} from '../thunk/orderThunk';

const initialState = {
    orders: [],
    order: {},
    loading: false,
    error: null
};

const setLoading = (state) => {
    state.loading = true;
};

const setFulfilled = (state) => {
    state.loading = false;
    state.error = null;
};

const setError = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getOrders.pending, setLoading)
            .addCase(getOrders.fulfilled, (state, action) => {
                setFulfilled(state);
                state.orders = action.payload;
            })
            .addCase(getOrders.rejected, setError)

            .addCase(getOrderById.pending, setLoading)
            .addCase(getOrderById.fulfilled, (state, action) => {
                setFulfilled(state);
                state.order = action.payload;
            })
            .addCase(getOrderById.rejected, setError)

            .addCase(createOrder.pending, setLoading)
            .addCase(createOrder.fulfilled, (state, action) => {
                setFulfilled(state);
                state.orders.push(action.payload);
            })
            .addCase(createOrder.rejected, setError)
    }
});

export default orderSlice.reducer;