export const MOVIE_GENRES = [
  { value: "action", label: "genre.action" },
  { value: "adventure", label: "genre.adventure" },
  { value: "animation", label: "genre.animation" },
  { value: "comedy", label: "genre.comedy" },
  { value: "crime", label: "genre.crime" },
  { value: "documentary", label: "genre.documentary" },
  { value: "drama", label: "genre.drama" },
  { value: "family", label: "genre.family" },
  { value: "fantasy", label: "genre.fantasy" },
  { value: "history", label: "genre.history" },
  { value: "horror", label: "genre.horror" },
  { value: "music", label: "genre.music" },
  { value: "mystery", label: "genre.mystery" },
  { value: "romance", label: "genre.romance" },
  { value: "sci-fi", label: "genre.sci-fi" },
  { value: "thriller", label: "genre.thriller" },
  { value: "war", label: "genre.war" },
  { value: "western", label: "genre.western" }
];

export const MOVIE_YEARS = (): { value: number, label: string; }[] => {
  const currentYear = new Date().getFullYear();
  const years: { value: number, label: string; }[] = [];
  for (let year = currentYear; year >= 1900; year--) {
    years.push({ value: year, label: year.toString() });
  }
  return years;
};

export const MOVIE_COUNTRIES = [
  { value: "us", label: "United States" },
  { value: "in", label: "India" },
  { value: "cn", label: "China" },
  { value: "jp", label: "Japan" },
  { value: "kr", label: "South Korea" },
  { value: "fr", label: "France" },
  { value: "gb", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "it", label: "Italy" },
  { value: "es", label: "Spain" },
  { value: "ru", label: "Russia" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "br", label: "Brazil" },
  { value: "mx", label: "Mexico" },
  { value: "other", label: "Other" }
];