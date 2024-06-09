import { inject, singleton } from "tsyringe";
import { HttpError, HttpService } from "../../shared/services/http.service";
import { TSigninForm, TSignupForm, TTokenData } from "./auth.types";
import { of } from "rxjs";
import { catchError } from 'rxjs/operators';
import { AuthStore } from "./auth.store";

@singleton()
export class AuthService {
  constructor(
    @inject(HttpService) private http: HttpService,
    @inject(AuthStore) private store: AuthStore
  ) { }

  public signup = (signupForm: TSignupForm) => {
    this.store.signupState.next('loading');
    return this.http.post<TTokenData>('auth/signup', signupForm, true)
      .pipe(
        catchError((err: HttpError) => {
          return of(null);
        }),
      )
      .subscribe(tokens => tokens && this.login(tokens));
  };

  public signin = (signinForm: TSigninForm) => {
    return this.http.post<TTokenData>('auth/signin', signinForm, true)
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