import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import GenreSelect from './GenreSelect';
import { Genre } from '../../types';

describe('<GenreSelect />', () => {
  const genres: Genre[] = [
    { value: '1', title: 'Action' },
    { value: '2', title: 'Comedy' },
    { value: '3', title: 'Thriller' }
  ];
  const selectedGenre = { value: '1', title: 'Action' };
  const onSelect = vi.fn();
  it('renders all genres with the selected genre highlighted', () => {
    render(<GenreSelect genres={genres} onSelect={onSelect} selectedGenre={selectedGenre} />);
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Comedy')).toBeInTheDocument();
    expect(screen.getByText('Thriller')).toBeInTheDocument();
    expect(screen.getByText('Action').className).toContain('active');
  });
  it('calls onSelect when a genre is clicked', async () => {
    const user = userEvent.setup();
    render(<GenreSelect genres={genres} onSelect={onSelect} selectedGenre={selectedGenre} />);
    await user.click(screen.getByText('Comedy'));
    expect(onSelect).toHaveBeenCalledWith(genres[1]);
  });
  it('calls onSelect when Enter is pressed on a genre', async () => {
    const user = userEvent.setup();
    render(<GenreSelect genres={genres} onSelect={onSelect} selectedGenre={selectedGenre} />);
    const comedyGenre = screen.getByText('Comedy');
    await comedyGenre.focus();
    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledWith(genres[1]);
  });
});