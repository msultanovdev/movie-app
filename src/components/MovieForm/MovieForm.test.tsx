import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import MovieForm from "./MovieForm";
import { IMovie } from "../../types";

const initialValue: IMovie = {
  id: 0,
  title: "",
  tagline: "",
  vote_average: 0,
  vote_count: 0,
  release_date: "",
  poster_path: "",
  overview: "",
  budget: 0,
  revenue: 0,
  runtime: 0,
  genres: ["Comedy"],
};

describe("<MovieForm />", () => {
  const mockSubmit = vi.fn();
  it("renders the form with initial empty state correctly", () => {
    render(<MovieForm onSubmit={mockSubmit} />);
    expect(screen.getByPlaceholderText("Moana")).toHaveValue("");
    expect(screen.getByPlaceholderText("https://")).toHaveValue("");
    expect(screen.getByPlaceholderText("7.8")).toHaveValue(null);
    expect(screen.getByPlaceholderText("minutes")).toHaveValue(null);
    expect(screen.getByPlaceholderText("Movie description")).toHaveValue("");
  });
  it("updates form fields when user types", async () => {
    render(<MovieForm onSubmit={mockSubmit} initiaMovieState={initialValue} />);
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText("Moana"), "Inception");
    await user.type(
      screen.getByPlaceholderText("https://"),
      "https://inception.com/poster.jpg"
    );
    await user.type(screen.getByPlaceholderText("7.8"), "8.8");
    await user.type(screen.getByPlaceholderText("minutes"), "148");
    await user.type(
      screen.getByPlaceholderText("Movie description"),
      "A dream within a dream."
    );
    expect(screen.getByPlaceholderText("Moana")).toHaveValue("Inception");
    expect(screen.getByPlaceholderText("https://")).toHaveValue(
      "https://inception.com/poster.jpg"
    );
    expect(screen.getByPlaceholderText("7.8")).toHaveValue(8.8);
    expect(screen.getByPlaceholderText("minutes")).toHaveValue(148);
    expect(screen.getByPlaceholderText("Movie description")).toHaveValue(
      "A dream within a dream."
    );
  });
  it("submits the form data", async () => {
    const user = userEvent.setup();
    render(<MovieForm onSubmit={mockSubmit} initiaMovieState={initialValue} />);
    await user.type(screen.getByPlaceholderText("Moana"), "Inception");
    await user.type(
      screen.getByPlaceholderText("https://"),
      "https://inception.com/poster.jpg"
    );
    await user.type(screen.getByPlaceholderText("7.8"), "8.8");
    await user.type(screen.getByPlaceholderText("minutes"), "148");
    await user.type(screen.getByLabelText("Release Date"), "2023-11-24");
    await user.type(
      screen.getByPlaceholderText("Movie description"),
      "Thrilling mind-bending journey"
    );
    await user.click(screen.getByText("Submit"));
    expect(mockSubmit).toHaveBeenCalled();
  });
  it("resets the form when reset button is clicked", async () => {
    const user = userEvent.setup();
    render(<MovieForm onSubmit={mockSubmit} />);
    await user.type(screen.getByPlaceholderText("Moana"), "Inception");
    await user.click(screen.getByText("Reset"));
    expect(screen.getByPlaceholderText("Moana")).toHaveValue("");
  });
});
