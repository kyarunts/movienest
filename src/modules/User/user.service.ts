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
import { LoaderService } from "../../shared/services/loader.service";

@singleton()
export class UserService {
  constructor(
    @inject(HttpService) private http: HttpService,
    @inject(UserStore) private store: UserStore,
    @inject(AuthService) private auth: AuthService,
    @inject(ToastService) private toast: ToastService,
    @inject(LoaderService) private loader: LoaderService
  ) { }

  public signup = (signupForm: TSignupForm) => {
    this.loader.start();
    const { email, password } = signupForm;
    this.http.post<TTokenData>('signup', { email, password }, true)
      .pipe(
        catchError((err: HttpError) => {
          this.loader.finish();
          this.toast.error(err.body?.message || t("error.generic"));
          return of(null);
        }),
        filter(tokens => !!tokens)
      )
      .subscribe(tokens => {
        this.loader.finish();
        tokens && this.auth.login(tokens);
      });
  };

  public signin = (signinForm: TSigninForm) => {
    this.loader.start();
    this.http.post<TTokenData>('signin', signinForm, true)
      .pipe(
        catchError((err: HttpError) => {
          this.loader.finish();
          this.toast.error(err.body?.message || t("error.generic"));
          return of(null);
        }),
        filter(tokens => !!tokens)
      )
      .subscribe(tokens => {
        this.loader.finish();
        tokens && this.auth.login(tokens);
      });
  };
}