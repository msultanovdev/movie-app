import React, { FC, HTMLAttributes, useState } from "react";
import cl from "./MovieTile.module.css";
import PopupMenu from "../UI/Popup/Popup";
import Dialog from "../Dialog/Dialog";
import Button from "../UI/Button/Button";
import { IMovie } from "../../types";
import ImageWithFallback from "../ImageWithFallback/ImageWithFallback";
import { useNavigate } from "react-router-dom";

interface IMovieTileProps extends HTMLAttributes<HTMLDivElement> {
  movie: IMovie;
}

const MovieTile: FC<IMovieTileProps> = ({ movie, ...props }) => {
  const navigate = useNavigate();
  const { title, poster_path, release_date, genres } = movie;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRemoveConfirmation, setIsRemoveConfirmation] = useState(false);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/${movie.id}/edit`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRemoveConfirmation(true);
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
      <ImageWithFallback
        src={poster_path}
        alt={`${title} Poster`}
        className={cl.image}
      />
      <div className={cl.info}>
        <h2 className={cl.title} data-testid="cy-movie-title">
          {title}
        </h2>
        <p className={cl.details}>
          <span className={cl.year}>
            {new Date(release_date).getFullYear()}
          </span>
          <span className={cl.genre}>{genres.map((g) => `${g} `)}</span>
        </p>
      </div>
      {isMenuOpen && (
        <PopupMenu
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClose={handleClose}
        />
      )}
      {isRemoveConfirmation && (
        <Dialog
          title="Delete MOVIE"
          onClose={() => setIsRemoveConfirmation(false)}
        >
          <div className={cl.removeConfirmation}>
            <p>Are you sure you want to delete this movie?</p>
            <Button className={cl.button}>Confirm</Button>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default MovieTile;
