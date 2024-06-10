import { BehaviorSubject } from "rxjs";
import { singleton } from "tsyringe";
import { TFilters, TMovie, TPaginationInfo } from "./movie.types";

@singleton()
export class MovieStore {
  public movies = new BehaviorSubject<TMovie[] | null>(null);
  public movieInEdit = new BehaviorSubject<TMovie | null>(null);
  public paginationInfo = new BehaviorSubject<TPaginationInfo | null>(null);
  public searchFilters = new BehaviorSubject<Partial<TFilters>>(null);
}