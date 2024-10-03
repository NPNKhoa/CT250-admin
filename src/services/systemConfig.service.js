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
      console.log(error.message || error);
      throw error;
    }
  }

  async updateConfig({
    shopLogoImgPath,
    shopName,
    shopEmail,
    shopPhoneNumber,
    shopIntroduction,
    bannerImgPath,
  }) {
    try {
      const formData = new FormData();

      if (shopLogoImgPath) {
        formData.append('shopLogoImgPath', shopLogoImgPath);
      }

      formData.append('shopName', shopName);
      formData.append('shopEmail', shopEmail);
      formData.append('shopPhoneNumber', shopPhoneNumber);
      formData.append('shopIntroduction', shopIntroduction);

      if (Array.isArray(bannerImgPath)) {
        bannerImgPath.forEach((banner, index) =>
          formData.append(`bannerImgPath[${index}]`, banner),
        );
      }

      const response = await this.api.put(`/`, formData, {
        'Content-Type': 'multipart/form-data',
      });

      if (response.error) {
        throw new Error(response.error);
      }

      return response;
    } catch (error) {
      console.log(error.message || error);
      throw error;
    }
  }
}

export default new SystemConfigService();
