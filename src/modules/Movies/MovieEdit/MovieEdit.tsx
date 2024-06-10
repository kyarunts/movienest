import { FC, useEffect } from "react";
import { Layout } from "../../../shared/components/Layout/Layout";
import styles from '../movies.module.css';
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useService } from "../../../shared/hooks/useService";
import { MovieService } from "../movie.service";
import { TMovie } from "../movie.types";
import { MovieForm } from "../MovieForm/MovieForm";
import { useStore } from "../../../shared/hooks/useStore";
import { MovieStore } from "../movie.store";

export const MovieEdit: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { getMovieById, update, removeMovieInEdit } = useService(MovieService);

  const {
    movieInEdit
  } = useStore(MovieStore, [
    "movieInEdit"
  ]);

  useEffect(() => {
    if (!id || Number.isNaN(+id)) {
      navigate('/error');
      return;
    }
    getMovieById(+id);

    return () => {
      removeMovieInEdit();
    };
  }, []);

  const onCancel = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const onEdit = (movie: Partial<TMovie>) => {
    update(movie);
  };

  return <div>
    <Layout>
      <div className={styles.header}>
        <h2 className={`${styles.heading} ${styles.desktop}`}>{t('movie.header-edit')}</h2>
        <h3 className={`${styles.heading} ${styles.mobile}`}>{t('movie.header-edit')}</h3>
      </div>
      {movieInEdit ? <MovieForm
        movie={movieInEdit}
        onCancel={onCancel}
        onConfirm={onEdit}
      /> : "Loading"}
    </Layout>;
  </div>;
};