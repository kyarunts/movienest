import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "../../router";
import { LanguagePicker } from "../../shared/components/LanguagePicker/LanguagePicker";
import styles from './app.module.css';
import { Toast } from "../../shared/components/Toast/Toast";
import { Loader } from "../../shared/components/Loader/Loader";
import { WaveIcon } from "../../assets/icons/WaveIcon";

export const App: FC = () => {
  return <div className={styles.wrapper}>
    <Toast />
    <Loader />
    <div className={styles.languageMenu}><LanguagePicker /></div>
    <RouterProvider router={router} />
    <div className={styles.waveIcon}><WaveIcon /></div>
  </div>;

};