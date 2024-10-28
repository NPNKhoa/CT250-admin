import { createAsyncThunk } from '@reduxjs/toolkit';
import auth1Service from '../../services/auth1.service';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await auth1Service.login(credentials);

      // Lưu access token và refresh token vào localStorage
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  },
);
