import { FC, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { TFilters, defaultSearchParams } from "../movie.types";
import { Select } from "../../../shared/components/Select/Select";
import { useTranslation } from "react-i18next";
import { MOVIE_COUNTRIES, MOVIE_GENRES, MOVIE_SORT_BY, MOVIE_YEARS } from "../../../shared/constants/movie.lookup";
import { useService } from "../../../shared/hooks/useService";
import { MovieService } from "../movie.service";
import styles from './moviefilters.module.css';
import { useStore } from "../../../shared/hooks/useStore";
import { MovieStore } from "../movie.store";
import { Button } from "../../../shared/components/Button/Button";

export const MovieFilters: FC = () => {
  const { t } = useTranslation();
  const {
    searchFilters
  } = useStore(MovieStore, [
    "searchFilters"
  ]);
  const { register, getValues, watch, reset } = useForm<TFilters>({
    defaultValues: searchFilters
  });
  const { updateSearchFilters } = useService(MovieService);

  useEffect(() => {
    const subscriber = watch((data: FieldValues) => {
      updateSearchFilters({ filter: data });
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, []);

  useEffect(() => {
    reset(searchFilters);
  }, [searchFilters]);

  const clear = () => {
    reset(defaultSearchParams);
  };

  return <form className={styles.filters}>
    <Select
      parentClass={styles.filter}
      {...register('genre')}
      placeholder={t("movie.genre")}
      options={MOVIE_GENRES}
      selectedValue={getValues('genre')}
    />
    <Select
      parentClass={styles.filter}
      {...register('publishingYear')}
      placeholder={t("movie.year")}
      options={MOVIE_YEARS()}
      selectedValue={getValues('publishingYear')}
    />
    <Select
      parentClass={styles.filter}
      {...register('publishingCountry')}
      placeholder={t("movie.country")}
      options={MOVIE_COUNTRIES}
      selectedValue={getValues('publishingCountry')}
    />
    <Select
      parentClass={styles.filter}
      {...register('sortingBy')}
      placeholder={t("movie.sort-by")}
      options={MOVIE_SORT_BY}
      selectedValue={getValues('sortingBy')}
    />
    <Button
      preventDefault={true}
      type="outlined"
      parentClass={styles.clear}
      onClick={clear}
    >
      {t('button.clear-all')}
    </Button>
  </form>;
};
