import { FC, useState } from "react";
import { Genre, IMovie, IMovieApi } from "../../types";
import MovieTile from "../MovieTile/MovieTile";
import cl from "./MovieList.module.css";
import { useFetchData } from "../../hooks/useFetchData";
import GenreSelect from "../GenreSelect/GenreSelect";
import Sort from "../Sort/Sort";
import MovieDetails from "../MovieDetails/MovieDetails";
import Search from "../Search/Search";

export interface IMovieListProps {}

const options = [
  { value: "release_date", label: "Release Date" },
  { value: "title", label: "Title" },
];

const MovieList: FC<IMovieListProps> = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [selectedGenre, setSelectedGenre] = useState({
    title: "All",
    value: "",
  });
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  const { data, isLoading, error } = useFetchData<IMovieApi>({
    url: "http://localhost:4000/movies",
    params: {
      search,
      filter: selectedGenre.value,
      searchBy: "title",
      sortBy,
      sortOrder: "asc",
      limit: "30",
    },
  });
  const movies = data?.data;

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleSelectGenre = (genre: Genre) => {
    setSelectedGenre(genre);
  };

  const handleSearch = () => {
    setSearch(query);
  };

  return (
    <div className={cl.movieListWrapper}>
      <div className={cl.moviesListHeader}>
        {selectedMovie ? (
          <MovieDetails
            onBackButtonClick={() => setSelectedMovie(null)}
            movie={selectedMovie}
          />
        ) : (
          <Search
            setQuery={setQuery}
            query={query}
            onSearch={handleSearch}
            style={{ margin: "10px 0" }}
          />
        )}
      </div>
      <div className="movies-sort">
        <GenreSelect
          onSelect={handleSelectGenre}
          genres={[
            { title: "All", value: "" },
            { title: "Documentary", value: "documentary" },
            { title: "Comedy", value: "comedy" },
            { title: "Horror", value: "horror" },
            { title: "Crime", value: "crime" },
          ]}
          selectedGenre={selectedGenre}
        />
        <Sort
          selectedValue={sortBy}
          options={options}
          onChange={handleSortChange}
        />
      </div>
      {movies?.length ? (
        <p className="movies-count">{movies.length} movies found</p>
      ) : null}
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className={cl.movieList}>
        {movies?.length
          ? movies.map((movie) => {
              return (
                <MovieTile
                  key={movie.id}
                  onClick={() => setSelectedMovie(movie)}
                  movie={movie}
                />
              );
            })
          : "Nothing found"}
      </div>
    </div>
  );
};

export default MovieList;
