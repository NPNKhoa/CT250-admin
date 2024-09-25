import createApiClient from './api1.service';

class CartService {
  constructor(path = '/stat') {
    this.api = createApiClient(path);
  }

  async getTotalRevenue() {
    try {
      const response = await this.api.get('/');
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy doanh thu:', error);
      throw error;
    }
  }

  async getMonthlyRevenue() {
    try {
      const response = await this.api.get('/getmonthly');
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy doanh thu:', error);
      throw error;
    }
  }
  async getTotalOrders() {
    try {
      const response = await this.api.get('/totalorders');
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy tổng số đơn hàng:', error);
      throw error;
    }
  }

  // Lấy tổng số đơn hàng theo tháng
  async getTotalOrdersByMonth(month, year) {
    try {
      const response = await this.api.get(
        `/totalordersbymonth?month=${month}&year=${year}`,
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy tổng số đơn hàng theo tháng:', error);
      throw error;
    }
  }
}
export default new CartService();
