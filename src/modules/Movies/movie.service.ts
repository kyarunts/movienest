import { inject, singleton } from "tsyringe";
import { HttpService } from "../../shared/services/http.service";
import { TMovie } from "./movie.types";
import { MovieStore } from "./movie.store";

@singleton()
export class MovieService {
  constructor(
    @inject(HttpService) private http: HttpService,
    @inject(MovieStore) private store: MovieStore
  ) { }

  public getMovies = () => {

  };

  public create = (movie: Partial<TMovie>) => {
    console.log(movie);
  };

  public update = (movie: Partial<TMovie>) => {
    console.log(movie);
  };

  public updatePage = (p: number) => {
    this.store.currentPage.next(p);
  };
}