import { FC, ReactNode } from "react";
import cl from "./FlexRow.module.css";

export interface IFlexRow {
  children: ReactNode;
}

const FlexRow: FC<IFlexRow> = (props) => {
  const { children } = props;

  return <div className={cl.flex}>
    {children}
  </div>;
};

export default FlexRow;
