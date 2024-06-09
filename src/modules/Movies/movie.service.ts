import { inject, singleton } from "tsyringe";
import { HttpError, HttpService } from "../../shared/services/http.service";
import { TMovie } from "./movie.types";
import { MovieStore } from "./movie.store";
import { of } from "rxjs";
import { catchError, filter } from 'rxjs/operators';
import { ToastService } from "../../shared/services/toast.service";
import { t } from "i18next";
import { router } from "../../router";

@singleton()
export class MovieService {
  constructor(
    @inject(HttpService) private http: HttpService,
    @inject(MovieStore) private store: MovieStore,
    @inject(ToastService) private toast: ToastService
  ) { }

  public getMovies = () => {
  };

  public getMovieById = (id: number) => {
    this.http.get<TMovie>(`movies/${id}`)
      .pipe(
        catchError((err: HttpError) => {
          this.toast.error(err.body?.message || t("error.generic"));
          return of(null);
        })
      ).subscribe(movie => {
        this.store.movieInEdit.next(movie);
      });
  };

  public create = (movie: Partial<TMovie>) => {
    this.http.post<TMovie>('movies', movie)
      .pipe(
        catchError((err: HttpError) => {
          this.toast.error(err.body?.message || t("error.generic"));
          return of(null);
        }),
        filter(movie => !!movie)
      ).subscribe(movie => {
        this.toast.success(t("success"));
        router.navigate(`/movie/${movie?.id}`);
      });
  };

  public update = (movie: Partial<TMovie>) => {
    this.http.put<TMovie>(`movies/${movie.id}`, movie)
      .pipe(
        catchError((err: HttpError) => {
          this.toast.error(err.body?.message || t("error.generic"));
          return of(null);
        })
      ).subscribe(movie => console.log(movie));
  };

  public updatePage = (p: number) => {
    this.store.currentPage.next(p);
  };
}