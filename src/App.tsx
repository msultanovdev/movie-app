import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MovieList from "./components/MovieList/MovieList";
import { GlobalScrollbar } from "mac-scrollbar";
import AddMovieForm from "./components/AddMovieForm/AddMovieForm";
import EditMovieForm from "./components/EditMovieForm/EditMovieForm";

function App() {
  return (
    <main className="main">
      <GlobalScrollbar skin="dark" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MovieList />}>
            <Route path="new" element={<AddMovieForm />} />
          </Route>
          <Route path="/:movieId" element={<MovieList />}>
            <Route path="edit" element={<EditMovieForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
