import { FC } from "react";
import { Layout } from "../../../shared/components/Layout/Layout";
import styles from '../movies.module.css';
import { useTranslation } from "react-i18next";
import { TMovie } from "../movie.types";
import { useForm } from "react-hook-form";
import { MovieForm } from "../MovieForm/MovieForm";

export const MovieCreate: FC = () => {
  const { t } = useTranslation();
  

  return <Layout>
    <div className={styles.header}>
      <h2 className={styles.heading}>{t('movie.header-create')}</h2>
    </div>
    <MovieForm />
  </Layout>;
};
