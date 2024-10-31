import { useState } from "react";
import "./App.css";
import Counter from "./components/Counter/Counter";
import GenreSelect from "./components/GenreSelect/GenreSelect";
import Search from "./components/Search/Search";
import MovieList from "./components/MovieList/MovieList";
import { movies } from "./db";
import Sort from "./components/Sort/Sort";

const options = [
  { value: "release-date", label: "Release Date" },
  { value: "title", label: "Title" },
];

function App() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortedMovies, setSortedMovies] = useState(movies);
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
    <main className="main">
      <Search onSearch={handleSearch} initSearchQuery="Hello" />
      <Search onSearch={handleSearch} style={{ marginTop: "10px" }} />
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
      <MovieList movies={sortedMovies} />
      <Counter initValue={0} />
    </main>
  );
}

export default App;
