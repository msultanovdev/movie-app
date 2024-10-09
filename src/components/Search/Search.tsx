import React, { FC, useState } from "react";
import cl from "./Search.module.css";
import Button from "../UI/Button/Button";
import { ISearchProps } from "../../types";

const Search: FC<ISearchProps> = ({ initSearchQuery, onSearch, ...props }) => {
  const [query, setQuery] = useState(initSearchQuery ?? "");
  const handleSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form className={cl.searchForm} {...props}>
      <input
        value={query}
        type="text"
        placeholder="What do you want to watch?"
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button type="submit" onClick={handleSearch}>
        Search
      </Button>
    </form>
  );
};

export default Search;
