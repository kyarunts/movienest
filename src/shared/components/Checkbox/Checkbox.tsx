import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import styles from './checkbox.module.css';

type CheckboxProps = {
  formKey: string;
  register: UseFormRegister<any>;
  label: string;
};

export const Checkbox: FC<CheckboxProps> = ({
  formKey, register, label
}) => {
  return <div className={styles.checkbox}>
    <input
      id={formKey}
      {...register(formKey)}
      type="checkbox"
      className={styles.input}
    />
    <label htmlFor={formKey} className={`body-s ${styles.label}`}>{label}</label>
  </div>;
};