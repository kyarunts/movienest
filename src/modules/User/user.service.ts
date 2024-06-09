import { inject, singleton } from "tsyringe";
import { HttpError, HttpService } from "../../shared/services/http.service";
import { TSigninForm, TSignupForm } from "./user.types";
import { of } from "rxjs";
import { catchError } from 'rxjs/operators';
import { UserStore } from "./user.store";
import { TTokenData } from "../../shared/types/global.types";

@singleton()
export class UserService {
  constructor(
    @inject(HttpService) private http: HttpService,
    @inject(UserStore) private store: UserStore
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