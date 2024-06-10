import { singleton } from "tsyringe";

export enum StorageKey {
  TOKEN_DATA = 'TOKEN_DATA',
}

@singleton()
export class StorageService {
  store(key: StorageKey, data: string | object) {
    localStorage.setItem(key, typeof data === 'string' ? data : JSON.stringify(data));
  }

  get<T>(key: StorageKey): T | null {
    const data = localStorage.getItem(key);
    if (!data) return null;

    try {
      return JSON.parse(data) as T;
    } catch {
      return data as T;
    }
  }

  remove(key: StorageKey) {
    localStorage.removeItem(key);
  }

  reset() {
    Object.values(StorageKey).forEach(key => this.remove(key));
  }
}
