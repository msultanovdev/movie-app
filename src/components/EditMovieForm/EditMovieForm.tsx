import { useNavigate, useParams } from "react-router-dom";
import Dialog from "../Dialog/Dialog";
import MovieForm from "../MovieForm/MovieForm";
import { IMovie } from "../../types";
import axios from "axios";
import { moviesURL } from "../../consts";
import { useFetchData } from "../../hooks/useFetchData";

const EditMovieForm = () => {
  const { movieId } = useParams();
  const { data } = useFetchData<IMovie>({
    url: `${moviesURL}/${movieId}`,
    isRequestNeed: true,
  });
  const navigate = useNavigate();

  if (!data) {
    return null;
  }

  const handleSubmit = async (body: IMovie) => {
    try {
      const { data } = await axios.put<IMovie>(moviesURL, {
        ...body,
        id: Number(movieId),
      });
      navigate(`/${data.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog
      onClose={() => {
        navigate(`/${movieId}`);
      }}
      title="Edit Movie"
    >
      <MovieForm initiaMovieState={data} onSubmit={handleSubmit} />
    </Dialog>
  );
};

export default EditMovieForm;
