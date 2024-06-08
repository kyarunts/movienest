import { FC, ReactNode } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './link.module.css';

type LinkProps = {
  children: ReactNode;
  to: string;
};
export const Link: FC<LinkProps> = ({
  children, to
}) => {
  const navigate = useNavigate();
  
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(to);
  };
  
  return <a className={styles.link} onClick={handleNavigation}>{children}</a>;
};