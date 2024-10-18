import ApiService from './api.service';

class FounderService {
  constructor(path = '/system-configurations/founder') {
    this.path = path;
    this.api = new ApiService(`${import.meta.env.VITE_API_BASE_URL}${path}`);
  }

  async getFounders() {
    try {
      return await this.api.get(`/`);
    } catch (error) {
      console.log(error.message || error);
      throw error;
    }
  }

  async addFounder({ founderName, founderAvatarPath }) {
    try {
      const formData = new FormData();

      formData.append('founderName', founderName);
      formData.append('founderAvatarPath', founderAvatarPath);

      return await this.api.post('/', formData);
    } catch (error) {
      console.log(error.message || error);
      throw error;
    }
  }
}

export default new FounderService();
