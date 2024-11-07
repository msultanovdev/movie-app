import { render, screen } from "@testing-library/react";
import MovieTile from "./MovieTile";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { Movie } from "../../types";

describe("MovieTile component", () => {
  const movie: Movie = {
    id: 1,
    name: "Inception",
    image: "/path/to/image.jpg",
    rating: 8.8,
    genres: ["Action", "Sci-Fi", "Thriller"],
    year: "2010",
    duration: "148 min",
    description: "A mind-bending thriller where reality is questioned.",
  };

  it("renders movie name, year, and genres correctly", () => {
    render(<MovieTile movie={movie} />);

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getAllByText("2010")[0]).toBeInTheDocument();
    expect(screen.getByText("Action Sci-Fi Thriller")).toBeInTheDocument();
  });

  it("renders movie poster image with correct src and alt text", () => {
    render(<MovieTile movie={movie} />);

    const posterImage = screen.getByAltText("Inception Poster");
    expect(posterImage).toHaveAttribute("src", "/path/to/image.jpg");
  });

  it("applies additional props to the root element", () => {
    const handleClick = vi.fn();
    render(<MovieTile movie={movie} onClick={handleClick} data-testid="movie-tile" />);

    const movieTile = screen.getByTestId("movie-tile");
    movieTile.click();

    expect(handleClick).toHaveBeenCalled();
  });
});
