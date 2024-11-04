import ApiService from './api.service';

class CommentService {
  constructor() {
    this.api = new ApiService('http://localhost:5000/api/v1/comments');
  }

  async createComment(data) {
    try {
      const response = await this.api.request('/', 'POST', data);
      return response.data;
    } catch (error) {
      console.error('Error when creating comment:', error);
      throw error;
    }
  }

  async getAllProductComment(productId) {
    try {
      return await this.api.get('/byproduct', {
        params: {
          productId,
        },
      });
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getAllComments() {
    try {
      return await this.api.get('/all');
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async addReply(reviewId, replyContent, accessToken) {
    try {
      const response = await this.api.post(
        `/${reviewId}`, // Thay đổi endpoint cho phù hợp với API
        { replyContent }, // Gửi đúng nội dung
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Xác thực bằng token
          },
        },
      );
      return response.data; // Trả về dữ liệu nhận được từ API
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error adding reply'); // Thông báo lỗi
    }
  }
}

export default new CommentService();
