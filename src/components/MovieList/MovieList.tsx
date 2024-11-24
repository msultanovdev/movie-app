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
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

export interface IMovieListProps {}

const options = [
  { value: "", label: "sortBy" },
  { value: "release_date", label: "Release Date" },
  { value: "title", label: "Title" },
];

const MovieList: FC<IMovieListProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState(searchParams.get("search") ?? "");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") ?? "");
  const [selectedGenre, setSelectedGenre] = useState({
    title:
      genres.find((genre) => genre.value === searchParams.get("filter"))
        ?.title ?? "All",
    value: searchParams.get("filter") ?? "",
  });
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
  const { movieId } = useParams();
  const {
    data: selectedMovie,
    isLoading: isMovieLoading,
    error: movieError,
  } = useFetchData<IMovie>({
    url: `${moviesURL}/${movieId}`,
    isRequestNeed: !!movieId,
  });

  const updateSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);

    params.delete("movieId");
    navigate(`/?${params.toString()}`);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    updateSearchParam("sortBy", value);
  };

  const handleSelectGenre = (genre: Genre) => {
    setSelectedGenre(genre);
    updateSearchParam("filter", genre.value);
  };

  const handleSearch = () => {
    updateSearchParam("search", query);
  };

  const handleMovieClick = (movie: IMovie) => {
    const currentParams = new URLSearchParams(location.search);
    navigate(`/${movie.id}?${currentParams.toString()}`);
  };

  return (
    <div className={cl.movieListWrapper} data-testid="cy-movie-list">
      <div className={cl.moviesListHeader}>
        {isMovieLoading && <p style={{ color: "white" }}>Loading...</p>}
        {movieError && movieId && (
          <p style={{ color: "white" }}>{movieError}</p>
        )}
        {selectedMovie ? (
          <MovieDetails movie={selectedMovie} />
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
        <p data-testid="cy-movies-count" className="movies-count">
          {movies.length} movies found
        </p>
      ) : null}
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className={cl.movieList}>
        {movies?.length
          ? movies.map((movie) => {
              return (
                <MovieTile
                  data-testid="cy-movie-tile"
                  key={movie.id}
                  onClick={() => handleMovieClick(movie)}
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
