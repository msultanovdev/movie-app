import React, { FC } from "react";
import cl from "./Search.module.css";
import Button from "../UI/Button/Button";
import { ISearchProps } from "../../types";
import { Outlet } from "react-router-dom";

const Search: FC<ISearchProps> = ({ query, setQuery, onSearch, ...props }) => {
  const handleSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <>
      <form className={cl.searchForm} {...props}>
        <input
          data-testid="cy-search-input"
          value={query}
          type="text"
          placeholder="What do you want to watch?"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          data-testid="cy-search-submit"
          type="submit"
          onClick={handleSearch}
        >
          Search
        </Button>
      </form>
      <Outlet />
    </>
  );
};

export default Search;
