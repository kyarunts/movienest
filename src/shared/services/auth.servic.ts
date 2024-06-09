import { inject, singleton } from "tsyringe";
import { StorageKey, StorageService } from "./storage/storage.service";
import { TTokenData } from "../types/global.types";

@singleton()
export class AuthService {
  constructor(
    @inject(StorageService) private storage: StorageService
  ) { }

  public isAuthenticated = (): boolean => {
    const tokens = this.storage.get<TTokenData>(StorageKey.TOKEN_DATA);
    console.log(tokens);
    return false;
  };
}