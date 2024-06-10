import { FC, useEffect, useState } from "react";
import { useService } from "../../hooks/useService";
import { ToastService } from "../../services/toast.service";
import styles from './toast.module.css';

export const Toast: FC = () => {
  const { toastMessage } = useService(ToastService);

  const [message, setMessage] = useState<{ type: 'error' | 'success', message: string; } | null>();

  useEffect(() => {
    toastMessage.subscribe(setMessage);
  }, []);

  return (message ? <div className={`${styles.toast} ${styles[message.type]}`}>
    <p className="body-s">{message.message}</p>
  </div> : null);
};
