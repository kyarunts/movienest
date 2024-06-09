import { FC } from "react";
import { Layout } from "../../../shared/components/Layout/Layout";
import styles from '../movies.module.css';
import { useTranslation } from "react-i18next";
import { TMovie } from "../movie.types";
import { MovieForm } from "../MovieForm/MovieForm";
import { useNavigate } from "react-router-dom";
import { useService } from "../../../shared/hooks/useService";
import { MovieService } from "../movie.service";

export const MovieCreate: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { create } = useService(MovieService);

  const onCancel = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const onCreate = (movie: Partial<TMovie>) => {
    create(movie);
  };

  return <div>
    <Layout>
      <div className={styles.header}>
        <h2 className={styles.heading}>{t('movie.header-create')}</h2>
      </div>
      <MovieForm
        onCancel={onCancel}
        onConfirm={onCreate}
      />
    </Layout>
  </div>;
};
