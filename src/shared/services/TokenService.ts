import { Profile } from '@/shared/api-types.ts';

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

  setProfile = (profile: Profile) => {
    localStorage.setItem(this.key + 'profile', JSON.stringify(profile));
  };

  getProfile = () => {
    const raw = localStorage.getItem(this.key + 'profile') ?? '';
    return raw && JSON.parse(raw);
  };

  checkProfile = () => {
    return !!localStorage.getItem(this.key + 'profile');
  };

  clearToken = () => {
    localStorage.removeItem(this.key);
    localStorage.removeItem(this.key + 'profile');
  };

  getToken = () => {
    return localStorage.getItem(this.key) || '';
  };

  checkTokens = () => {
    return (
      !!localStorage.getItem(this.key) &&
      !!localStorage.getItem(this.key + 'profile')
    );
  };
}
