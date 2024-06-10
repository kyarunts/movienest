import { FC } from "react";
import styles from "./error.module.css";
import { useTranslation } from "react-i18next";

type ErrorProps = {
  type: 'error' | 'notFound';
};

export const Error: FC<ErrorProps> = ({
  type
}) => {
  const { t } = useTranslation();

  return <div className={styles.error}>
    <h2 className={styles.header}>{t(type === 'error' ? "error.header" : "error.not-found")}</h2>
  </div>;
};