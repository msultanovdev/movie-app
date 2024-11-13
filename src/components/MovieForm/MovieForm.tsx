import { FC, useState } from "react";
import "./MovieForm.css";
import { IMovie } from "../../types";
import FlexRow from "../../layouts/FlexRow/FlexRow";
import { formatDate } from "../../utils/helper";

export interface IMovieFormProps {
  initiaMovieState?: IMovie;
  onSubmit: (data: IMovie) => void;
}

const epmtyMovieState: IMovie = {
  id: Date.now() + Math.floor(Math.random() * 1000),
  title: "",
  release_date: formatDate(new Date()),
  poster_path: "",
  vote_average: "",
  genres: [],
  runtime: "",
  overview: "",
  tagline: "",
  vote_count: "",
  budget: "",
  revenue: "",
};

const MovieForm: FC<IMovieFormProps> = (props) => {
  const { initiaMovieState, onSubmit } = props;
  const [formData, setFormData] = useState<IMovie>(
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
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Moana"
          />
        </div>

        <div className="form-group">
          <label>Release Date</label>
          <input
            type="date"
            name="release_date"
            value={formatDate(new Date(formData.release_date))}
            onChange={handleChange}
          />
        </div>
      </FlexRow>

      <FlexRow>
        <div className="form-group form-full-input">
          <label>Movie URL</label>
          <input
            type="url"
            name="poster_path"
            value={formData.poster_path}
            onChange={handleChange}
            placeholder="https://"
          />
        </div>

        <div className="form-group">
          <label>Rating</label>
          <input
            type="number"
            name="vote_average"
            step="0.1"
            value={formData.vote_average}
            onChange={handleChange}
            placeholder="7.8"
          />
        </div>
      </FlexRow>

      <FlexRow>
        <div className="form-group form-full-input">
          <label>Genre</label>
          <select
            name="genre"
            value={formData.genres[0]}
            onChange={handleChange}
          >
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
            name="runtime"
            value={formData.runtime}
            onChange={handleChange}
            placeholder="minutes"
          />
        </div>
      </FlexRow>

      <div className="form-group overview">
        <label>Overview</label>
        <textarea
          name="overview"
          value={formData.overview}
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
