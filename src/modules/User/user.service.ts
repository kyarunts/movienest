import { inject, singleton } from "tsyringe";
import { HttpError, HttpService } from "../../shared/services/http.service";
import { TSigninForm, TSignupForm } from "./user.types";
import { of } from "rxjs";
import { catchError, filter } from 'rxjs/operators';
import { UserStore } from "./user.store";
import { TTokenData } from "../../shared/types/global.types";
import { AuthService } from "../../shared/services/auth.servic";
import { ToastService } from "../../shared/services/toast.service";
import { t } from "i18next";

@singleton()
export class UserService {
  constructor(
    @inject(HttpService) private http: HttpService,
    @inject(UserStore) private store: UserStore,
    @inject(AuthService) private auth: AuthService,
    @inject(ToastService) private toast: ToastService
  ) { }

  public signup = (signupForm: TSignupForm) => {
    const { email, password } = signupForm;
    this.http.post<TTokenData>('signup', { email, password }, true)
      .pipe(
        catchError((err: HttpError) => {
          this.toast.error(err.body?.message || t("error.generic"));
          return of(null);
        })
      )
      .subscribe(tokens => tokens && this.auth.login(tokens));
  };

  public signin = (signinForm: TSigninForm) => {
    this.http.post<TTokenData>('signin', signinForm, true)
      .pipe(
        catchError((err: HttpError) => {
          this.toast.error(err.body?.message || t("error.generic"));
          return of(null);
        }),
      )
      .subscribe(tokens => tokens && this.auth.login(tokens));
  };
}