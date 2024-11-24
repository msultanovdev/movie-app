import { FC } from "react";
import { IMovie } from "../../types";
import styles from "./MovieDetails.module.css";
import { formatTime } from "../../utils/helper";
import ImageWithFallback from "../ImageWithFallback/ImageWithFallback";
import { useLocation, useNavigate } from "react-router-dom";

export interface IMovieDetailsProps {
  movie: IMovie;
  onBackButtonClick?: (id: null) => void;
}

const MovieDetails: FC<IMovieDetailsProps> = ({ movie, onBackButtonClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleBackToSearch = () => {
    onBackButtonClick && onBackButtonClick(null);
    const currentParams = new URLSearchParams(location.search);
    navigate(`/?${currentParams.toString()}`);
  };
  return (
    <div className={styles.container} data-testid="cy-movie-details">
      <div className={styles.wrapper}>
        <span onClick={handleBackToSearch} className={styles.back}>
          Search
        </span>
        <ImageWithFallback
          src={movie.poster_path}
          alt={`${movie.title} Poster`}
          className={styles.poster}
        />
        <div className={styles.details}>
          <div className={styles.header}>
            <h1 className={styles.title}>{movie.title}</h1>
            <div className={styles.rating}>{movie.vote_average}</div>
          </div>
          <p className={styles.genre}>{movie?.genres?.map((g) => `${g} `)}</p>
          <div className={styles.meta}>
            <span className={styles.year}>{movie.release_date}</span>
            <span className={styles.duration}>
              {formatTime(Number(movie.runtime))}
            </span>
          </div>
          <p className={styles.description}>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
