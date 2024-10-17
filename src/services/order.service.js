import apiService from "./api.service";

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
            console.error("Lỗi khi lấy danh sách thương hiệu:", error);
            throw error;
        }
    }

    async getOrderById(id) {
        try {
            const response = await this.api.request(`/${id}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy thông tin thương hiệu:", error);
            throw error;
        }
    }

    async createOrder(Order) {
        try {
            const response = await this.api.request("/", "POST", Order);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi tạo thương hiệu:", error);
            throw error;
        }
    }
}

export default new OrderService;