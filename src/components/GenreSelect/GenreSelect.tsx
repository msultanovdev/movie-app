import { FC, KeyboardEvent } from "react";
import cl from "./GenreSelect.module.css";
import { Genre } from "../../types";

export interface IGenreSelectProps {
  genres: Genre[];
  selectedGenre: Genre;
  onSelect: (genre: Genre) => void;
}

const GenreSelect: FC<IGenreSelectProps> = ({
  genres,
  onSelect,
  selectedGenre,
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>, genre: Genre) => {
    if (e.key === "Enter") {
      onSelect(genre);
    }
  };
  return (
    <section className={cl.genreSelect}>
      <ul className={cl.genreSelectList}>
        {genres.map((genre, index) => {
          return (
            <li
              data-testid="cy-genre-select-item"
              onClick={() => onSelect(genre)}
              onKeyDown={(e) => handleKeyDown(e, genre)}
              className={selectedGenre.title === genre.title ? cl.active : ""}
              key={index}
              tabIndex={0}
            >
              {genre.title}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default GenreSelect;
