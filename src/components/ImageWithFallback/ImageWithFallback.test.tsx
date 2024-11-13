import { describe, it, expect } from 'vitest';
import { fireEvent } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import ImageWithFallback from './ImageWithFallback';
import "@testing-library/jest-dom";

describe('<ImageWithFallback />', () => {
  const src = 'https://example.com/original-image.jpg';
  const fallback = 'https://example.com/fallback-image.jpg';
  const altText = 'Test Image';
  it('displays the primary image source', () => {
    render(<ImageWithFallback src={src} alt={altText} />);
    const image = screen.getByAltText(altText);
    expect(image).toHaveAttribute('src', src);
  });
  it('switches to fallback image on error', () => {
    render(<ImageWithFallback src={src} fallback={fallback} alt={altText} />);
    const image = screen.getByAltText(altText);
    fireEvent.error(image);
    expect(image).toHaveAttribute('src', fallback);
  });
  it('updates the image source when the src prop is changed', () => {
    const { rerender } = render(<ImageWithFallback src={src} alt={altText} />);
    const newSrc = 'https://example.com/new-image.jpg';
    rerender(<ImageWithFallback src={newSrc} alt={altText} />);
    const image = screen.getByAltText(altText);
    expect(image).toHaveAttribute('src', newSrc);
  });
  it('uses the default fallback when no fallback is specified and an error occurs', () => {
    const defaultFallback = "https://plus.unsplash.com/premium_photo-1710961232986-36cead00da3c?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    render(<ImageWithFallback src={src} alt={altText} />);
    const image = screen.getByAltText(altText);
    fireEvent.error(image);
    expect(image).toHaveAttribute('src', defaultFallback);
  });
});