export type TMovie = {
  title: string;
  publishingYear: number;
  imageURL: string;
  publishingCountry?: string;
  genre?: string;
  rating?: number;
  directorFullName?: string;
  id?: number;
  file?: File;
}