import apiService from "./api.service";

class ArticleService {
    constructor() {
        this.api = new apiService('http://localhost:5000/api/v1/article');
    }

    async getArticles(limit = 0) {
        const params = new URLSearchParams();
        params.append('limit', limit);
        try {
            const response = await this.api.request(`?${params.toString()}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy danh sách bài viết:", error);
            throw error;
        }
    }

    async getArticleById(id) {
        try {
            const response = await this.api.request(`/${id}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy thông tin bài viết:", error);
            throw error;
        }
    }

    async createArticle(Article) {
        try {
            const response = await this.api.request("/", "POST", Article);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi tạo bài viết:", error);
            throw error;
        }
    }

    async updateArticle(id, Article) {
        try {
            const response = await this.api.request(`/${id}`, "PUT", Article);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi cập nhật bài viết:", error);
            throw error;
        }
    }

    async deleteArticle(id) {
        try {
            const response = await this.api.request(`/${id}`, "DELETE");
            return response.data;
        } catch (error) {
            console.error("Lỗi khi xóa bài viết:", error);
            throw error;
        }
    }
}

export default new ArticleService;