import { FC, useState } from "react";
import { Genre, IMovie, IMovieApi } from "../../types";
import MovieTile from "../MovieTile/MovieTile";
import cl from "./MovieList.module.css";
import { useFetchData } from "../../hooks/useFetchData";
import GenreSelect from "../GenreSelect/GenreSelect";
import Sort from "../Sort/Sort";
import MovieDetails from "../MovieDetails/MovieDetails";
import Search from "../Search/Search";
import { genres, moviesURL } from "../../consts";
import { useSearchParams } from "react-router-dom";

export interface IMovieListProps {}

const options = [
  { value: "release_date", label: "Release Date" },
  { value: "title", label: "Title" },
];

const MovieList: FC<IMovieListProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") ?? "");
  const [sortBy, setSortBy] = useState("title");
  const [selectedGenre, setSelectedGenre] = useState({
    title:
      genres.find((genre) => genre.value === searchParams.get("filter"))
        ?.title ?? "All",
    value: searchParams.get("filter") ?? "",
  });
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  const params = {
    search: searchParams.get("search") ?? "",
    filter: searchParams.get("filter") ?? "",
    searchBy: "title",
    sortBy: searchParams.get("sortBy") ?? "",
    sortOrder: "asc",
    limit: "30",
  };

  const cleanParams = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(params).filter(([_, value]) => value !== "")
  );
  const { data, isLoading, error } = useFetchData<IMovieApi>({
    url: moviesURL,
    params: cleanParams,
  });
  const movies = data?.data;

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setSearchParams((prev) => {
      if (value) {
        prev.set("sortBy", value);
      } else {
        prev.delete("sortBy");
      }
      return prev;
    });
  };

  const handleSelectGenre = (genre: Genre) => {
    setSelectedGenre(genre);
    setSearchParams((prev) => {
      if (genre.value) {
        prev.set("filter", genre.value);
      } else {
        prev.delete("filter");
      }
      return prev;
    });
  };

  const handleSearch = () => {
    setSearchParams((prev) => {
      if (query) {
        prev.set("search", query);
      } else {
        prev.delete("search");
      }
      return prev;
    });
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
          genres={genres}
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
