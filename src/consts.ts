import { Genre } from "./types";

export const baseURL = "http://localhost:4000/";
export const moviesURL = "http://localhost:4000/movies";
export const genres: Genre[] = [
  { title: "All", value: "" },
  { title: "Documentary", value: "documentary" },
  { title: "Comedy", value: "comedy" },
  { title: "Horror", value: "horror" },
  { title: "Crime", value: "crime" },
];
