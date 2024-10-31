import { render, screen, fireEvent } from "@testing-library/react";
import Search from "./Search";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";

describe("Search component", () => {
  const onSearch = vi.fn();
  it("renders an input with the value equal to initial value passed in props", () => {
    render(<Search initSearchQuery="initial query" onSearch={onSearch} />);
    const input = screen.getByPlaceholderText("What do you want to watch?");
    expect(input).toHaveValue("initial query");
  });
  it("calls 'onSearch' with proper value after typing and clicking Submit button", () => {
    render(<Search initSearchQuery="" onSearch={onSearch} />);
    const input = screen.getByPlaceholderText("What do you want to watch?");
    const searchButton = screen.getByText("Search");
    fireEvent.change(input, { target: { value: "new search query" } });
    expect(input).toHaveValue("new search query");
    fireEvent.click(searchButton);
    expect(onSearch).toHaveBeenCalled();
  });

  it("calls 'onSearch' with proper value after typing and pressing Enter key", () => {
    render(<Search initSearchQuery="" onSearch={onSearch} />);
    const input = screen.getByPlaceholderText("What do you want to watch?");
    fireEvent.change(input, { target: { value: "another search query" } });
    expect(input).toHaveValue("another search query");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(onSearch).toHaveBeenCalled();
  });
});
