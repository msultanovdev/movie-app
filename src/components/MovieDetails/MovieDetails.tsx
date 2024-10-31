import {FC} from 'react'
import { Movie } from '../../types';
import styles from "./MovieDetails.module.css";

export interface IMovieDetailsProps {
  movie: Movie
}

const MovieDetails: FC<IMovieDetailsProps> = ({movie}) => {
  return (
    <div className={styles.container}>
      <img src={movie.image} alt={movie.name + " poster"} className={styles.poster} />
      <div className={styles.details}>
        <div className={styles.header}>
          <h1 className={styles.title}>{movie.name}</h1>
          <div className={styles.rating}>{movie.rating}</div>
        </div>
        <p className={styles.genre}>{movie.genres.map(g => `${g} `)}</p>
        <div className={styles.meta}>
          <span className={styles.year}>{movie.year}</span>
          <span className={styles.duration}>{movie.duration}</span>
        </div>
        <p className={styles.description}>{movie.description}</p>
      </div>
    </div>
  )
}

export default MovieDetails;