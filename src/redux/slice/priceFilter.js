import { createSlice } from '@reduxjs/toolkit';
import {
  addPriceFilter,
  deletePriceFilter,
  getPriceFilters,
  updatePriceFilter,
} from '../thunk/priceFilter';

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
    // GetAll
    builder
      .addCase(getPriceFilters.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPriceFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.priceFilterList = action.payload;
      })
      .addCase(getPriceFilters.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      });

    // Create
    builder
      .addCase(addPriceFilter.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPriceFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.priceFilterList.push(action.payload);
      })
      .addCase(addPriceFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

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

        state.priceFilterList = state.priceFilterList.filter(
          (item) => item._id !== action.payload._id,
        );
      })
      .addCase(deletePriceFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default priceFilterSlice.reducer;
