import React, { FC, HTMLAttributes, useState } from "react";
import cl from "./MovieTile.module.css";
import { Movie } from "../../types";
import PopupMenu from "../UI/Popup/Popup";
import Dialog from "../Dialog/Dialog";
import MovieForm from "../MovieForm/MovieForm";

interface IMovieTileProps extends HTMLAttributes<HTMLDivElement> {
  movie: Movie;
}

const MovieTile: FC<IMovieTileProps> = ({ movie, ...props }) => {
  const { name, image, year, genre } = movie;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Edit movie:", name);
    setIsEditModal(true);
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

  const handleFormSubmit = (data: Movie) => {
    console.log('Submitted data:', data);
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
          <span className={cl.genre}>{genre}</span>
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
      {isEditModal && (
        <Dialog title="EDIT" onClose={() => setIsEditModal(false)}>
          <MovieForm initiaMovieState={movie} onSubmit={handleFormSubmit} />
        </Dialog>
      )}
    </div>
  );
};

export default MovieTile;
