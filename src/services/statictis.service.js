import createApiClient from './api1.service';

class StatictisService {
  constructor(path = '/stat') {
    this.api = createApiClient(path);
  }

  async getTotalRevenue() {
    try {
      const response = await this.api.get('/totalrevenue');
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy doanh thu:', error);
      throw error;
    }
  }

  async getMonthlyRevenue(month, year) {
    try {
      const response = await this.api.get('/totalrevenuebymonth', {
        params: { month, year },
      });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy doanh thu:', error);
      throw error;
    }
  }

  async getRevenueByYear(year) {
    try {
      const response = await this.api.get('/totalrevenuebyyear', {
        params: { year },
      });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy doanh thu:', error);
      throw error;
    }
  }

  async getRevenueForAllYears(year) {
    try {
      const response = await this.api.get('/totalrevenueallyears', {
        params: { year },
      });
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

  async getTotalOrdersByMonth(month, year) {
    try {
      const response = await this.api.get(`/totalordersbymonth`, {
        params: { month, year },
      });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy tổng số đơn hàng theo tháng:', error);
      throw error;
    }
  }

  async getTotalUsers() {
    try {
      const response = await this.api.get('/totalusers');
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy tổng số tài khoản:', error);
      throw error;
    }
  }

  async getTotalUsersByMonth() {
    try {
      const response = await this.api.get(`/totalusersbymonth`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy tổng số tài khoảng theo tháng:', error);
      throw error;
    }
  }

  async getQuantityPerProductType() {
    try {
      const response = await this.api.get(`/quantityperproducttype`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy số lượng từng loại sản phẩm', error);
      throw error;
    }
  }

  async getAllOrders(params) {
    try {
      const response = await this.api.get('/lastedorders', { params });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy tất cả đơn hàng:', error);
      throw error;
    }
  }
}
export default new StatictisService();
