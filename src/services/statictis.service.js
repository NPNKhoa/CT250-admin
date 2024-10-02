import ApiService from './api.service'; // sử dụng ApiService thay vì api1.service

class StatictisService {
  constructor() {
    this.api = new ApiService('http://localhost:5000/api/v1/stat');
  }

  async getTotalRevenue() {
    try {
      return await this.api.get('/totalrevenue');
    } catch (error) {
      console.error('Lỗi khi lấy doanh thu:', error);
      throw error;
    }
  }

  async getRevenueByTime(startDate, endDate) {
    try {
      const queryString = `startDate=${startDate}&endDate=${endDate}`;

      const response = await this.api.get(`/totalrevenuebytime?${queryString}`);

      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy doanh thu theo thời gian:', error);
      throw error;
    }
  }

  async getMonthlyRevenue(month, year) {
    try {
      const queryString = `month=${month}&year=${year}`;
      return await this.api.get(`/totalrevenuebymonth?${queryString}`);
    } catch (error) {
      console.error('Lỗi khi lấy doanh thu theo tháng:', error);
      throw error;
    }
  }

  async getRevenueByYear(year) {
    try {
      const params = { year };
      return await this.api.get('/totalrevenuebyyear', { params });
    } catch (error) {
      console.error('Lỗi khi lấy doanh thu theo năm:', error);
      throw error;
    }
  }

  async getRevenueForAllYears() {
    try {
      return await this.api.get('/totalrevenueallyears');
    } catch (error) {
      console.error('Lỗi khi lấy doanh thu cho tất cả các năm:', error);
      throw error;
    }
  }

  async getTotalOrders() {
    try {
      return await this.api.get('/totalorders');
    } catch (error) {
      console.error('Lỗi khi lấy tổng số đơn hàng:', error);
      throw error;
    }
  }

  async getTotalOrdersByMonth(month, year) {
    try {
      const queryString = `month=${month}&year=${year}`;

      return await this.api.get(`/totalordersbymonth?${queryString}`);
    } catch (error) {
      console.error('Lỗi khi lấy đơn hàng theo tháng:', error);
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

  async getQuantityPerProductType() {
    try {
      return await this.api.get('/quantityperproducttype');
    } catch (error) {
      console.error('Lỗi khi lấy số lượng từng loại sản phẩm:', error);
      throw error;
    }
  }

  async getTotalSoldPerMonth(month, year) {
    try {
      const queryString = `month=${month}&year=${year}`;
      return await this.api.get(`/totalsoldpermonth?${queryString}`);
    } catch (error) {
      console.error('Lỗi khi lấy tổng sản phẩm bán ra theo tháng:', error);
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
