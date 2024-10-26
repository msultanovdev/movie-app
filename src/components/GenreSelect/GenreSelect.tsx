import { FC, KeyboardEvent } from "react";
import cl from "./GenreSelect.module.css";
import { IGenreSelectProps } from "../../types";

const GenreSelect: FC<IGenreSelectProps> = ({
  genres,
  onSelect,
  selectedGenre,
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>, genre: string) => {
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
              onClick={() => onSelect(genre)}
              onKeyDown={(e) => handleKeyDown(e, genre)}
              className={selectedGenre === genre ? cl.active : ""}
              key={index}
              tabIndex={0}
            >
              {genre}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default GenreSelect;
