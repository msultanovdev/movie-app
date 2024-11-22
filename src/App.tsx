import { Route, Routes } from "react-router-dom";
import "./App.css";
import MovieList from "./components/MovieList/MovieList";
import { GlobalScrollbar } from "mac-scrollbar";

function App() {
  return (
    <main className="main">
      <GlobalScrollbar skin="dark" />
      <Routes>
        <Route path="/" element={<MovieList />} />
      </Routes>
    </main>
  );
}

export default App;
