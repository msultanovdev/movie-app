import { FC } from "react";
import cl from "./GenreSelect.module.css";
interface IGenreSelectProps {
  genres: string[];
  selectedGenre: string;
  onSelect: (genre: string) => void;
}

const GenreSelect: FC<IGenreSelectProps> = ({
  genres,
  onSelect,
  selectedGenre,
}) => {
  return (
    <section className={cl.genreSelect}>
      <ul className={cl.genreSelectList}>
        {genres.map((genre, index) => {
          return (
            <li
              onClick={() => onSelect(genre)}
              className={selectedGenre === genre ? cl.active : ""}
              key={index}
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
