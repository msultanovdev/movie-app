import React, { FC } from "react";
import cl from "./Search.module.css";
import Button from "../UI/Button/Button";

export interface ISearchProps {
  // query: string;
  // setQuery: (e: string) => void;
  // onSearch: () => void;
  // style?: React.CSSProperties;
}

const Search: FC<ISearchProps> = () => {
  const handleSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // onSearch();
  };

  return (
    <>
      <form className={cl.searchForm} >
        <input
          className={cl.input}
          data-testid="cy-search-input"
          // value={query}
          type="text"
          placeholder="What do you want to watch?"
          // onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          data-testid="cy-search-submit"
          type="submit"
          // onClick={handleSearch}
        >
          Search
        </Button>
      </form>
    </>
  );
};

export default Search;
