import { FC } from "react";
import styles from '../movies.module.css';
import { useTranslation } from "react-i18next";
import { Button } from "../../../shared/components/Button/Button";
import { useService } from "../../../shared/hooks/useService";
import { MovieService } from "../movie.service";

export const MoviesNoResults: FC = () => {
  const { t } = useTranslation();
  const { updateSearchFilters } = useService(MovieService);

  const viewAll = () => {
    updateSearchFilters({ reset: true });
  };

  return <div className={styles.noResults}>
    <h4 className={`${styles.noResultsTitle} ${styles.desktop}`}>{t("movies.no-results")}</h4>
    <h5 className={`${styles.noResultsTitle} ${styles.mobile}`}>{t("movies.no-results")}</h5>

    <Button
      onClick={viewAll}
      parentClass={styles.noResultsButton}
    >{t("movies.view-all")}</Button>
  </div>;
};