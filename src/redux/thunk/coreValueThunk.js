import { createAsyncThunk } from '@reduxjs/toolkit';

import coreValueService from '../../services/coreValue.service';

export const getCoreValues = createAsyncThunk(
  'coreValues/getCoreValues',
  async (_, thunkAPI) => {
    try {
      const response = await coreValueService.getCoreValues();

      if (response.error) {
        thunkAPI.rejectWithValue(response.error);
      }

      return response.data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);

export const addCoreValue = createAsyncThunk(
  'coreValues/addCoreValue',
  async (params, thunkAPI) => {
    try {
      const response = await coreValueService.addCoreValue({
        title: params.title,
        content: params.content,
      });

      if (response.error) {
        thunkAPI.rejectWithValue(response.error);
      }

      return response.data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);
