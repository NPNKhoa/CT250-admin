import { createAsyncThunk } from '@reduxjs/toolkit';
import priceFilterService from '../../services/priceFilter.service';

export const getPriceFilters = createAsyncThunk(
  'priceFilters/getPriceFIlters',
  async (_, thunkAPI) => {
    try {
      const data = await priceFilterService.getPriceFilters();

      return data.data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);

export const addPriceFilter = createAsyncThunk(
  'priceFilters/addPriceFilter',
  async (params, thunkAPI) => {
    try {
      const data = await priceFilterService.addPriceFilter(
        params.fromPrice,
        params.toPrice,
      );

      if (data.error) {
        throw new Error(data.error);
      }

      return data.data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error?.message || error);
    }
  },
);

export const updatePriceFilter = createAsyncThunk(
  'priceFilters/updatePriceFilter',
  async (params, thunkAPI) => {
    try {
      const data = await priceFilterService.updatePriceFilter(
        params.id,
        params.payload,
      );

      if (data.error) {
        throw new Error(data.error);
      }

      return data.data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);

export const deletePriceFilter = createAsyncThunk(
  'priceFilters/deletePriceFilter',
  async (params, thunkAPI) => {
    try {
      const data = await priceFilterService.deletePriceFilter(params);

      if (data.error) {
        throw new Error(data.error);
      }

      return data.data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);
