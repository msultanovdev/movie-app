import { FC, useEffect, useState } from "react";
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
  { value: "release-date", label: "Release Date" },
  { value: "title", label: "Title" },
];

const MovieList: FC<IMovieListProps> = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState({
    title: "All",
    value: "",
  });
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  const { data, isLoading, error } = useFetchData<IMovieApi>({
    url: "http://localhost:4000/movies",
    params: { search: search, filter: selectedGenre.value, searchBy: "title" },
  });
  const movies = data?.data;

  const [sortedMovies, setSortedMovies] = useState(movies);

  useEffect(() => {
    setSortedMovies(movies);
  }, [movies]);

  const handleSortChange = (value: string) => {
    const sorted =
      movies &&
      [...movies].sort((a, b) => {
        if (value === "release-date") {
          return parseInt(b.release_date) - parseInt(a.release_date);
        } else if (value === "title") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    setSortedMovies(sorted);
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
        <Sort options={options} onChange={handleSortChange} />
      </div>
      {sortedMovies?.length && (
        <p className="movies-count">{sortedMovies.length} movies found</p>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className={cl.movieList}>
        {sortedMovies?.map((movie) => {
          return (
            <MovieTile
              key={movie.id}
              onClick={() => setSelectedMovie(movie)}
              movie={movie}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MovieList;
