import ApiService from './api.service';

class AuthService1 {
  constructor() {
    this.api = new ApiService('http://localhost:5000/api/v1/auth');
  }

  async login(data) {
    try {
      const response = await this.api.request('/loginadmin', 'POST', data);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
      throw error;
    }
  }
}
export default new AuthService1();
