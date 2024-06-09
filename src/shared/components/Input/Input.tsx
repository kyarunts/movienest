import { CSSProperties, FC, HTMLInputTypeAttribute } from "react";
import { UseFormRegister } from "react-hook-form";
import styles from './input.module.css';

type InputProps = {
  formKey: string;
  register: UseFormRegister<any>;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  errorMessage?: string;
  parentClass?: string;
};

export const Input: FC<InputProps> = ({
  formKey,
  register,
  placeholder,
  type = 'text',
  errorMessage,
  parentClass
}) => {
  return <div className={`${styles.container} ${parentClass ? parentClass : ''}`}>
    <input
      className={`${styles.input} ${errorMessage ? styles.error : ''}`}
      type={type}
      {...register(formKey)}
      placeholder={placeholder}
    />
    {errorMessage && <p className={`${styles.errorMessage} body-xs`}>{errorMessage}</p>}
  </div>;
};
