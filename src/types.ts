import { ButtonHTMLAttributes } from "react";

export interface ICounterProps {
  /**
   * Initial value of counter.
   * @default 0
   */
  initValue: number;
}

export interface IGenreSelectProps {
  genres: string[];
  selectedGenre: string;
  onSelect: (genre: string) => void;
}

export interface ISearchProps {
  initSearchQuery?: string;
  onSearch: () => void;
  style?: React.CSSProperties;
}

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: "submit" | "reset" | "button" | undefined;
}

export type Movie = {
  id: number;
  name: string;
  year: string;
  genre: string;
  image: string;
  rating: number;
  duration: number;
  description: string;
};

export type OverlaysType = {
  modal?: {
    title: string;
  } | null;
};
