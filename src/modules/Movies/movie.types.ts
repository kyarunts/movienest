export type TMovie = {
  title: string;
  publishingYear: number;
  imageURL?: string;
  publishingCountry?: string;
  genre?: string;
  rating?: number;
  directorFullName?: string;
  id?: number;
  file?: File;
  director?: {
    fullName: string;
  };
};

export type TPaginationInfo = {
  count: number;
  currentPage: number;
  totalPages: number;
  totalCount: number;
};

export type TMoviesResponse = {
  movies: TMovie[];
  paginationInfo: TPaginationInfo;
};

export type TFilters = {
  page: number;
  genre: string;
  publishingYear: number;
  publishingCountry: string;
  rating: string;
  sortingBy: string;
};

export const FilterKeys: (keyof TFilters)[] = [
  'page', 'genre', 'publishingYear', 'publishingCountry', 'rating', 'sortingBy'
];

export const defaultSearchParams: TFilters = {
  page: 1,
  genre: null,
  publishingYear: null,
  publishingCountry: null,
  rating: null,
  sortingBy: null
};