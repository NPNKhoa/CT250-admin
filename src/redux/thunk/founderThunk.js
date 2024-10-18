import { createAsyncThunk } from '@reduxjs/toolkit';

import founderService from '../../services/founder.service';

export const getFounders = createAsyncThunk(
  'founders/getFounders',
  async (_, thunkAPI) => {
    try {
      const response = await founderService.getFounders();

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

export const addFounder = createAsyncThunk(
  'founders/addFounder',
  async (params, thunkAPI) => {
    try {
      const response = await founderService.addFounder({
        founderName: params.founderName,
        founderAvatarPath: params.founderAvatarPath,
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
