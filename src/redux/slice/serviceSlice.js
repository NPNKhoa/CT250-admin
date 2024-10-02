import { createSlice } from '@reduxjs/toolkit';
import { getServices, getServiceById, createService, updateService, deleteService } from '../thunk/serviceThunk';

const initialState = {
    services: [],
    service: {},
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

const serviceSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getServices.pending, setLoading)
            .addCase(getServices.fulfilled, (state, action) => {
                setFulfilled(state);
                state.services = action.payload;
            })
            .addCase(getServices.rejected, setError)

            .addCase(getServiceById.pending, setLoading)
            .addCase(getServiceById.fulfilled, (state, action) => {
                setFulfilled(state);
                state.service = action.payload;
            })
            .addCase(getServiceById.rejected, setError)

            .addCase(createService.pending, setLoading)
            .addCase(createService.fulfilled, (state, action) => {
                setFulfilled(state);
                state.services.push(action.payload);
            })
            .addCase(createService.rejected, setError)

            .addCase(updateService.pending, setLoading)
            .addCase(updateService.fulfilled, (state, action) => {
                setFulfilled(state);
                state.services = state.services.map(service => service._id === action.payload._id ? action.payload : service);
            })
            .addCase(updateService.rejected, setError)

            .addCase(deleteService.pending, setLoading)
            .addCase(deleteService.fulfilled, (state, action) => {
                setFulfilled(state);
                state.services = state.services.filter(service => service._id !== action.payload);
            })
            .addCase(deleteService.rejected, setError);
    }
});

export default serviceSlice.reducer;