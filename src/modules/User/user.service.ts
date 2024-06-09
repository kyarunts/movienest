import { inject, singleton } from "tsyringe";
import { HttpError, HttpService } from "../../shared/services/http.service";
import { TSigninForm, TSignupForm } from "./user.types";
import { of } from "rxjs";
import { catchError } from 'rxjs/operators';
import { UserStore } from "./user.store";
import { TTokenData } from "../../shared/types/global.types";
import { AuthService } from "../../shared/services/auth.servic";

@singleton()
export class UserService {
  constructor(
    @inject(HttpService) private http: HttpService,
    @inject(UserStore) private store: UserStore,
    @inject(AuthService) private auth: AuthService
  ) { }

  public signup = (signupForm: TSignupForm) => {
    this.store.signupState.next('loading');
    this.http.post<TTokenData>('auth/signup', signupForm, true)
      .pipe(
        catchError((err: HttpError) => {
          return of(null);
        }),
      )
      .subscribe(tokens => tokens && this.login(tokens));
  };

  public signin = (signinForm: TSigninForm) => {
    this.auth.login({ accessToken: 'a', refreshToken: 'b' });
    this.http.post<TTokenData>('auth/signin', signinForm, true)
      .pipe(
        catchError((err: HttpError) => {
          return of(null);
        }),
      )
      .subscribe(tokens => tokens && this.login(tokens));
  };

  private login = (tokens: TTokenData) => {

  };
}