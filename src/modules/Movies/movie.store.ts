import { BehaviorSubject } from "rxjs";
import { singleton } from "tsyringe";
import { TMovie, TPaginationInfo } from "./movie.types";

@singleton()
export class MovieStore {
  public movies = new BehaviorSubject<TMovie[] | null>(null);
  public currentPage = new BehaviorSubject<number | null>(null);
  public movieInEdit = new BehaviorSubject<TMovie | null>(null);
  public paginationInfo = new BehaviorSubject<TPaginationInfo | null>(null);
  public searchFilters = new BehaviorSubject<Record<string, string | number> | null>(null);
}