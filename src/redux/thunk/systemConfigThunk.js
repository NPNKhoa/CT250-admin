import { createAsyncThunk } from '@reduxjs/toolkit';
import systemConfigService from '../../services/systemConfig.service';

export const getCurrentSystemConfig = createAsyncThunk(
  'systemConfigs/getCurrent',
  async (_, thunkAPI) => {
    try {
      const data = await systemConfigService.getConfig();

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      }

      return data.data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error?.message);
    }
  },
);

export const updateSystemConfig = createAsyncThunk(
  'systemConfigs/updateConfig',
  async (params, thunkAPI) => {
    try {
      const data = await systemConfigService.updateConfig(params);

      return data.data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error.message);
    }
  },
);
