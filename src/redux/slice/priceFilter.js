import { createSlice } from '@reduxjs/toolkit';
import { deletePriceFilter, updatePriceFilter } from '../thunk/priceFilter';

const initialState = {
  priceFilterList: [],
  loading: false,
  error: '',
};

const priceFilterSlice = createSlice({
  name: 'priceFilters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Update
    builder
      .addCase(updatePriceFilter.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePriceFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.priceFilterList = action.payload;
      })
      .addCase(updatePriceFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deletePriceFilter.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePriceFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.priceFilterList = action.payload;
      })
      .addCase(deletePriceFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default priceFilterSlice.reducer;
