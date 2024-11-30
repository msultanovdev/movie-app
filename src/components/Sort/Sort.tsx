"use client";
import { FC } from "react";
import styles from "./Sort.module.css";

export interface ISortProps {
  search: string;
}

const options = [
  { value: "", label: "Sort By" },
  { value: "release_date", label: "Release Date" },
  { value: "title", label: "Title" },
];

const Sort: FC<ISortProps> = ({ search }) => {
  return (
    <div className={styles.selectContainer}>
      <span className={styles.label}>Sort by</span>
      <form action="/" method="get" className={styles.selectForm}>
        <input type="hidden" name="search" value={search} />
        <select
          name="sort"
          data-testid="cy-sort-dropdown"
          defaultValue=""
          className={styles.select}
          onChange={(e) => e.currentTarget.form?.submit()}
        >
          {options.map((option) => (
            <option
              data-testid={`sort-option-${option.label}`}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default Sort;
