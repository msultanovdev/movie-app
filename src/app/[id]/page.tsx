import MovieDetails from "../../components/MovieDetails/MovieDetails";
import PageWrapper from "../PageWrapper";
import { IMovie } from "../../types";
import { moviesURL } from "../../consts";

interface MovieDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function MovieDetailsPage({
  params,
}: MovieDetailsPageProps) {
  const { id } = await params;
  try {
    const response = await fetch(`${moviesURL}/${id}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return <div>Not found</div>;
    }
    const movie: IMovie = await response.json();

    return (
      <PageWrapper>
        <MovieDetails movie={movie} />
      </PageWrapper>
    );
  } catch (error) {
    console.error("Something wrong: ", error);
    return <div>Ошибка загрузки данных</div>;
  }
}
