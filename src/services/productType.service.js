import apiService from "./api.service";

class ProductTypeService {
    constructor() {
        this.api = new apiService('http://localhost:5000/api/v1/product-types');
    }

    async getProductTypes(limit = -1) {
        const params = new URLSearchParams();
        params.append('limit', limit);
        try {
            const response = await this.api.request(`?${params.toString()}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy danh sách loại sản phẩm:", error);
            throw error;
        }
    }

    async getProductTypeById(id) {
        try {
            const response = await this.api.request(`/${id}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy thông tin loại sản phẩm:", error);
            throw error;
        }
    }

    async createProductType(ProductType) {
        try {
            const response = await this.api.request("/", "POST", ProductType);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi tạo loại sản phẩm:", error);
            throw error;
        }
    }

    async updateProductType(id, ProductType) {
        try {
            const response = await this.api.request(`/${id}`, "PUT", ProductType);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi cập nhật loại sản phẩm:", error);
            throw error;
        }
    }

    async deleteProductType(id) {
        try {
            const response = await this.api.request(`/${id}`, "DELETE");
            return response.data;
        } catch (error) {
            console.error("Lỗi khi xóa loại sản phẩm:", error);
            throw error;
        }
    }
}

export default new ProductTypeService;