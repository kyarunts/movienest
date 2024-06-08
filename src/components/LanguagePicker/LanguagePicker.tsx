import React, { FC } from "react";
import styles from './languagePicker.module.css';
import { useTranslation } from "react-i18next";
import { supportedLanguages } from "../../locales/i18n";

export const LanguagePicker: FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return <div className={styles.picker}>
    {supportedLanguages.map(l => (
      <h6
        key={l}
        onClick={() => changeLanguage(l)}
        className={`${styles.option} ${i18n.language === l ? styles.selected : ''}`}
      >{l}</h6>
    ))}
  </div>;
};