export interface ICounterProps {
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

export interface IButtonProps {
  children?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: "submit" | "reset" | "button" | undefined;
}
