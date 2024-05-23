import { FC } from "react";
import cl from "./Button.module.css";

interface IButtonProps {
  children?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: "submit" | "reset" | "button" | undefined;
}

const Button: FC<IButtonProps> = ({ onClick, type, children }) => {
  return (
    <button type={type} onClick={onClick} className={cl.button}>
      {children}
    </button>
  );
};

export default Button;
