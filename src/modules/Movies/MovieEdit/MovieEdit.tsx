import { FC } from "react";
import { Layout } from "../../../shared/components/Layout/Layout";
import styles from '../movies.module.css';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useService } from "../../../shared/hooks/useService";
import { MovieService } from "../movie.service";
import { TMovie } from "../movie.types";
import { MovieForm } from "../MovieForm/MovieForm";

export const MovieEdit: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { update } = useService(MovieService);

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
        <h2 className={styles.heading}>{t('movie.header-edit')}</h2>
      </div>
      <MovieForm
        onCancel={onCancel}
        onConfirm={onEdit}
      />
    </Layout>;
  </div>;
};