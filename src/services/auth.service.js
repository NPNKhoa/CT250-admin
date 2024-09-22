class AuthService {
  constructor() {
    this.accessTokenKey = 'accessToken';
    this.refreshTokenKey = 'refreshToken';
  }

  setAccessToken(token) {
    localStorage.setItem(this.accessTokenKey, token);
  }

  getAccessToken() {
    return localStorage.getItem(this.accessTokenKey);
  }

  clearAccessToken() {
    localStorage.removeItem(this.accessTokenKey);
  }

  setRefreshToken(token) {
    localStorage.setItem(this.refreshTokenKey, token);
  }

  getRefreshToken() {
    return localStorage.getItem(this.refreshTokenKey);
  }

  clearRefreshToken() {
    localStorage.removeItem(this.refreshTokenKey);
  }

  clearTokens() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  isAuthenticated() {
    return this.getAccessToken() !== null;
  }
}
export default new AuthService();
