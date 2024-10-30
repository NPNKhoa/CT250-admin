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
      console.error('Lỗi khi lấy thông tin tất cả người dùng: ', error);
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
      console.error('Lỗi khi lấy thông tin người dùng đã đăng nhập:', error);
      throw error;
    }
  }
}

export default new UserService();
