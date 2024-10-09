import { FC } from "react";
import cl from "./Button.module.css";
import { IButtonProps } from "../../../types";

const Button: FC<IButtonProps> = ({ onClick, type, children }) => {
  return (
    <button type={type} onClick={onClick} className={cl.button}>
      {children}
    </button>
  );
};

export default Button;
