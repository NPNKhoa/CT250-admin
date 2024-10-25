import apiService from './api.service';

class OrderService {
  constructor() {
    this.api = new apiService('http://localhost:5000/api/v1/order');
  }

  async getOrders(limit = 0) {
    const params = new URLSearchParams();
    params.append('limit', limit);
    try {
      const response = await this.api.request(`?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng:', error);
      throw error;
    }
  }

  async getOrderById(id) {
    try {
      const response = await this.api.request(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy thông tin đơn hàng:', error);
      throw error;
    }
  }

  async updateOrderStatus(order) {
    try {
      const response = await this.api.request(
        `/update-status/${order.id}`,
        'PUT',
        { orderStatus: order.orderStatus },
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
      throw error;
    }
  }

  async createOrder(Order) {
    try {
      const response = await this.api.request('/', 'POST', Order);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi tạo đơn hàng:', error);
      throw error;
    }
  }

  async getLastOrders() {
    try {
      const response = await this.api.request('/latestorder');
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy đơn hàng mới nhất:', error);
      throw error;
    }
  }
}

export default new OrderService();
