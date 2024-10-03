import { createSlice } from '@reduxjs/toolkit';
import { getCurrentSystemConfig } from '../thunk/systemConfigThunk';

const initialState = {
  currentConfigs: {},
  loading: false,
  error: '',
};

const systemConfigSlice = createSlice({
  name: 'systemConfigs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get current
    builder
      .addCase(getCurrentSystemConfig.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentSystemConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.currentConfigs = action.payload;
      })
      .addCase(getCurrentSystemConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default systemConfigSlice.reducer;
