import { FC, useEffect, useState } from "react";
import styles from "./pagination.module.css";
import { ThreeDotsIcon } from "../../../assets/icons/ThreeDotsIcon";
import { useTranslation } from "react-i18next";

type PaginationProps = {
  currentPage: number | null;
  pages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = ({
  currentPage, pages, onPageChange
}) => {
  const { t } = useTranslation();
  const [pageLinks, setPageLinks] = useState<number[]>();

  const generateLinks = (currentPage: number, pageCount: number): number[] => {
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(pageCount, currentPage + 2);
    if (end - start + 1 < 4) {
      if (start == 1) {
        end = Math.min(pageCount, start + 3);
      }
      else if (end == pageCount) {
        start = Math.max(1, end - 3);
      }
    }
    let pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  useEffect(() => {
    if (currentPage && pages) {
      setPageLinks(generateLinks(currentPage, pages));
    }
  }, [currentPage]);

  const onPrevClick = () => {
    onPageChange(currentPage as number - 1);
  };

  const onNextClick = () => {
    onPageChange(currentPage as number + 1);
  };

  return <div className={styles.pagination}>
    <p
      onClick={onPrevClick}
      className={`${styles.button} ${currentPage === 1 ? styles.disabledButton : ''}`}
    >{t('button.previous')}</p>
    {pageLinks && <div className={styles.links}>
      {pageLinks[0] !== 1 && <div className={styles.dots}><ThreeDotsIcon /></div>}
      {pageLinks.map(p => (
        <div
          onClick={() => onPageChange(p)}
          key={p}
          className={`${styles.link} ${p === currentPage ? styles.selected : ''}`}
        ><p>{p}</p></div>
      ))}
      {pageLinks[pageLinks.length - 1] < pages && <div className={styles.dots}><ThreeDotsIcon /></div>}
    </div>}
    <p
      onClick={onNextClick}
      className={`${styles.button} ${currentPage === pages ? styles.disabledButton : ''}`}
    >{t('button.next')}</p>
  </div>;
};
