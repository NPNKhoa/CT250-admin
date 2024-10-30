import authService from './auth.service';

class ApiService {
  constructor(baseUrl = import.meta.env.VITE_API_BASE_URL) {
    this.baseUrl = baseUrl || 'http://localhost:5000/api/v1';
    this.authService = authService;
  }

  async request(endpoint, method = 'GET', body = null, headers = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const accessToken = this.authService.getAccessToken();

    const options = {
      method,
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
        ...headers,
      },
    };

    if (body instanceof FormData) {
      options.body = body;
      delete options.headers['Content-Type'];
    } else if (body && method !== 'GET' && method !== 'HEAD') {
      options.body = JSON.stringify(body);
      options.headers['Content-Type'] = 'application/json';
    }

    try {
      const response = await fetch(url, options);

      if (
        response.status === 401 &&
        response.json().error === 'Token expired!'
      ) {
        const newToken = await this.refreshToken();

        if (newToken) {
          return this.retryRequest(endpoint, method, body, headers);
        } else {
          throw new Error('Unable to refresh token');
        }
      }

      const data = await response.json();

      if (data.error) {
        console.log(data.error);
        throw new Error(data.error || 'Error on fetching data');
      }

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async refreshToken() {
    const refreshToken = this.authService.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No Refresh Token available');
    }

    try {
      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json();

      if (data.error) {
        console.log(data.error);
        throw new Error(data.error);
      }

      this.authService.setAccessToken(data.accessToken);
      this.authService.setRefreshToken(data.refreshToken);

      return data.accessToken;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async retryRequest(endpoint, method, body, headers) {
    const url = `${this.baseUrl}${endpoint}`;
    const newAccessToken = this.authService.getAccessToken();

    const options = {
      method,
      headers: {
        Authorization: `Bearer ${newAccessToken}`,
        ...headers,
      },
    };

    if (body instanceof FormData) {
      options.body = body;
      delete options.headers['Content-Type'];
    } else if (body && method !== 'GET' && method !== 'HEAD') {
      options.body = JSON.stringify(body);
      options.headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, options);

    const data = await response.json();

    if (data.error) {
      console.log(data.error);
      throw new Error(data.error);
    }

    return data;
  }

  get(endpoint, headers = {}) {
    return this.request(endpoint, 'GET', null, headers);
  }

  post(endpoint, body, headers = {}) {
    return this.request(endpoint, 'POST', body, headers);
  }

  put(endpoint, body, headers = {}) {
    return this.request(endpoint, 'PUT', body, headers);
  }

  delete(endpoint, headers = {}) {
    return this.request(endpoint, 'DELETE', null, headers);
  }
}

export default ApiService;
