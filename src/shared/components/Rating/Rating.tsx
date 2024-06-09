import { FC, useState } from "react";
import styles from './rating.module.css';
import { StarIcon } from "../../../assets/icons/StarIcon";

type RatingProps = {
  currentRate: number;
  onRateChange: (rate: number) => void;
};

export const Rating: FC<RatingProps> = ({
  currentRate, onRateChange
}) => {
  const numbers: number[] = Array.from({ length: 10 }, (_, index) => index + 1);
  const [rate, setRate] = useState<number>(currentRate);

  const onRate = (rate: number) => {
    setRate(rate);
    onRateChange(rate);
  };

  return <div className={styles.rating}>
    {numbers.map(n => <div
      onClick={() => onRate(n)}
      key={n}
      className={`${styles.rate} ${rate! >= n ? styles.fill : ''}`}
    >
      <StarIcon />
    </div>)}
  </div>;
};