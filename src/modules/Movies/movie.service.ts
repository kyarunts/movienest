import { inject, singleton } from "tsyringe";
import { HttpError, HttpService } from "../../shared/services/http.service";
import { TMovie, TMoviesResponse, TPaginationInfo } from "./movie.types";
import { MovieStore } from "./movie.store";
import { of } from "rxjs";
import { catchError, filter } from 'rxjs/operators';
import { ToastService } from "../../shared/services/toast.service";
import { t } from "i18next";
import { router } from "../../router";
import { MOVIE_LIMIT } from "../../shared/constants/global.constants";
import { AuthService } from "../../shared/services/auth.servic";

@singleton()
export class MovieService {
  constructor(
    @inject(HttpService) private http: HttpService,
    @inject(MovieStore) private store: MovieStore,
    @inject(ToastService) private toast: ToastService,
    @inject(AuthService) private auth: AuthService
  ) { }

  public getMovies = () => {
    const { currentPage, searchFilters } = this.store;
    const searchParams = new URLSearchParams();
    searchParams.append("limit", MOVIE_LIMIT.toString());
    searchParams.append("offset", (((currentPage.value as number) - 1) * MOVIE_LIMIT).toString());
    console.log(searchFilters.value);
    if (searchFilters.value) {
      Object.keys(searchFilters.value).forEach(key => {
        searchParams.append(key, (searchFilters.value as Record<string, string | number>)[key].toString());
      });
    }
    this.http.get<TMoviesResponse>('movies', searchParams)
      .pipe(
        catchError((err: HttpError) => {
          this.toast.error(err.body?.message || t("error.generic"));
          err.status === 401 && this.auth.logout();
          return of(null);
        }),
        filter(res => !!res)
      ).subscribe(res => {
        this.store.movies.next(res?.movies?.length ? res.movies : null);
        this.store.paginationInfo.next(res?.paginationInfo as TPaginationInfo);
      });
  };

  public getMovieById = (id: number) => {
    this.http.get<TMovie>(`movies/${id}`)
      .pipe(
        catchError((err: HttpError) => {
          this.toast.error(err.body?.message || t("error.generic"));
          err.status === 401 && this.auth.logout();
          return of(null);
        }),
        filter(movie => !!movie)
      ).subscribe(movie => {
        this.store.movieInEdit.next(movie);
      });
  };

  public create = (movie: Partial<TMovie>) => {
    this.http.post<TMovie>('movies', movie)
      .pipe(
        catchError((err: HttpError) => {
          this.toast.error(err.body?.message || t("error.generic"));
          err.status === 401 && this.auth.logout();
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
          err.status === 401 && this.auth.logout();
          return of(null);
        }),
        filter(movie => !!movie)
      ).subscribe(movie => {
        this.toast.success(t("success"));
        this.store.movieInEdit.next(movie);
      });
  };

  public removeMovieInEdit = () => {
    this.store.movieInEdit.next(null);
  };

  public updatePage = (p: number) => {
    this.store.currentPage.next(p);
    this.getMovies();
  };

  public updateSearchFilters = (filter: Record<string, string | number>) => {
    const { value } = this.store.searchFilters;
    this.store.searchFilters.next({ ...value, ...filter });
    this.getMovies();
  };
}