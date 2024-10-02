import apiService from './api.service';
class SystemConfigService {
  constructor(path = '/system-configurations') {
    this.path = path;
  }

  async getConfig() {
    try {
      return await apiService.get(`${this.path}/current`);
    } catch (error) {
      console.log(error?.message || error);
      throw error;
    }
  }
}

export default new SystemConfigService();
