class JwtStorageService {
  TOKEN_NAME = 'company_user_access_token';

  getToken(): string {
    return sessionStorage.getItem(this.TOKEN_NAME);
  }

  setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_NAME, token);
  }

  removeToken(): void {
    sessionStorage.removeItem(this.TOKEN_NAME);
  }
}

export default new JwtStorageService();
