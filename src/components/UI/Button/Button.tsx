import { FC } from "react";
import cl from "./Button.module.css";
import { IButtonProps } from "../../../types";

const Button: FC<IButtonProps> = ({ onClick, type, children, ...props }) => {
  return (
    <button {...props} type={type} onClick={onClick} className={cl.button}>
      {children}
    </button>
  );
};

export default Button;
