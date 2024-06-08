import React, { FC } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "../../router";
import { LanguagePicker } from "../../shared/components/LanguagePicker/LanguagePicker";

import styles from './app.module.css';

export const App: FC = () => {
  return <div className={styles.wrapper}>
    <div className={styles.languageMenu}><LanguagePicker /></div>
    <RouterProvider router={router} />
  </div>;

};