import { render, screen, fireEvent } from "@testing-library/react";
import Sort from "./Sort";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";

describe("Sort component", () => {
  const options = [
    { value: "name", label: "Name" },
    { value: "date", label: "Date" },
    { value: "rating", label: "Rating" },
  ];
  const onChange = vi.fn();
  it("renders all options passed in props", () => {
    render(<Sort options={options} onChange={onChange} />);
    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });
  it("calls 'onChange' with the correct value when an option is selected", () => {
    render(<Sort options={options} onChange={onChange} />);
    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "date" } });
    expect(onChange).toHaveBeenCalledWith("date");
  });
  it("displays a label 'Sort by'", () => {
    render(<Sort options={options} onChange={onChange} />);
    expect(screen.getByText("Sort by")).toBeInTheDocument();
  });

  it("applies the correct styles to the select container", () => {
    render(<Sort options={options} onChange={onChange} />);
    const container = screen.getByText("Sort by").closest("div");
    expect(container).toHaveClass("selectContainer");
  });
});
