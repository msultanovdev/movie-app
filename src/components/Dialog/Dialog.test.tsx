import { render, screen, fireEvent } from "@testing-library/react";
import Dialog from "./Dialog";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";

describe("Dialog component", () => {
  const mockOnClose = vi.fn();
  const title = "Test Dialog";
  const children = <div>Dialog content</div>;
  it("renders the dialog with title and children", () => {
    render(<Dialog isFocusTrapActive={false} title={title} onClose={mockOnClose}>{children}</Dialog>);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText("Dialog content")).toBeInTheDocument();
  });
  it("calls onClose when the backdrop is clicked", () => {
    render(<Dialog isFocusTrapActive={false} title={title} onClose={mockOnClose}>{children}</Dialog>);
    const backdrop = screen.getByTestId("backdrop");
    fireEvent.click(backdrop);
    expect(mockOnClose).toHaveBeenCalled();
  });
  it("calls onClose when the close button is clicked", () => {
    render(<Dialog isFocusTrapActive={false} title={title} onClose={mockOnClose}>{children}</Dialog>);
    const closeButton = screen.getByRole("button", { name: /×/ });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
