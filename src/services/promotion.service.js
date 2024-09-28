import apiService from "./api.service";

class PromotionService {
    constructor() {
        this.api = new apiService('http://localhost:5000/api/v1/promotion');
    }

    async getPromotions(limit = -1) {
        const params = new URLSearchParams();
        params.append('limit', limit);
        try {
            const response = await this.api.request(`?${params.toString()}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy danh sách khuyến mãi:", error);
            throw error;
        }
    }

    async getPromotionById(id) {
        try {
            const response = await this.api.request(`/${id}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy thông tin khuyến mãi:", error);
            throw error;
        }
    }

    async createPromotion(promotion) {
        try {
            const response = await this.api.request("/", "POST", promotion);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi tạo khuyến mãi:", error);
            throw error;
        }
    }

    async updatePromotion(id, promotion) {
        try {
            const response = await this.api.request(`/${id}`, "PUT", promotion);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi cập nhật khuyến mãi:", error);
            throw error;
        }
    }

    async deletePromotion(id) {
        try {
            const response = await this.api.request(`/${id}`, "DELETE");
            return response.data;
        } catch (error) {
            console.error("Lỗi khi xóa khuyến mãi:", error);
            throw error;
        }
    }
}

export default new PromotionService;