import { render, screen, fireEvent } from "@testing-library/react";
import MovieDetails from "./MovieDetails";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { Movie } from "../../types";

describe("MovieDetails component", () => {
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
  const onBackButtonClick = vi.fn();

  it("renders movie details correctly", () => {
    render(
      <MovieDetails movie={movie} onBackButtonClick={onBackButtonClick} />
    );

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByAltText("Inception poster")).toHaveAttribute(
      "src",
      "/path/to/image.jpg"
    );
    expect(screen.getByText("8.8")).toBeInTheDocument();
    expect(screen.getByText("2010")).toBeInTheDocument();
    expect(screen.getByText("148 min")).toBeInTheDocument();
    expect(
      screen.getByText("A mind-bending thriller where reality is questioned.")
    ).toBeInTheDocument();
  });

  it("calls 'onBackButtonClick' with null when back button is clicked", () => {
    render(
      <MovieDetails movie={movie} onBackButtonClick={onBackButtonClick} />
    );
    const backButton = screen.getByText("Search");
    fireEvent.click(backButton);
    expect(onBackButtonClick).toHaveBeenCalledWith(null);
  });

  it("displays movie poster with correct src and alt text", () => {
    render(
      <MovieDetails movie={movie} onBackButtonClick={onBackButtonClick} />
    );
    const poster = screen.getByAltText("Inception poster");
    expect(poster).toHaveAttribute("src", "/path/to/image.jpg");
  });
});
