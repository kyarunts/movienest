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
import { AuthService } from "../../../shared/services/auth.servic";
import { useSearchParams } from "react-router-dom";
import { MovieService } from "../movie.service";
import { MovieFilters } from "../MovieFilters/MovieFilters";

export const MovieList: FC = () => {
  const { t } = useTranslation();
  const {
    movies,
    currentPage,
    paginationInfo
  } = useStore(MovieStore, [
    "movies",
    "currentPage",
    "paginationInfo"
  ]);
  const { logout } = useService(AuthService);
  const { updatePage } = useService(MovieService);
  const [searchParams, setSearchParams] = useSearchParams();

  const onPageChange = (p: number) => {
    updatePage(p);
    searchParams.set('p', p.toString());
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const page = searchParams.get('p');
    if (!page || Number.isNaN(+page)) {
      searchParams.set('p', '1');
      setSearchParams(searchParams);
      updatePage(1);
    } else {
      updatePage(+page);
    }
  }, []);

  return (movies ? <div className={styles.list}>
    {movies?.length
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
            <div className={styles.logoutContainer} onClick={logout}>
              <p className={styles.logoutText}>{t('auth.logout')}</p>
              <LogoutIcon />
            </div>
            <div className={styles.filters}>
              <MovieFilters />
            </div>
          </div>
          {movies.map(m => (<div key={m.id} className={styles.listItem}>
            <MovieCard {...m} />
          </div>))}
          <div className={styles.pagination}>
            <Pagination
              currentPage={currentPage}
              pages={paginationInfo?.totalPages as number}
              onPageChange={onPageChange}
            />
          </div>
        </Layout>
      </>
      : <MoviesEmpty />}
  </div> : "Loading");
};
