import { CSSProperties, FC, ReactNode } from "react";
import styles from './button.module.css';

type ButtonProps = {
  style?: CSSProperties;
  children?: ReactNode;
  type?: 'outlined' | 'filled';
  onClick?: () => void;
  parentClass?: string;
  preventDefault?: boolean;
};

export const Button: FC<ButtonProps> = ({
  children,
  style = {},
  type = 'filled',
  onClick = () => { },
  parentClass,
  preventDefault
}) => {
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (preventDefault) {
      e.preventDefault();
    }
    onClick();
  };

  return <button
    style={style}
    className={`${styles.button} ${styles[type]} ${parentClass || ""}`}
    onClick={onClickHandler}
  >{children}</button>;
};
