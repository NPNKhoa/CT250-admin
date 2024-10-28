import apiService from './api.service';

class FeedbackService {
  constructor() {
    this.api = new apiService('http://localhost:5000/api/v1/feedback');
  }

  async getLatestFeedback() {
    try {
      return await this.api.get('/latest');
    } catch (error) {
      console.error('Lỗi khi lấy phản hồi:', error);
      throw error;
    }
  }
}

export default new FeedbackService();
