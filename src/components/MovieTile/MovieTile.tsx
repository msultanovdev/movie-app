import { FC, HTMLAttributes } from "react";
import cl from "./MovieTile.module.css";
import { Movie } from "../../types";

interface IMovieTileProps extends HTMLAttributes<HTMLDivElement> {
  movie: Movie;
}

const MovieTile: FC<IMovieTileProps> = ({ movie, ...props }) => {
  const { name, image, year, genres } = movie;
  return (
    <div {...props} className={cl.poster}>
      <img src={image} alt={`${name} Poster`} className={cl.image} />
      <div className={cl.info}>
        <h1 className={cl.title}>{name}</h1>
        <p className={cl.details}>
          <span className={cl.year}>{year}</span>
          <span className={cl.genre}>{genres.map((g) => `${g} `)}</span>
        </p>
        <p className={cl.releaseDate}>{year}</p>
      </div>
    </div>
  );
};

export default MovieTile;
