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
};

export type TPaginationInfo = {
  count: number;
  currentPage: number;
  totalPages: number;
};

export type TMoviesResponse = {
  movies: TMovie[];
  paginationInfo: TPaginationInfo;
};

export type TFiltersForm = {
  genre: string;
  publishingYear: number;
  publishingCountry: string;
  rating: number[];
}
