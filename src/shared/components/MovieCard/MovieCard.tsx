import { FC } from "react";
import styles from './moviecard.module.css';
import { TMovie } from "../../../modules/Movies/movie.types";
import { Link } from "../Link/Link";
import { StarIcon } from "../../../assets/icons/StarIcon";
import { DEFAULT_POSTER } from "../../constants/global.constants";

type MovieCardProps = TMovie;

export const MovieCard: FC<MovieCardProps> = ({
  title, publishingYear, imageURL, id, rating, directorFullName
}) => {
  return <Link
    parentClass={styles.cardLink}
    to={`/movie/${id}`}
  >
    <div className={styles.card}>
      <img
        className={styles.image}
        src={imageURL || DEFAULT_POSTER}
        alt={`${title}_poster`}
      />
      <div className={styles.details}>
        <p className={`${styles.title} body-l`}>{title}</p>
        <div className={styles.footer}>
          <caption className={styles.director}>{directorFullName}</caption>
          <p className={`${styles.year} body-s`}>{publishingYear}</p>
          {rating && <div className={styles.rating}>
            <p className={`${styles.ratingNumber} body-s`}>{rating}</p>
            <div className={styles.star}><StarIcon /></div>
          </div>}
        </div>
      </div>
    </div>
  </Link>;

};