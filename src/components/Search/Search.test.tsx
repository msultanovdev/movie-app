import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Search from "./Search";

describe("<Search />", () => {
  const query = "";
  const setQuery = vi.fn();
  const onSearch = vi.fn();
  it("should render input with placeholder and button correctly", () => {
    render(<Search query={query} setQuery={setQuery} onSearch={onSearch} />);
    expect(
      screen.getByPlaceholderText("What do you want to watch?")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });
  it("should call setQuery when user types in the input", async () => {
    const user = userEvent.setup();
    render(<Search query={query} setQuery={setQuery} onSearch={onSearch} />);
    await user.type(
      screen.getByPlaceholderText("What do you want to watch?"),
      "Inception"
    );
    expect(setQuery).toHaveBeenCalledTimes(9);
    expect(setQuery).toHaveBeenCalledWith("I");
    expect(setQuery).toHaveBeenCalledWith("n");
    expect(setQuery).toHaveBeenCalledWith("c");
    expect(setQuery).toHaveBeenCalledWith("e");
    expect(setQuery).toHaveBeenCalledWith("p");
    expect(setQuery).toHaveBeenCalledWith("t");
    expect(setQuery).toHaveBeenCalledWith("i");
    expect(setQuery).toHaveBeenCalledWith("o");
    expect(setQuery).toHaveBeenCalledWith("n");
  });
  it("calls onSearch when the search button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Search query="Inception" setQuery={setQuery} onSearch={onSearch} />
    );
    await user.click(screen.getByRole("button", { name: "Search" }));
    expect(onSearch).toHaveBeenCalled();
  });
  it("submits on form submit (enter key)", async () => {
    const user = userEvent.setup();
    render(
      <Search query="Inception" setQuery={setQuery} onSearch={onSearch} />
    );
    await user.type(
      screen.getByPlaceholderText("What do you want to watch?"),
      "{enter}"
    );
    expect(onSearch).toHaveBeenCalled();
  });
});
