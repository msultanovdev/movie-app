import { useState } from "react";
import "./App.css";
import Counter from "./components/Counter/Counter";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import MovieList from "./components/MovieList/MovieList";
import { GlobalScrollbar } from "mac-scrollbar";
import Search from "./components/Search/Search";
import { IMovie } from "./types";

function App() {
  // const [selectedMovieId, setSelectedMovieId] = useState<number | null>();
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);

  // useEffect(() => {
  //   const selectedMovie = movies.filter(
  //     (movie) => movie.id === selectedMovieId
  //   );
  //   setSelectedMovie(selectedMovie[0]);
  // }, [selectedMovieId]);

  const handleSearch = () => {
    console.log("Searching...");
  };

  return (
    <main className="main">
      <GlobalScrollbar skin="dark" />
      {selectedMovie ? (
        <MovieDetails
          onBackButtonClick={() => setSelectedMovie(null)}
          movie={selectedMovie}
        />
      ) : (
        <Search onSearch={handleSearch} style={{ margin: "10px 0" }} />
      )}

      <MovieList onClick={setSelectedMovie} />
      <Counter initValue={0} />
    </main>
  );
}

export default App;
