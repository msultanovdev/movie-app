import { useNavigate } from "react-router-dom";
import Dialog from "../Dialog/Dialog";
import MovieForm from "../MovieForm/MovieForm";
import { IMovie } from "../../types";
import axios from "axios";
import { moviesURL } from "../../consts";

const AddMovieForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (body: IMovie) => {
    try {
      const { data } = await axios.post<IMovie>(moviesURL, body);
      navigate(`/${data.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog
      onClose={() => {
        navigate("/");
      }}
      title="Add Movie"
    >
      <MovieForm onSubmit={handleSubmit} />
    </Dialog>
  );
};

export default AddMovieForm;
