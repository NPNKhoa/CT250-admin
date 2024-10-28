import { createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../services/user.service';

// export const getUserById = createAsyncThunk(
//   'users/getUserById',
//   async (userId, thunkAPI) => {
//     try {
//       // Gọi API để lấy thông tin người dùng theo userId
//       const data = await userService.getUserById(userId);
//       return data;
//     } catch (error) {
//       // Trả về lỗi nếu có, sử dụng rejectWithValue để giữ thông tin lỗi
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.error || error.message,
//       );
//     }
//   },
// );

export const getLoggedInUser = createAsyncThunk(
  'users/getLoggedInUser',
  async (accessToken, thunkAPI) => {
    try {
      // Gọi API để lấy thông tin người dùng đăng nhập hiện tại dựa trên accessToken
      const response = await userService.getLoggedInUser(accessToken);
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      // Trả về lỗi nếu có, sử dụng rejectWithValue để giữ thông tin lỗi
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message,
      );
    }
  },
);
