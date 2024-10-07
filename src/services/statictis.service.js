import ApiService from './api.service'; // sử dụng ApiService thay vì api1.service

class StatictisService {
  constructor() {
    this.api = new ApiService('http://localhost:5000/api/v1/stat');
  }

  async getRevenueForAllYears() {
    try {
      return await this.api.get('/totalrevenueallyears');
    } catch (error) {
      console.error('Lỗi khi lấy doanh thu cho tất cả các năm:', error);
      throw error;
    }
  }

  async getStatisticsByDateRange(startDate, endDate) {
    try {
      const queryString = `startDate=${startDate}&endDate=${endDate}`;

      return await this.api.get(`/gettime?${queryString}`);
    } catch (error) {
      console.error('Lỗi khi lấy đơn hàng theo thời gian:', error);
      throw error;
    }
  }

  async getStatisticsByYear(year) {
    try {
      const queryString = `year=${year}`;

      return await this.api.get(`/getyear?${queryString}`);
    } catch (error) {
      console.error('Lỗi khi lấy đơn hàng theo năm:', error);
      throw error;
    }
  }

  async getTotalUsers() {
    try {
      return await this.api.get('/totalusers');
    } catch (error) {
      console.error('Lỗi khi lấy tổng số người dùng:', error);
      throw error;
    }
  }

  async getTotalUsersByMonth() {
    try {
      return await this.api.get('/totalusersbymonth');
    } catch (error) {
      console.error('Lỗi khi lấy tổng số người dùng theo tháng:', error);
      throw error;
    }
  }

  async getAllOrders(params) {
    try {
      return await this.api.get('/lastedorders', { params });
    } catch (error) {
      console.error('Lỗi khi lấy tất cả đơn hàng:', error);
      throw error;
    }
  }
}

export default new StatictisService();
