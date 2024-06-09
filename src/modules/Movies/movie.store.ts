import { BehaviorSubject } from "rxjs";
import { singleton } from "tsyringe";
import { TMovie } from "./movie.types";

const movies: TMovie[] = [
  { title: 'Ber', publishingYear: 2024, imageURL: 'https://www.movieposters.com/cdn/shop/products/c104f1bfed20481f35bc96cb9addc940_240x360_crop_center.progressive.jpg' },
  { title: 'Ber', publishingYear: 2024, imageURL: 'https://www.movieposters.com/cdn/shop/products/c104f1bfed20481f35bc96cb9addc940_240x360_crop_center.progressive.jpg' },
  { title: 'Ber', publishingYear: 2024, imageURL: 'https://www.movieposters.com/cdn/shop/products/c104f1bfed20481f35bc96cb9addc940_240x360_crop_center.progressive.jpg' },
  { title: 'Ber', publishingYear: 2024, imageURL: 'https://www.movieposters.com/cdn/shop/products/c104f1bfed20481f35bc96cb9addc940_240x360_crop_center.progressive.jpg' },
  { title: 'Ber', publishingYear: 2024, imageURL: 'https://www.movieposters.com/cdn/shop/products/c104f1bfed20481f35bc96cb9addc940_240x360_crop_center.progressive.jpg' },
  { title: 'Ber', publishingYear: 2024, imageURL: 'https://www.movieposters.com/cdn/shop/products/c104f1bfed20481f35bc96cb9addc940_240x360_crop_center.progressive.jpg' },
  { title: 'Ber', publishingYear: 2024, imageURL: 'https://www.movieposters.com/cdn/shop/products/c104f1bfed20481f35bc96cb9addc940_240x360_crop_center.progressive.jpg' },
  { title: 'The Double Life Of Véronique', publishingYear: 2024, imageURL: 'https://posterspy.com/wp-content/uploads/2023/01/Veronique.jpg' }
];
@singleton()
export class MovieStore {
  public movies = new BehaviorSubject<TMovie[]>(movies);
}