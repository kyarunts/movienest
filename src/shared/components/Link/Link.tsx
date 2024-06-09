import { FC, ReactNode } from "react";
import { Link as RouterLink } from 'react-router-dom';
import styles from './link.module.css';

type LinkProps = {
  children: ReactNode;
  to: string;
  parentClass?: string;
};
export const Link: FC<LinkProps> = ({
  children, to, parentClass
}) => {
  return <RouterLink
    to={to}
    className={`${styles.link} ${parentClass || ''}`}
  >{children}</RouterLink>;
};