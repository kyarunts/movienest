import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../shared/components/Button/Button";
import { useNavigate } from "react-router-dom";
import styles from '../movies.module.css';

export const MoviesEmpty: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onMovieAdd = () => {
    navigate('/movie');
  };

  return <div className={styles.emptyContainer}>
    <h2 className={`${styles.emptyHeader} ${styles.desktop}`}>{t('movies.empty')}</h2>
    <h3 className={`${styles.emptyHeader} ${styles.mobile}`}>{t('movies.empty')}</h3>
    <div className={styles.emptyActionContainer}>
      <Button
        parentClass={styles.emptyButton}
        onClick={onMovieAdd}
      >{t('movies.add')}</Button>
    </div>
  </div>;
};