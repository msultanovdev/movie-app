import { FC } from "react";
import { Movie } from "../../types";
import MovieTile from "../MovieTile/MovieTile";
import cl from "./MovieList.module.css";

export interface IMovieListProps {
  movies: Movie[];
}

const MovieList: FC<IMovieListProps> = ({ movies }) => {
  return (
    <div className={cl.movieList}>
      {movies.map((movie) => {
        return <MovieTile movie={movie} />;
      })}
    </div>
  );
};

export default MovieList;
