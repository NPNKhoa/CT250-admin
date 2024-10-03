import ApiService from './api.service';
class SystemConfigService {
  constructor(path = '/system-configurations') {
    this.path = path;
    this.api = new ApiService(`${import.meta.env.VITE_API_BASE_URL}${path}`);
  }

  async getConfig() {
    try {
      return await this.api.get(`/current`);
    } catch (error) {
      console.log(error?.message || error);
      throw error;
    }
  }
}

export default new SystemConfigService();
