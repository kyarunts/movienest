import { inject, singleton } from "tsyringe";
import { HttpService } from "../../shared/services/http.service";

@singleton()
export class MovieService {
  constructor(
    @inject(HttpService) private http: HttpService
  ) { }

  public getMovies = () => {
    
  }
}