import { render, screen, fireEvent } from "@testing-library/react";
import GenreSelect from "./GenreSelect";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";

describe("GenreSelect component", () => {
  const genres = ["Rock", "Pop", "Jazz"];
  const onSelect = vi.fn();

  it("renders all genres passed in props", () => {
    render(<GenreSelect genres={genres} onSelect={onSelect} selectedGenre="" />);
    genres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
  });
  it("highlights the selected genre passed in props", () => {
    render(<GenreSelect genres={genres} onSelect={onSelect} selectedGenre="Rock" />);
    const selectedGenre = screen.getByText("Rock");
    expect(selectedGenre).toHaveClass("active");
  });

  it("calls 'onSelect' with correct genre when genre is clicked", () => {
    render(<GenreSelect genres={genres} onSelect={onSelect} selectedGenre="" />);
    const genreItem = screen.getByText("Jazz");
    fireEvent.click(genreItem);
    expect(onSelect).toHaveBeenCalledWith("Jazz");
  });
});
