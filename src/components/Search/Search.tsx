import cl from "./Search.module.css";
import Button from "../UI/Button/Button";

const Search = () => {
  return (
    <form className={cl.searchForm} action="/" method="get">
      <input
        className={cl.input}
        data-testid="cy-search-input"
        type="text"
        name="search"
        placeholder="What do you want to watch?"
      />
      <Button data-testid="cy-search-submit" type="submit">
        Search
      </Button>
    </form>
  );
};

export default Search;
