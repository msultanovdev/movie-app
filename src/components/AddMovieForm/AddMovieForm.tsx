import { useNavigate } from "react-router-dom";
import Dialog from "../Dialog/Dialog";
import MovieForm from "../MovieForm/MovieForm";

const AddMovieForm = () => {
  const navigate = useNavigate();

  return (
    <Dialog
      onClose={() => {
        navigate("/");
      }}
      title="Add Movie"
    >
      <MovieForm onSubmit={() => {}} />
    </Dialog>
  );
};

export default AddMovieForm;
