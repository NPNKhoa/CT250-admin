import apiService from "./api.service";

class BrandService {
    constructor() {
        this.api = new apiService('http://localhost:5000/api/v1/brands');
    }

    async getBrands(limit = -1) {
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

    async getBrandById(id) {
        try {
            const response = await this.api.request(`/${id}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy thông tin thương hiệu:", error);
            throw error;
        }
    }

    async createBrand(Brand) {
        try {
            const response = await this.api.request("/", "POST", Brand);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi tạo thương hiệu:", error);
            throw error;
        }
    }

    async updateBrand(id, Brand) {
        try {
            const response = await this.api.request(`/${id}`, "PUT", Brand);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi cập nhật thương hiệu:", error);
            throw error;
        }
    }

    async deleteBrand(id) {
        try {
            const response = await this.api.request(`/${id}`, "DELETE");
            return response.data;
        } catch (error) {
            console.error("Lỗi khi xóa thương hiệu:", error);
            throw error;
        }
    }
}

export default new BrandService;