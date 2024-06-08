import { CSSProperties, FC, HTMLInputTypeAttribute } from "react";
import { UseFormRegister } from "react-hook-form";
import styles from './input.module.css';

type InputProps = {
  formKey: string;
  register: UseFormRegister<any>;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  style?: CSSProperties;
};

export const Input: FC<InputProps> = ({
  formKey,
  register,
  placeholder,
  type = 'text',
  style = {}
}) => {
  return <input
    className={styles.input}
    style={style}
    type={type}
    {...register(formKey)}
    placeholder={placeholder}
  />;
};
