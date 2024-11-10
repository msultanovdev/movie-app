import { FC } from "react";
import styles from "./Sort.module.css";

export interface ISortProps {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

const Sort: FC<ISortProps> = ({ options, onChange }) => {
  return (
    <div className={styles.selectContainer}>
      <span className={styles.label}>Sort by</span>
      <select
        defaultValue={options[0].value}
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
