import { render, screen, fireEvent } from "@testing-library/react";
import MovieForm from "./MovieForm";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { Movie } from "../../types";

describe("MovieForm component", () => {
  const mockOnSubmit = vi.fn();
  const initialMovieState: Movie = {
    id: 123,
    name: "Inception",
    year: "2010-07-16",
    image: "https://example.com/inception.jpg",
    rating: 8.8,
    genre: "Action",
    duration: 148,
    description: "A mind-bending thriller where reality is questioned.",
  };

  it("renders form with initial values", () => {
    render(
      <MovieForm onSubmit={mockOnSubmit} initiaMovieState={initialMovieState} />
    );
    expect(screen.getByDisplayValue("Inception")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2010-07-16")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("https://example.com/inception.jpg")
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("8.8")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Action")).toBeInTheDocument();
    expect(screen.getByDisplayValue("148")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(
        "A mind-bending thriller where reality is questioned."
      )
    ).toBeInTheDocument();
  });

  it("handles input change correctly", () => {
    render(
      <MovieForm onSubmit={mockOnSubmit} initiaMovieState={initialMovieState} />
    );
    const titleInput = screen.getByPlaceholderText("Moana");
    fireEvent.change(titleInput, { target: { value: "The Dark Knight" } });
    expect(screen.getByDisplayValue("The Dark Knight")).toBeInTheDocument();
  });

  it("calls onSubmit with the correct data when Submit is clicked", () => {
    render(
      <MovieForm onSubmit={mockOnSubmit} initiaMovieState={initialMovieState} />
    );
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalledWith(initialMovieState);
  });

  it("resets the form when Reset button is clicked", () => {
    render(
      <MovieForm onSubmit={mockOnSubmit} initiaMovieState={initialMovieState} />
    );
    const resetButton = screen.getByRole("button", { name: /reset/i });
    fireEvent.click(resetButton);
    expect(screen.getAllByDisplayValue("")[0]).toBeInTheDocument();
    expect(screen.getAllByDisplayValue("0")[0]).toBeInTheDocument();
  });

  it("handles empty initial state correctly", () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    expect(screen.getAllByDisplayValue("")[0]).toBeInTheDocument();
    expect(screen.getAllByDisplayValue("0")[0]).toBeInTheDocument();
  });
});
