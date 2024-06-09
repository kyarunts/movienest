import { FC } from "react";
import styles from "./error.module.css";
import { useTranslation } from "react-i18next";

export const Error: FC = () => {
  const { t } = useTranslation();

  return <div className={styles.error}>
    <h2 className={styles.header}>{t("error.header")}</h2>
  </div>;
};