import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter.tsx";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { ICounterProps } from "../../types.ts";

const initialValue = 0;

const mockComponentProps: ICounterProps = {
    initValue: initialValue,
}

describe("Counter component", () => {
  it("renders initial value provided in props", () => {
    render(<Counter {...mockComponentProps} />);
    const countElement = screen.getByText(initialValue);
    expect(countElement).toBeInTheDocument();
  });
  it("decrements the value when 'Minus' button is clicked", () => {
    render(<Counter {...mockComponentProps} />);
    const minusButton = screen.getByText("Minus");
    fireEvent.click(minusButton);
    expect(screen.getByText(initialValue - 1)).toBeInTheDocument();
  });
  it("increments the value when 'Plus' button is clicked", () => {
    render(<Counter {...mockComponentProps} />);
    const plusButton = screen.getByText("Plus");
    fireEvent.click(plusButton);
    expect(screen.getByText(initialValue + 1)).toBeInTheDocument();
  });
});
