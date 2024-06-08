import { FC, ReactNode } from "react";

type ButtonProps = {
  children?: ReactNode;
};

export const Button: FC<ButtonProps> = ({
  children
}) => {
  return <button>{children}</button>;
};
