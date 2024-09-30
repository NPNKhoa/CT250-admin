import apiService from "./api.service";

class ProductsService {
    constructor() {
        this.api = new apiService('http://localhost:5000/api/v1/products');
    }

    async getProducts(limit = -1) {
        const params = new URLSearchParams();
        params.append('limit', limit);
        try {
            const response = await this.api.request(`?${params.toString()}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy danh sách sản phẩm:", error);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const response = await this.api.request(`/${id}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy thông tin sản phẩm:", error);
            throw error;
        }
    }

    async createProduct(product) {
        try {
            const response = await this.api.request("/", "POST", product);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi tạo sản phẩm:", error);
            throw error;
        }
    }

    async updateProduct(id, product) {
        try {
            const response = await this.api.request(`/${id}`, "PUT", product);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const response = await this.api.request(`/${id}`, "DELETE");
            return response.data;
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
            throw error;
        }
    }

    async uploadImage(files) {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("images", file);
        });
        try {
            const response = await this.api.request("/upload-image", "POST", formData);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi tải ảnh lên:", error);
            throw error;
        }
    }
}

export default new ProductsService();