import { render, screen, fireEvent } from "@testing-library/react";
import GenreSelect from "./GenreSelect";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";

describe("GenreSelect component", () => {
  const genres = ["Rock", "Pop", "Jazz"];
  const onSelect = vi.fn();
  it("renders a list of genres", () => {
    render(<GenreSelect genres={genres} onSelect={onSelect} selectedGenre="" />);
    genres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
  });
  it("calls 'onSelect' when a genre is clicked", () => {
    render(<GenreSelect genres={genres} onSelect={onSelect} selectedGenre="" />);
    const genreItem = screen.getByText("Rock");
    fireEvent.click(genreItem);
    expect(onSelect).toHaveBeenCalledWith("Rock");
  });

  it("calls 'onSelect' when Enter is pressed on a genre", () => {
    render(<GenreSelect genres={genres} onSelect={onSelect} selectedGenre="" />);
    const genreItem = screen.getByText("Jazz");
    genreItem.focus();
    fireEvent.keyDown(genreItem, { key: "Enter", code: "Enter" });
    expect(onSelect).toHaveBeenCalledWith("Jazz");
  });
});
