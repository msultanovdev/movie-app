import { useState } from "react";
import "./App.css";
import Counter from "./components/Counter/Counter";
import GenreSelect from "./components/GenreSelect/GenreSelect";
import Search from "./components/Search/Search";

function App() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const handleSearch = () => {
    console.log("Searching...");
  };

  const handleSelectGenre = (genre: string) => {
    setSelectedGenre(genre);
  };

  return (
    <main className="main">
      <Search onSearch={handleSearch} initSearchQuery="Hello" />
      <Search onSearch={handleSearch} style={{ marginTop: "10px" }} />
      <GenreSelect
        onSelect={handleSelectGenre}
        genres={["All", "Documentary", "Comedy", "Horror", "Crime"]}
        selectedGenre={selectedGenre}
      />
      <Counter initValue={0} />
    </main>
  );
}

export default App;
