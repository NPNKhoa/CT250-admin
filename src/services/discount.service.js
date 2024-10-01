import apiService from "./api.service";

class DiscountService {
    constructor() {
        this.api = new apiService('http://localhost:5000/api/v1/discount');
    }

    async getDiscounts(limit = -1) {
        const params = new URLSearchParams();
        params.append('limit', limit);
        try {
            const response = await this.api.request(`?${params.toString()}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy danh sách giảm giá:", error);
            throw error;
        }
    }

    async getDiscountById(id) {
        try {
            const response = await this.api.request(`/${id}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy thông tin giảm giá:", error);
            throw error;
        }
    }

    async createDiscount(Discount) {
        try {
            const response = await this.api.request("/", "POST", Discount);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi tạo giảm giá:", error);
            throw error;
        }
    }

    async updateDiscount(id, Discount) {
        try {
            const response = await this.api.request(`/${id}`, "PUT", Discount);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi cập nhật giảm giá:", error);
            throw error;
        }
    }

    async deleteDiscount(id) {
        try {
            const response = await this.api.request(`/${id}`, "DELETE");
            return response.data;
        } catch (error) {
            console.error("Lỗi khi xóa giảm giá:", error);
            throw error;
        }
    }
}

export default new DiscountService;