import { inject, singleton } from "tsyringe";
import { StorageKey, StorageService } from "./storage.service";
import { TTokenData } from "../types/global.types";
import { router } from "../../router";

@singleton()
export class AuthService {

  constructor(
    @inject(StorageService) private storage: StorageService
  ) { }

  public isAuthenticated = (): boolean => {
    const tokens = this.storage.get<TTokenData>(StorageKey.TOKEN_DATA);
    return !!tokens;
  };

  public login = (tokens: TTokenData) => {
    this.storage.store(StorageKey.TOKEN_DATA, tokens);
    router.navigate('/');
  };

  public logout = () => {
    this.storage.reset();
    router.navigate('/signin');
  };
}