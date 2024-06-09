import { FC } from "react";
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

export const MovieList: FC = () => {
  const { t } = useTranslation();
  const {
    movies
  } = useStore(MovieStore, [
    "movies"
  ]);

  const onLogout = () => {
    alert('logout');
  };
  return <div>
    {movies?.length
      ? <>
        <Layout>
          <div className={styles.header}>
            <div className={styles.actions}>
              <h2 className={styles.heading}>{t('movies.list-title')}</h2>
              <Link parentClass={styles.add} to="/movie">
                <AddCircleIcon />
              </Link>
            </div>
            <div className={styles.logoutContainer} onClick={onLogout}>
              <p className={styles.logoutText}>{t('auth.logout')}</p>
              <LogoutIcon />
            </div>
          </div>
          {movies.map(m => (<div key={m.id} className={styles.listItem}>
            <MovieCard {...m} />
          </div>))}
          <div className={styles.pagination}>
            <Pagination
              currentPage={1}
              pages={23}
              onPageChange={(p: number) => { }}
            />
          </div>
        </Layout>
      </>
      : <MoviesEmpty />}
  </div>;
};
