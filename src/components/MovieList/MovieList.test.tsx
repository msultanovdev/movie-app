import { render, screen, fireEvent } from "@testing-library/react";
import MovieList from "./MovieList";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { Movie } from "../../types";

describe("MovieList component", () => {
  const movies: Movie[] = [
    {
      id: 1,
      name: "Inception",
      image: "/path/to/image1.jpg",
      rating: 8.8,
      genres: ["Action", "Sci-Fi", "Thriller"],
      year: "2010",
      duration: "148 min",
      description: "A mind-bending thriller where reality is questioned.",
    },
    {
      id: 2,
      name: "The Matrix",
      image: "/path/to/image2.jpg",
      rating: 8.7,
      genres: ["Action", "Sci-Fi"],
      year: "1999",
      duration: "136 min",
      description: "A hacker discovers a shocking truth about reality.",
    },
  ];
  const onClick = vi.fn();
  it("renders all movies passed in props", () => {
    render(<MovieList movies={movies} onClick={onClick} />);
    movies.forEach((movie) => {
      expect(screen.getByText(movie.name)).toBeInTheDocument();
    });
  });
  it("calls 'onClick' with correct movie id when a movie is clicked", () => {
    render(<MovieList movies={movies} onClick={onClick} />);
    const movieTile = screen.getByText("Inception");
    fireEvent.click(movieTile);
    expect(onClick).toHaveBeenCalledWith(1);
  });
  it("renders a MovieTile component for each movie", () => {
    render(<MovieList movies={movies} onClick={onClick} />);
    const movieTiles = screen.getAllByRole("img");
    expect(movieTiles.length).toBe(movies.length);
  });
});
