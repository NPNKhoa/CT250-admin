import apiService from "./api.service";

class SpecificationService {
    constructor() {
        this.api = new apiService('http://localhost:5000/api/v1/specification');
    }

    async getSpecifications(limit = -1) {
        const params = new URLSearchParams();
        params.append('limit', limit);
        try {
            const response = await this.api.request(`?${params.toString()}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy danh sách thông số kỹ thuật:", error);
            throw error;
        }
    }

    async getSpecificationById(id) {
        try {
            const response = await this.api.request(`/${id}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy thông tin thông số kỹ thuật:", error);
            throw error;
        }
    }

    async createSpecification(Specification) {
        try {
            const response = await this.api.request("/", "POST", Specification);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi tạo thông số kỹ thuật:", error);
            throw error;
        }
    }

    async updateSpecification(id, Specification) {
        try {
            const response = await this.api.request(`/${id}`, "PUT", Specification);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi cập nhật thông số kỹ thuật:", error);
            throw error;
        }
    }

    async deleteSpecification(id) {
        try {
            const response = await this.api.request(`/${id}`, "DELETE");
            return response.data;
        } catch (error) {
            console.error("Lỗi khi xóa thông số kỹ thuật:", error);
            throw error;
        }
    }
}

export default new SpecificationService;