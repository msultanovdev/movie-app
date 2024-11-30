import cl from "./MovieList.module.css";
import { ReactNode } from "react";
import MovieTile from "../components/MovieTile/MovieTile";
import { genres, moviesURL } from "../consts";
import { IMovie } from "../types";
import Sort from "../components/Sort/Sort";
import GenreSelect from "../components/GenreSelect/GenreSelect";

const fetchData = async (search: string, sort: string) => {
  const url = new URL(moviesURL);
  if (search) {
    url.searchParams.append("search", search);
    url.searchParams.append("searchBy", "title");
  }
  if (sort) {
    url.searchParams.append("sortBy", sort);
    url.searchParams.append("sortOrder", "asc");
  }
  const res = await fetch(url.href);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const { data } = await res.json();

  return data;
};

export default async function PageWrapper({
  children,
  searchParams,
}: {
  children: ReactNode;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const sP = await searchParams;
  const search = typeof sP?.search === "string" ? sP?.search : "";
  const sort = typeof sP?.sort === "string" ? sP?.sort : "";

  const movies: IMovie[] = await fetchData(search as string, sort);

  return (
    <div className={cl.movieListWrapper} data-testid="cy-movie-list">
      <div className={cl.moviesListHeader}>{children}</div>
      <div className="movies-sort">
        <GenreSelect genres={genres} />
        <Sort search={search} />
      </div>
      <div className={cl.movieList}>
        {movies?.length
          ? movies.map((movie) => {
              return (
                <MovieTile
                  data-testid="cy-movie-tile"
                  key={movie.id}
                  movie={movie}
                />
              );
            })
          : "Nothing found"}
      </div>
    </div>
  );
}
