import { useEffect, useState } from "react";
import "./App.css";
import Counter from "./components/Counter/Counter";
import GenreSelect from "./components/GenreSelect/GenreSelect";
import Search from "./components/Search/Search";
import MovieList from "./components/MovieList/MovieList";
import { movies } from "./db";
import Sort from "./components/Sort/Sort";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import { Movie, OverlaysType } from "./types";
import Overlays from "./layouts/Overlays/Overlays";
import { AppContext } from "./AppContext";
import { GlobalScrollbar } from "mac-scrollbar";

const options = [
  { value: "release-date", label: "Release Date" },
  { value: "title", label: "Title" },
];

function App() {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortedMovies, setSortedMovies] = useState(movies);
  const [overlays, setOverlays] = useState<OverlaysType>({});

  useEffect(() => {
    const selectedMovie = movies.filter(
      (movie) => movie.id === selectedMovieId
    );
    setSelectedMovie(selectedMovie[0]);
  }, [selectedMovieId]);

  const handleSearch = () => {
    console.log("Searching...");
  };

  const handleSelectGenre = (genre: string) => {
    setSelectedGenre(genre);
  };

  const handleSortChange = (value: string) => {
    const sorted = [...movies].sort((a, b) => {
      if (value === "release-date") {
        return parseInt(b.year) - parseInt(a.year);
      } else if (value === "title") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
    setSortedMovies(sorted);
  };

  return (
    <AppContext.Provider
      value={{ overlays: overlays, setOverlays: setOverlays }}
    >
      <GlobalScrollbar skin="dark" />
      <main className="main">
        <Overlays />
        {selectedMovie ? (
          <MovieDetails
            onBackButtonClick={() => setSelectedMovieId(null)}
            movie={selectedMovie}
          />
        ) : (
          <Search onSearch={handleSearch} style={{ margin: "10px 0" }} />
        )}

        <div className="movies-sort">
          <GenreSelect
            onSelect={handleSelectGenre}
            genres={["All", "Documentary", "Comedy", "Horror", "Crime"]}
            selectedGenre={selectedGenre}
          />
          <Sort options={options} onChange={handleSortChange} />
        </div>
        {movies.length && (
          <p className="movies-count">{movies.length} movies found</p>
        )}
        <MovieList onClick={setSelectedMovieId} movies={sortedMovies} />
        <Counter initValue={0} />
      </main>
    </AppContext.Provider>
  );
}

export default App;
