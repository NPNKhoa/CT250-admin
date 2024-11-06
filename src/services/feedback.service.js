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

  async getAllFeedback() {
    try {
      return await this.api.get('/all');
    } catch (error) {
      console.error('Lỗi khi lấy phản hồi:', error);
      throw error;
    }
  }

  async checkIfLoyalCustomer(senderEmail) {
    try {
      return await this.api.get('/check', { senderEmail });
    } catch (error) {
      console.error('Lỗi khi kiểm tra khách hàng trung thành:', error);
      throw error;
    }
  }

  async replyEmail(feedbackId, answer) {
    try {
      return await this.api.post('/reply', { feedbackId, answer });
    } catch (error) {
      console.error('Lỗi khi trả lời email:', error);
      throw error;
    }
  }
}

export default new FeedbackService();
