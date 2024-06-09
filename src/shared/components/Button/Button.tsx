import { CSSProperties, FC, ReactNode } from "react";
import styles from './button.module.css';

type ButtonProps = {
  style?: CSSProperties;
  children?: ReactNode;
  type?: 'outlined' | 'filled';
  onClick?: () => void;
  parentClass?: string;
};

export const Button: FC<ButtonProps> = ({
  children,
  style = {},
  type = 'filled',
  onClick = () => { },
  parentClass
}) => {
  return <button
    style={style}
    className={`${styles.button} ${styles[type]} ${parentClass || ""}`}
    onClick={onClick}
  >{children}</button>;
};
