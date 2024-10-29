export class TokenService {
  private static _instance: TokenService | null = null; // Служебная статическая переменная для хранения экземпляра
  private key: string;

  // Конструктор должен быть приватным, чтобы предотвратить создание экземляров извне
  private constructor(key: string) {
    this.key = key;
  }

  // Статический метод для получения экземпляра синглтона
  public static getInstance(key: string): TokenService {
    if (this._instance === null) {
      this._instance = new TokenService(key);
    }
    return this._instance;
  }

  setToken = (token: string) => {
    localStorage.setItem(this.key, token);
  };

  clearToken = () => {
    localStorage.removeItem(this.key);
  };

  getToken = () => {
    return localStorage.getItem(this.key);
  };

  checkToken = () => {
    return !!localStorage.getItem(this.key);
  };
}
