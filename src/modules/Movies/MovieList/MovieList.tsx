import { FC, useEffect } from "react";
import { Layout } from "../../../shared/components/Layout/Layout";
import { MoviesEmpty } from "../MoviesEmpty/MoviesEmpty";
import { MovieCard } from "../../../shared/components/MovieCard/MovieCard";
import { useStore } from "../../../shared/hooks/useStore";
import { MovieStore } from "../movie.store";
import styles from '../movies.module.css';
import { useTranslation } from "react-i18next";
import { Link } from "../../../shared/components/Link/Link";
import { AddCircleIcon } from "../../../assets/icons/AddCircleIcon";
import { LogoutIcon } from "../../../assets/icons/LogoutIcon";
import { Pagination } from "../../../shared/components/Pagination/Pagination";
import { useService } from "../../../shared/hooks/useService";
import { useSearchParams } from "react-router-dom";
import { MovieService } from "../movie.service";
import { MovieFilters } from "../MovieFilters/MovieFilters";
import { FilterKeys, TFilters } from "../movie.types";
import { MoviesNoResults } from "../MoviesNoResults/MoviesNoResults";

export const MovieList: FC = () => {
  const { t } = useTranslation();
  const {
    movies,
    paginationInfo,
    searchFilters
  } = useStore(MovieStore, [
    "movies",
    "paginationInfo",
    "searchFilters"
  ]);
  const { updateSearchFilters, clearDataAndLogout } = useService(MovieService);
  const [searchParams, setSearchParams] = useSearchParams();


  useEffect(() => {
    const filters = getFiltersFromQuery();
    updateSearchFilters({ filter: filters });

    return () => {
      updateSearchFilters({ reset: true, skipUpdate: true });
    };
  }, []);

  useEffect(() => {
    if (searchFilters) {
      FilterKeys.forEach(key => {
        if (searchFilters[key]) {
          searchParams.set(key, searchFilters[key]?.toString());
        } else {
          searchParams.delete(key);
        }
      });
      setSearchParams(searchParams);
    }
  }, [searchFilters]);

  const getFiltersFromQuery = (): Partial<TFilters> => {
    const filters: Partial<TFilters> = {};
    FilterKeys.forEach(key => {
      const queryValue = searchParams.get(key);
      switch (key) {
        case 'page':
          filters[key] = !queryValue || Number.isNaN(+queryValue) ? 1 : +queryValue;
          break;
        case 'publishingYear':
          if (queryValue && !Number.isNaN(+queryValue)) {
            filters[key] = +queryValue;
          }
          break;
        case 'rating':
          break;
        default:
          if (queryValue) {
            filters[key] = queryValue;
          }
      }
    });
    return filters;
  };

  const onPageChange = (page: number) => {
    updateSearchFilters({ filter: { page }, partial: true });
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  return (paginationInfo && <>
    {paginationInfo?.totalCount as number > 0
      ? <>
        <Layout>
          <div className={styles.header}>
            <div className={styles.actions}>
              <h2 className={`${styles.heading} ${styles.desktop}`}>{t('movies.list-title')}</h2>
              <h3 className={`${styles.heading} ${styles.mobile}`}>{t('movies.list-title')}</h3>
              <Link parentClass={styles.add} to="/movie">
                <AddCircleIcon />
              </Link>
            </div>
            <div className={styles.logoutContainer} onClick={clearDataAndLogout}>
              <p className={styles.logoutText}>{t('auth.logout')}</p>
              <LogoutIcon />
            </div>
            <div className={styles.filters}>
              <MovieFilters />
            </div>
          </div>
          {
            movies && movies.length
              ? movies?.map(m => (<div key={m.id} className={styles.listItem}>
                <MovieCard {...m} />
              </div>))
              : <MoviesNoResults />
          }
          {movies && movies.length ? <div className={styles.pagination}>
            <Pagination
              currentPage={+(searchFilters?.page as number)}
              pages={paginationInfo?.totalPages as number}
              onPageChange={onPageChange}
            />
          </div> : null}
        </Layout>
      </>
      : <MoviesEmpty />}
  </>);
};
