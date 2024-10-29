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

  async getAllRoles(accessToken) {
    try {
      return await this.api.get('/roles', {
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

  async updateRole(roleId, accessToken) {
    try {
      const response = await this.api.put(
        '/updaterole',
        { newRoleId: roleId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || 'Lỗi khi cập nhật vai trò người dùng';
      console.error('Lỗi:', errorMessage);
      throw new Error(errorMessage);
    }
  }
}
export default new AuthService1();
