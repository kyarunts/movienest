import { FC, useEffect } from "react";
import styles from "./pagination.module.css";

type PaginationProps = {
  currentPage: number;
  pages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = ({
  currentPage, pages, onPageChange
}) => {
  return <div className={styles.pagination}>
    <p className={`${styles.button} ${currentPage === 1 ? styles.disabledButton : ''}`}>Prev</p>
    <p className={styles.button}>Next</p>
  </div>;
};
