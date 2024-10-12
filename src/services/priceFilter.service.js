import ApiService from './api.service';

class PriceFilterService {
  constructor(path = '/price-filter') {
    this.path = path;
    this.api = new ApiService(`${import.meta.env.VITE_API_BASE_URL}${path}`);
  }

  async getPriceFilters() {
    try {
      const data = await this.api.get('/');

      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addPriceFilter(fromPrice, toPrice) {
    try {
      const data = await this.api.post('/', { fromPrice, toPrice });

      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  }

  async updatePriceFilter(id, payload) {
    try {
      const data = await this.api.put(`/${id}`, payload);

      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  }

  async deletePriceFilter(id) {
    try {
      const data = await this.api.delete(`/${id}`);

      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  }
}

export default new PriceFilterService();
