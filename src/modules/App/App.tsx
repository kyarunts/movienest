import React, { FC, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "../../router";
import { LanguagePicker } from "../../shared/components/LanguagePicker/LanguagePicker";
import styles from './app.module.css';
import { Toast } from "../../shared/components/Toast/Toast";

export const App: FC = () => {
  return <div className={styles.wrapper}>
    <Toast />
    <div className={styles.languageMenu}><LanguagePicker /></div>
    <RouterProvider router={router} />
  </div>;

};