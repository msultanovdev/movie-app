import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { useFetchData } from "../../hooks/useFetchData";
import MovieList from "./MovieList";
import "@testing-library/jest-dom";

vi.mock("../../hooks/useFetchData");
describe("MovieList Component", () => {
  beforeEach(() => {
    vi.mocked(useFetchData).mockReturnValue({
      isLoading: false,
      data: null,
      error: null,
      refetch: vi.fn(() => Promise.resolve()),
    });
  });
  it("renders loading state initially", () => {
    vi.mocked(useFetchData).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
      refetch: vi.fn(() => Promise.resolve()),
    });
    render(<MovieList />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  it("renders movies when fetched successfully", async () => {
    vi.mocked(useFetchData).mockReturnValue({
      isLoading: false,
      error: null,
      data: {
        data: [
          {
            id: "1",
            title: "Movie Title 1",
            release_date: "2020-01-01",
            genres: ["Comedy"],
          },
          {
            id: "2",
            title: "Movie Title 2",
            release_date: "2019-01-01",
            genres: ["Horror"],
          },
        ],
      },
      refetch: vi.fn(() => Promise.resolve()),
    });
    render(<MovieList />);
    await waitFor(() => {
      expect(screen.getByText("2 movies found")).toBeInTheDocument();
      expect(screen.getByText("Movie Title 1")).toBeInTheDocument();
      expect(screen.getByText("Movie Title 2")).toBeInTheDocument();
    });
  });
  it("handles error state", () => {
    vi.mocked(useFetchData).mockReturnValue({
      isLoading: false,
      error: "Failed to fetch",
      data: null,
      refetch: vi.fn(() => Promise.resolve()),
    });
    render(<MovieList />);
    expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
  });
});
