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

export const backup = createAsyncThunk(
  'systemConfigs/backup',
  async (_, thunkAPI) => {
    try {
      const data = await systemConfigService.backup();

      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);

export const updateActiveBanners = createAsyncThunk(
  'systemConfigs/updateActiveBanners',
  async (params, thunkAPI) => {
    try {
      const body = {
        activeIds: params.actives?.map((banner) => banner._id),
        oldIds: params.olds?.map((banner) => banner._id),
      };
      const data = await systemConfigService.updateActiveBanners(body);

      if (data.error) {
        throw new Error(data.error);
      }

      return data.data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error?.message);
    }
  },
);

export const getAllBanners = createAsyncThunk(
  'systemConfigs/getAllBanners',
  async (_, thunkAPI) => {
    try {
      const data = await systemConfigService.getAllBanners();

      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error?.message);
    }
  },
);
