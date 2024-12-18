import { createSlice } from '@reduxjs/toolkit';
import {
  addBanner,
  backup,
  getAllBanners,
  getCurrentSystemConfig,
  updateActiveBanners,
  updateSystemConfig,
} from '../thunk/systemConfigThunk';
import { toast } from 'react-toastify';

const initialState = {
  currentConfigs: {},
  banners: [],
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

    // Update
    builder
      .addCase(updateSystemConfig.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSystemConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.currentConfigs = action.payload;
      })
      .addCase(updateSystemConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Backup
    builder
      .addCase(backup.pending, (state) => {
        state.loading = true;
      })
      .addCase(backup.fulfilled, (state, action) => {
        state.loading = false;
        state.currentConfigs = action.payload;
      })
      .addCase(backup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // update active banners
    builder
      .addCase(updateActiveBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateActiveBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.currentConfigs = action.payload;
      })
      .addCase(updateActiveBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // get all banners
    builder
      .addCase(getAllBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(getAllBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // add banner
    builder
      .addCase(addBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banners.push(action.payload);
        toast.success(
          'Thêm banner thành công. Bấm "Lưu thay đổi" để cập nhật!',
        );
      })
      .addCase(addBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default systemConfigSlice.reducer;
