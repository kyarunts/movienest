import { inject, singleton } from "tsyringe";
import { HttpService } from "../../shared/services/http.service";
import { TMovie } from "./movie.types";

@singleton()
export class MovieService {
  constructor(
    @inject(HttpService) private http: HttpService
  ) { }

  public getMovies = () => {

  };

  public create = (movie: Partial<TMovie>) => {
    console.log(movie);
  };

  public update = (movie: Partial<TMovie>) => {
    console.log(movie);
  };
}