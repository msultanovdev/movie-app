import { FC, useState } from "react";
import "./MovieForm.css";
import { Movie } from "../../types";
import FlexRow from "../../layouts/FlexRow/FlexRow";
import { formatDate } from "../../utils/helper";

export interface IMovieFormProps {
  initiaMovieState?: Movie;
  onSubmit: (data: Movie) => void;
}

const epmtyMovieState: Movie = {
  id: Date.now() + Math.floor(Math.random() * 1000),
  name: "",
  year: formatDate(new Date()),
  image: "",
  rating: 0,
  genre: "",
  duration: 0,
  description: "",
};

const MovieForm: FC<IMovieFormProps> = (props) => {
  const { initiaMovieState, onSubmit } = props;
  const [formData, setFormData] = useState<Movie>(
    initiaMovieState ?? epmtyMovieState
  );
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleReset = () => {
    setFormData({ ...epmtyMovieState, id: formData.id });
  };
  return (
    <form className="movie-form" onSubmit={() => onSubmit(formData)}>
      <FlexRow>
        <div className="form-group form-full-input">
          <label>Title</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Moana"
          />
        </div>

        <div className="form-group">
          <label>Release Date</label>
          <input
            type="date"
            name="year"
            value={formatDate(new Date(formData.year))}
            onChange={handleChange}
          />
        </div>
      </FlexRow>

      <FlexRow>
        <div className="form-group form-full-input">
          <label>Movie URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://"
          />
        </div>

        <div className="form-group">
          <label>Rating</label>
          <input
            type="number"
            name="rating"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            placeholder="7.8"
          />
        </div>
      </FlexRow>

      <FlexRow>
        <div className="form-group form-full-input">
          <label>Genre</label>
          <select name="genre" value={formData.genre} onChange={handleChange}>
            <option value="">Select Genre</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Comedy">Comedy</option>
          </select>
        </div>

        <div className="form-group">
          <label>Runtime</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="minutes"
          />
        </div>
      </FlexRow>

      <div className="form-group overview">
        <label>Overview</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Movie description"
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={handleReset} className="reset-button">
          Reset
        </button>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
