import ApiService from './api.service';

class CoreValueService {
  constructor(path = '/system-configurations/core-value') {
    this.path = path;
    this.api = new ApiService(`${import.meta.env.VITE_API_BASE_URL}${path}`);
  }

  async getCoreValues() {
    try {
      return await this.api.get(`/`);
    } catch (error) {
      console.log(error.message || error);
      throw error;
    }
  }

  async addCoreValue({ title, content }) {
    try {
      return await this.api.post('/', { title, content });
    } catch (error) {
      console.log(error.message || error);
      throw error;
    }
  }
}

export default new CoreValueService();
