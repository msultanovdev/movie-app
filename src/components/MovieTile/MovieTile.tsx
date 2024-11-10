import React, { FC, HTMLAttributes, useContext, useState } from "react";
import cl from "./MovieTile.module.css";
import { Movie } from "../../types";
import PopupMenu from "../UI/Popup/Popup";
import { AppContext, AppContextType } from "../../AppContext";

interface IMovieTileProps extends HTMLAttributes<HTMLDivElement> {
  movie: Movie;
}

const MovieTile: FC<IMovieTileProps> = ({ movie, ...props }) => {
  const { name, image, year, genres } = movie;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { overlays, setOverlays } = useContext(AppContext) as AppContextType;

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Edit movie:", name);
    setOverlays({
      ...overlays,
      modal: {
        title: "Edit",
      },
    });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Delete movie:", name);
    setIsMenuOpen(false);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(false);
  };

  return (
    <div {...props} className={cl.poster}>
      <button onClick={toggleMenu} className={cl.menuButton}>
        ⋮
      </button>
      <img src={image} alt={`${name} Poster`} className={cl.image} />
      <div className={cl.info}>
        <h1 className={cl.title}>{name}</h1>
        <p className={cl.details}>
          <span className={cl.year}>{year}</span>
          <span className={cl.genre}>{genres.map((g) => `${g} `)}</span>
        </p>
        <p className={cl.releaseDate}>{year}</p>
      </div>
      {isMenuOpen && (
        <PopupMenu
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default MovieTile;
