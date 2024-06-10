import { inject, singleton } from "tsyringe";
import { HttpError, HttpService } from "../../shared/services/http.service";
import { TFilters, TMovie, TMoviesResponse, TPaginationInfo, defaultSearchParams } from "./movie.types";
import { MovieStore } from "./movie.store";
import { of } from "rxjs";
import { catchError, filter } from 'rxjs/operators';
import { ToastService } from "../../shared/services/toast.service";
import { t } from "i18next";
import { router } from "../../router";
import { MOVIE_LIMIT } from "../../shared/constants/global.constants";
import { AuthService } from "../../shared/services/auth.servic";
import { LoaderService } from "../../shared/services/loader.service";
import { deepEqual } from "../../shared/utils";
import { AssetService } from "../../shared/services/asset.service";

@singleton()
export class MovieService {
  constructor(
    @inject(HttpService) private http: HttpService,
    @inject(MovieStore) private store: MovieStore,
    @inject(ToastService) private toast: ToastService,
    @inject(AuthService) private auth: AuthService,
    @inject(LoaderService) private loader: LoaderService,
    @inject(AssetService) private asset: AssetService
  ) { }

  public getMovies = () => {
    this.loader.start();
    const { searchFilters } = this.store;
    const searchParams = new URLSearchParams();
    searchParams.append("limit", MOVIE_LIMIT.toString());
    if (searchFilters.value) {
      Object.keys(searchFilters.value).forEach((key) => {
        if (key === 'page') {
          searchParams.append("offset", ((searchFilters.value[key] - 1) * MOVIE_LIMIT).toString());
        } else if (key === 'sortingBy' && searchFilters.value.sortingBy) {
          searchParams.append("sortingBy", searchFilters.value[key]?.toString());
          searchParams.append("sortingDirection", searchFilters.value[key] === 'title' ? "ASC" : "DESC");
        } else if (searchFilters.value[key as keyof TFilters]) {
          searchParams.append(key, searchFilters.value[key as keyof TFilters].toString());
        }
      });
    }
    this.http.get<TMoviesResponse>('movies', searchParams)
      .pipe(
        catchError((err: HttpError) => {
          this.loader.finish();
          this.toast.error(err.body?.message || t("error.generic"));
          err.status === 401 && this.clearDataAndLogout();
          err.status === 400 && this.updateSearchFilters({ reset: true });
          return of(null);
        }),
        filter(res => !!res)
      ).subscribe(res => {
        this.loader.finish();
        this.store.movies.next(res?.movies?.length ? this.mapMoviesToClientModel(res.movies) : null);
        this.store.paginationInfo.next(res?.paginationInfo as TPaginationInfo);
      });
  };

  public getMovieById = (id: number) => {
    this.loader.start();
    this.http.get<TMovie>(`movies/${id}`)
      .pipe(
        catchError((err: HttpError) => {
          this.loader.finish();
          this.toast.error(err.body?.message || t("error.generic"));
          err.status === 401 && this.clearDataAndLogout();
          err.status === 404 && router.navigate('/not-found');
          return of(null);
        }),
        filter(movie => !!movie)
      ).subscribe(movie => {
        this.loader.finish();
        this.store.movieInEdit.next(this.mapMoviesToClientModel([movie])[0]);
      });
  };

  public create = async (movie: Partial<TMovie>) => {
    this.loader.start();
    const processedMovie = this.removeEmptyFields(movie);
    if (processedMovie.file) {
      const fileURL = await this.asset.uploadImage(processedMovie.file);
      if (!fileURL) {
        this.loader.finish();
        this.toast.error(t("error.upload-failed"));
        return;
      }
      delete processedMovie.file;
      processedMovie.imageURL = fileURL;
    }
    this.http.post<TMovie>('movies', processedMovie)
      .pipe(
        catchError((err: HttpError) => {
          this.loader.finish();
          this.toast.error(err.body?.message || t("error.generic"));
          err.status === 401 && this.clearDataAndLogout();
          return of(null);
        }),
        filter(movie => !!movie)
      ).subscribe(() => {
        this.loader.finish();
        this.toast.success(t("operation.success"));
        this.updateSearchFilters({ reset: true });
        router.navigate(`/`, { replace: true });
      });
  };

  public update = async (movie: Partial<TMovie>) => {
    this.loader.start();
    if (movie.file) {
      const fileURL = await this.asset.uploadImage(movie.file);
      if (!fileURL) {
        this.loader.finish();
        this.toast.error(t("error.upload-failed"));
        return;
      }
      delete movie.file;
      movie.imageURL = fileURL;
    }
    const processedMovie = this.generateUpdatePayload(movie);
    this.http.put<TMovie>(`movies/${movie.id}`, processedMovie)
      .pipe(
        catchError((err: HttpError) => {
          this.loader.finish();
          this.toast.error(err.body?.message || t("error.generic"));
          err.status === 401 && this.clearDataAndLogout();
          return of(null);
        }),
        filter(movie => !!movie)
      ).subscribe(movie => {
        this.loader.finish();
        this.toast.success(t("operation.success"));
        this.store.movieInEdit.next(movie);
      });
  };

  public removeMovieInEdit = () => {
    this.store.movieInEdit.next(null);
  };

  public updateSearchFilters = (options: {
    filter?: Partial<TFilters>;
    partial?: boolean;
    reset?: boolean;
    skipUpdate?: boolean;
  }) => {
    const { filter, partial, reset, skipUpdate } = options;
    const { value } = this.store.searchFilters;
    let newValue: TFilters = filter as TFilters;
    if (reset) {
      newValue = defaultSearchParams;
    }
    if (partial) {
      newValue = { ...value, ...filter } as TFilters;
    }
    if (deepEqual(value, newValue) || skipUpdate) return;
    this.store.searchFilters.next(newValue);
    this.getMovies();
  };

  public clearDataAndLogout = () => {
    this.store.movieInEdit.next(null);
    this.store.movies.next(null);
    this.store.paginationInfo.next(null);
    this.store.searchFilters.next({});
    this.auth.logout();
  };

  private removeEmptyFields = (movie: Partial<TMovie>) => {
    let processed: Partial<TMovie> = {};
    Object.entries(movie).forEach(entry => {
      if (entry[1] !== null && entry[1] !== undefined && entry[1] !== "" && entry[0] !== 'id') {
        const key = entry[0];
        processed = Object.assign({ ...processed, [key]: entry[1] });
      }
    });
    return processed;
  };

  private generateUpdatePayload = (movie: Partial<TMovie>) => {
    const payloadFields: (keyof TMovie)[] = [
      'title', 'publishingYear', 'publishingCountry', 'imageURL', 'genre', 'rating'
    ];
    return payloadFields.reduce((obj, key) => {
      if (movie[key] !== null && movie[key] !== undefined && movie[key] !== "") {
        return { ...obj, [key]: movie[key] };
      }
      return obj;
    }, {});
  };

  private mapMoviesToClientModel = (movies: TMovie[]): Partial<TMovie[]> => {
    return movies.map(m => {
      return { ...m, directorFullName: m.director?.fullName || null };
    });
  };
}