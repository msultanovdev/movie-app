import "./App.css";
import MovieList from "./components/MovieList/MovieList";
import { GlobalScrollbar } from "mac-scrollbar";

function App() {
  return (
    <main className="main">
      <GlobalScrollbar skin="dark" />
      <MovieList />
    </main>
  );
}

export default App;
