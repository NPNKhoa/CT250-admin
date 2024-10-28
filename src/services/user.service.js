import ApiService from './api.service'; // sử dụng ApiService thay vì api1.service

class UserService {
  constructor() {
    this.api = new ApiService('http://localhost:5000/api/v1/users');
  }

  async getAllUsers(limit = 0) {
    try {
      const params = new URLSearchParams();
      params.append('limit', limit);
      return await this.api.get(`?${params.toString()}`);
    } catch (error) {
      console.error('Lỗi khi lấy tất cả đơn hàng:', error);
      throw error;
    }
  }

  async getLoggedInUser(accessToken) {
    try {
      return await this.api.get('/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        'Lỗi khi lấy dữ liệu người dùng đã đăng nhập';
      console.error('Lỗi:', errorMessage);
      throw new Error(errorMessage);
    }
  }
}

export default new UserService();
