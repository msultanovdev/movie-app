import Link from "next/link";
import { IMovie } from "../types";
import { GetServerSideProps } from "next";
import { moviesURL } from "../consts";
import MovieTile from "../components/MovieTile/MovieTile";
import cl from "./MovieList.module.css";
import Search from "../components/Search/Search";
import { ReactNode } from "react";

const fetchData = async () => {
  const res = await fetch(moviesURL);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const { data } = await res.json();

  return data;
};

export default async function PageWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const movies: IMovie[] = await fetchData();

  return (
    <div className={cl.movieListWrapper} data-testid="cy-movie-list">
      <div className={cl.moviesListHeader}>{children}</div>
      <div className={cl.movieList}>
        {movies?.length
          ? movies.map((movie) => {
              return (
                <MovieTile
                  data-testid="cy-movie-tile"
                  key={movie.id}
                  //   onClick={() => handleMovieClick(movie)}
                  movie={movie}
                />
              );
            })
          : "Nothing found"}
      </div>
    </div>
  );
}
