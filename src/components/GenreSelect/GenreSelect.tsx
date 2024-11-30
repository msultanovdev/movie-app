import { FC } from "react";
import cl from "./GenreSelect.module.css";
import { Genre } from "../../types";

export interface IGenreSelectProps {
  genres: Genre[];
  selectedGenre?: Genre;
}

const GenreSelect: FC<IGenreSelectProps> = ({ genres, selectedGenre }) => {
  // const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>, genre: Genre) => {
  //   if (e.key === "Enter") {
  //     onSelect(genre);
  //   }
  // };
  return (
    <section className={cl.genreSelect}>
      <ul className={cl.genreSelectList}>
        {genres.map((genre, index) => {
          return (
            <li
              data-testid="cy-genre-select-item"
              // onClick={() => onSelect(genre)}
              // onKeyDown={(e) => handleKeyDown(e, genre)}
              className={`${cl.list} ${selectedGenre?.title === genre.title ? cl.active : ""}`}
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
