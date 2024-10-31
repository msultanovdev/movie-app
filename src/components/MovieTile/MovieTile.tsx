import { FC } from "react";
import cl from "./MovieTile.module.css";

interface IMovieTileProps {
  movie: {
    name: string;
    image: string;
    year: string;
    genres: string[];
  };
}

const MovieTile: FC<IMovieTileProps> = ({ movie }) => {
  const { name, image, year, genres } = movie;
  return (
    <div className={cl.poster}>
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
