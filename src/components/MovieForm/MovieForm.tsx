import { FC } from "react";
import "./MovieForm.css";
import { IMovie } from "../../types";
import FlexRow from "../../layouts/FlexRow/FlexRow";
// import { formatDate } from "../../utils/helper";
import { Controller, useForm } from "react-hook-form";
import Select, { Options } from "react-select";

export interface IMovieFormProps {
  initiaMovieState?: IMovie;
  onSubmit: (data: IMovie) => void;
}

// const epmtyMovieState: IMovie = {
//   id: Date.now() + Math.floor(Math.random() * 1000),
//   title: "",
//   release_date: formatDate(new Date()),
//   poster_path: "",
//   vote_average: "",
//   genres: [],
//   runtime: "",
//   overview: "",
//   tagline: "",
//   vote_count: "",
//   budget: "",
//   revenue: "",
// };

type SelectOptionType = Options<{ value: string; label: string }>;

const options: SelectOptionType = [
  { value: "Action", label: "Action" },
  { value: "Adventure", label: "Adventure" },
  { value: "Comedy", label: "Comedy" },
  { value: "Documentary", label: "Documentary" },
];

const MovieForm: FC<IMovieFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm<IMovie<SelectOptionType>>();
  const { onSubmit, initiaMovieState } = props;
  // const [formData, setFormData] = useState<IMovie>(
  //   initiaMovieState ?? epmtyMovieState
  // );

  // const handleChange = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleGenreChange = (
  //   selectedOptions: { value: string; label: string }[]
  // ) => {
  //   const genreLabels = selectedOptions.map((option) => option.label);
  //   setValue("genres", genreLabels);
  // };

  const handleReset = () => {
    reset();
    setValue("genres", []);
  };

  const onFormSubmit = (data: IMovie<SelectOptionType>) => {
    const updatedData = {
      ...data,
      genres: data.genres.map((option: { label: string }) => option.label),
    };
    onSubmit(updatedData);
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit(onFormSubmit)}>
      <FlexRow>
        <div className="form-group form-full-input">
          <label>Title {errors.title && "is required"}</label>
          <input
            defaultValue={initiaMovieState?.title}
            {...register("title", { required: true })}
            type="text"
            name="title"
            placeholder="Moana"
          />
        </div>

        <div className="form-group">
          <label>Release Date {errors.release_date && "is required"}</label>
          <input
            defaultValue={initiaMovieState?.release_date}
            {...register("release_date", { required: true })}
            type="date"
            name="release_date"
          />
        </div>
      </FlexRow>

      <FlexRow>
        <div className="form-group form-full-input">
          <label>
            Movie URL {errors.poster_path && "must follow url pattern"}
          </label>
          <input
            defaultValue={initiaMovieState?.poster_path}
            {...register("poster_path", {
              required: true,
              pattern: /https?:\/\/[^\s/$.?#].[^\s]*/i,
            })}
            name="poster_path"
            placeholder="https://"
          />
        </div>

        <div className="form-group">
          <label>
            Rating {errors.vote_average && "must be between 0 - 10"}
          </label>
          <input
            defaultValue={initiaMovieState?.vote_average}
            {...register("vote_average", {
              required: true,
              min: 0,
              max: 10,
              valueAsNumber: true,
            })}
            type="number"
            name="vote_average"
            step="0.1"
            placeholder="7.8"
          />
        </div>
      </FlexRow>

      <FlexRow>
        <div className="form-group form-full-input">
          <label>Genre {errors.genres && "select at least one genre"}</label>
          <Controller
            defaultValue={initiaMovieState?.genres.map((genre) => {
              return { value: genre, label: genre };
            })}
            name="genres"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  {...register("genres", { required: true })}
                  {...field}
                  options={options}
                  isMulti
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              );
            }}
          />
        </div>

        <div className="form-group">
          <label>Runtime</label>
          <input
            defaultValue={initiaMovieState?.runtime}
            {...register("runtime", { required: true, valueAsNumber: true })}
            type="number"
            name="runtime"
            placeholder="minutes"
          />
        </div>
      </FlexRow>

      <div className="form-group overview">
        <label>Overview</label>
        <textarea
          defaultValue={initiaMovieState?.overview}
          {...register("overview", { required: true })}
          name="overview"
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
