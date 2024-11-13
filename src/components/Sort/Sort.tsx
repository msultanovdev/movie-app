import { FC } from "react";
import styles from "./Sort.module.css";

export interface ISortProps {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  selectedValue: string;
}

const Sort: FC<ISortProps> = ({ options, onChange, selectedValue }) => {
  return (
    <div className={styles.selectContainer}>
      <span className={styles.label}>Sort by</span>
      <select
        defaultValue={selectedValue}
        className={styles.select}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sort;
