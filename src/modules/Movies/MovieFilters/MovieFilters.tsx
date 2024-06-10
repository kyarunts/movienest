import { FC, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { TFiltersForm } from "../movie.types";
import { Select } from "../../../shared/components/Select/Select";
import { useTranslation } from "react-i18next";
import { MOVIE_COUNTRIES, MOVIE_GENRES, MOVIE_YEARS } from "../../../shared/constants/movie.lookup";
import { useService } from "../../../shared/hooks/useService";
import { MovieService } from "../movie.service";
import { useSearchParams } from "react-router-dom";
import styles from './moviefilters.module.css';

export const MovieFilters: FC = () => {
  const { t } = useTranslation();
  const { register, getValues, watch, } = useForm<TFiltersForm>();
  const { updateSearchFilters } = useService(MovieService);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    // const subscriber = watch((data: FieldValues) => {
    //   updateSearchFilters(data);
    //   Object.keys(data).forEach(key => {
    //     if (data[key]) {
    //       searchParams.set(key, (data as any)[key]);
    //     }
    //   });
    //   setSearchParams(searchParams);
    // });

    const valuesFromQuery = [
      'genre',
      'publishingYear',
      'publishingCountry',
      'rating'
    ].reduce((values, key) => {
      const value = searchParams.get(key);
      if (value) {
        let newValue: string | number = value;
        if (key === 'publishingYear') {
          newValue = +value;
        }
        return { ...values, [key]: value };
      }
      return values;
    }, {});
    updateSearchFilters(valuesFromQuery);
    // console.log(valuesFromQuery);
    // setValues(updatedValues);

    setIsReady(true);
    // return () => {
    //   subscriber.unsubscribe();
    // };
  }, []);

  return (isReady ? <form className={styles.filters}>
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

  </form> : null);
};
