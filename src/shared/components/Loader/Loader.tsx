import { FC, useEffect, useState } from "react";
import styles from './loader.module.css';
import { useService } from "../../hooks/useService";
import { LoaderService } from "../../services/loader.service";

export const Loader: FC = () => {
  const { isLoading } = useService(LoaderService);

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    isLoading.subscribe(
      isLoading => setOpen(isLoading)
    );
  }, []);

  return <div className={`${styles.loader} ${open ? styles.open : ''}`}>
    <div className={styles.animation}><div></div><div></div><div></div><div></div></div>
  </div>;
};