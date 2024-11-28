import Link from "next/link";
import { IMovie } from "../types";
import { GetServerSideProps } from "next";
import { moviesURL } from "../consts";
import MovieTile from "../components/MovieTile/MovieTile";
import cl from "./MovieList.module.css";

const fetchData = async () => {
  const res = await fetch(moviesURL);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const { data } = await res.json();

  return data;
};

export default async function MoviesPage() {
  const movies: IMovie[] = await fetchData();
  console.log(movies);

  return (
    <div className={cl.movieListWrapper} data-testid="cy-movie-list">
      <h1>Movies</h1>
      <div>
        {/* {activeMovie ? (
          <div>
            <h2>{activeMovie.title}</h2>
            <p>{activeMovie.overview}</p>
            <Link href="/">Back to Input</Link>
          </div>
        ) : (
          <input type="text" placeholder="Search movies..." disabled />
        )} */}
      </div>
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
