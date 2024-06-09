import { BehaviorSubject } from "rxjs";
import { singleton } from "tsyringe";
import { TMovie } from "./movie.types";

const movies: TMovie[] = [
  { id: 1, title: 'Ber', publishingYear: 2024, imageURL: 'https://www.movieposters.com/cdn/shop/products/c104f1bfed20481f35bc96cb9addc940_240x360_crop_center.progressive.jpg' },
  { id: 2, title: 'Ber', publishingYear: 2024, imageURL: 'https://www.movieposters.com/cdn/shop/products/c104f1bfed20481f35bc96cb9addc940_240x360_crop_center.progressive.jpg' },
];
@singleton()
export class MovieStore {
  public movies = new BehaviorSubject<TMovie[]>(movies);
  public currentPage = new BehaviorSubject<number | null>(null);
  public movieInEdit = new BehaviorSubject<TMovie | null>(null);
}