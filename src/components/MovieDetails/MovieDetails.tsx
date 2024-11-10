import { FC } from "react";
import { IMovie } from "../../types";
import styles from "./MovieDetails.module.css";
import { formatTime } from "../../utils/helper";

export interface IMovieDetailsProps {
  movie: IMovie;
  onBackButtonClick: (id: null) => void;
}

const MovieDetails: FC<IMovieDetailsProps> = ({ movie, onBackButtonClick }) => {
  return (
    <div className={styles.container}>
      <span onClick={() => onBackButtonClick(null)} className={styles.back}>
        Search
      </span>
      <img
        src={movie.poster_path}
        alt={movie.title + " poster"}
        className={styles.poster}
      />
      <div className={styles.details}>
        <div className={styles.header}>
          <h1 className={styles.title}>{movie.title}</h1>
          <div className={styles.rating}>{movie.vote_average}</div>
        </div>
        <p className={styles.genre}>{movie.genres.map((g) => `${g} `)}</p>
        <div className={styles.meta}>
          <span className={styles.year}>{movie.release_date}</span>
          <span className={styles.duration}>{formatTime(movie.runtime)}</span>
        </div>
        <p className={styles.description}>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
