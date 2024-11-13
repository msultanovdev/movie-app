import { ButtonHTMLAttributes } from "react";

export interface ICounterProps {
  /**
   * Initial value of counter.
   * @default 0
   */
  initValue: number;
}

export interface ISearchProps {
  query: string;
  setQuery: (e: string) => void;
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

export interface IMovie {
  id: number;
  title: string | "";
  tagline: string;
  vote_average: number | "";
  vote_count: number | "";
  release_date: string;
  poster_path: string;
  overview: string;
  budget: number | "";
  revenue: number | "";
  runtime: number | "";
  genres: string[];
}

export interface IMovieApi {
  data: IMovie[];
  limit: number;
  offset: number;
  totalAmount: number;
}

export type Genre = {
  title: string;
  value: string;
};
