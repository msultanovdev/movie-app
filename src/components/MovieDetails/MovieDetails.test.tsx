import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieDetails from "./MovieDetails";
import { IMovie } from "../../types";
import { BrowserRouter } from "react-router-dom";

describe("<MovieDetails />", () => {
  const mockMovie: IMovie = {
    title: "Inception",
    poster_path: "/path/to/poster.jpg",
    vote_average: 8.8,
    genres: ["Action", "Drama"],
    release_date: "2010-07-16",
    runtime: 148,
    overview:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    id: 0,
    tagline: "",
    vote_count: 0,
    budget: 0,
    revenue: 0,
  };

  const mockOnBackButtonClick = vi.fn();

  it("renders correctly", () => {
    render(
      <MovieDetails
        movie={mockMovie}
        onBackButtonClick={mockOnBackButtonClick}
      />,
      { wrapper: BrowserRouter }
    );
    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("Action Drama")).toBeInTheDocument();
    expect(screen.getByText(/corporate secrets/)).toBeInTheDocument();
  });

  it("handles the back button click", () => {
    render(
      <MovieDetails
        movie={mockMovie}
        onBackButtonClick={mockOnBackButtonClick}
      />,
      { wrapper: BrowserRouter }
    );
    fireEvent.click(screen.getByText("Search"));
    expect(mockOnBackButtonClick).toHaveBeenCalledWith(null);
  });

  it("displays formatted time for movie runtime", () => {
    render(
      <MovieDetails
        movie={mockMovie}
        onBackButtonClick={mockOnBackButtonClick}
      />,
      { wrapper: BrowserRouter }
    );
    expect(screen.getByText("2h 28 min")).toBeInTheDocument();
  });

  it("displays the rating", () => {
    render(
      <MovieDetails
        movie={mockMovie}
        onBackButtonClick={mockOnBackButtonClick}
      />,
      { wrapper: BrowserRouter }
    );
    expect(screen.getByText("8.8")).toBeInTheDocument();
  });
});
