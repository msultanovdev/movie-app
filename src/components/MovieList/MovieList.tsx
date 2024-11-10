import { FC } from "react";
import { Movie } from "../../types";
import MovieTile from "../MovieTile/MovieTile";
import cl from "./MovieList.module.css";

export interface IMovieListProps {
  movies: Movie[];
  onClick: (id: number) => void;
}

const MovieList: FC<IMovieListProps> = ({ movies, onClick }) => {
  return (
    <div className={cl.movieList}>
      {movies.map((movie) => {
        return <MovieTile key={movie.id} onClick={() => onClick(movie.id)} movie={movie} />;
      })}
    </div>
  );
};

export default MovieList;
