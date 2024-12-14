import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieTile from "./MovieTile";
import { IMovie } from "../../types";
import { BrowserRouter } from "react-router-dom";

describe("<MovieTile />", () => {
  const mockMovie: IMovie = {
    id: 1,
    title: "Inception",
    poster_path: "https://inception.com/poster.jpg",
    release_date: "2010-07-16",
    genres: ["Action", "Sci-Fi"],
    runtime: 148,
    overview: "A thief who steals corporate secrets...",
    tagline: "",
    vote_average: 0,
    vote_count: 0,
    budget: 0,
    revenue: 0,
  };

  it("renders movie information correctly", () => {
    render(<MovieTile movie={mockMovie} />, { wrapper: BrowserRouter });
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(
      screen.getByText(
        new Date(mockMovie.release_date).getFullYear().toString()
      )
    ).toBeInTheDocument();
    const genresText = mockMovie.genres.join(" ");
    expect(screen.getByText(genresText)).toBeInTheDocument();
    const image = screen.getByAltText(`${mockMovie.title} Poster`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockMovie.poster_path);
  });

  it("applies proper class names for styling", () => {
    render(<MovieTile movie={mockMovie} />, { wrapper: BrowserRouter });
    const mainDiv = screen.getByRole("img", {
      name: `${mockMovie.title} Poster`,
    }).parentElement;
    expect(mainDiv).toHaveClass("poster");
  });
});
