import apiService from "./api.service";

class ServiceService {
    constructor() {
        this.api = new apiService('http://localhost:5000/api/v1/service');
    }

    async getServices(limit = -1) {
        const params = new URLSearchParams();
        params.append('limit', limit);
        try {
            const response = await this.api.request(`?${params.toString()}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy danh sách dịch vụ:", error);
            throw error;
        }
    }

    async getServiceById(id) {
        try {
            const response = await this.api.request(`/${id}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy thông tin dịch vụ:", error);
            throw error;
        }
    }

    async createService(Service) {
        try {
            const response = await this.api.request("/", "POST", Service);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi tạo dịch vụ:", error);
            throw error;
        }
    }

    async updateService(id, Service) {
        try {
            const response = await this.api.request(`/${id}`, "PUT", Service);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi cập nhật dịch vụ:", error);
            throw error;
        }
    }

    async deleteService(id) {
        try {
            const response = await this.api.request(`/${id}`, "DELETE");
            return response.data;
        } catch (error) {
            console.error("Lỗi khi xóa dịch vụ:", error);
            throw error;
        }
    }
}

export default new ServiceService;