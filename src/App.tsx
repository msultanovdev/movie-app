import "./App.css";
import Counter from "./components/Counter/Counter";
import Search from "./components/Search/Search";

function App() {
  const handleSearch = () => {
    console.log("Searching...");
  };

  return (
    <main className="main">
      <Search onSearch={handleSearch} initSearchQuery="Hello" />
      <Search onSearch={handleSearch} style={{ marginTop: "10px" }} />

      <Counter initValue={0} />
    </main>
  );
}

export default App;
