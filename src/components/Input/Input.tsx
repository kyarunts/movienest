import { FC, HTMLInputTypeAttribute } from "react";
import { UseFormRegister } from "react-hook-form";

type InputProps = {
  formKey: string;
  register: UseFormRegister<any>;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
};

export const Input: FC<InputProps> = ({
  formKey, register, placeholder, type = 'text'
}) => {
  return <input
    type={type}
    {...register(formKey)}
    placeholder={placeholder}
  />;
};
