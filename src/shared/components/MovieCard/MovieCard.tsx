import { FC } from "react";
import styles from './moviecard.module.css';
import { TMovie } from "../../../modules/Movies/movie.types";
import { useNavigate } from "react-router-dom";
import { Link } from "../Link/Link";

type MovieCardProps = TMovie;

export const MovieCard: FC<MovieCardProps> = ({
  title, publishingYear, imageURL, id
}) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/movie/${id}`);
  };

  return <Link
    parentClass={styles.cardLink}
    to={`/movie/${id}`}
  >
    <div className={styles.card}>
      <img
        className={styles.image}
        src={imageURL}
        alt={`${title}_poster`}
      />
      <div className={styles.details}>
        <p className={`${styles.title} body-l`}>{title}</p>
        <p className={`${styles.year} body-s`}>{publishingYear}</p>
      </div>
    </div>
  </Link>;

};