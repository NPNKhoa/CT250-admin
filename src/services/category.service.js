import apiService from "./api.service";

class CategoryService {
    constructor() {
        this.api = new apiService('http://localhost:5000/api/v1/categories');
    }

    async getCategories() {
        try {
            const response = await this.api.request("/");
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy danh sách danh mục:", error);
            throw error;
        }
    }

    async createCategory(Category) {
        try {
            const response = await this.api.request("/", "POST", Category);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi tạo danh mục:", error);
            throw error;
        }
    }

    async updateCategory(id, Category) {
        try {
            const response = await this.api.request(`/${id}`, "PUT", Category);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi cập nhật danh mục:", error);
            throw error;
        }
    }

    async deleteCategory(id) {
        try {
            const response = await this.api.request(`/${id}`, "DELETE");
            return response.data;
        } catch (error) {
            console.error("Lỗi khi xóa danh mục:", error);
            throw error;
        }
    }
}

export default new CategoryService;