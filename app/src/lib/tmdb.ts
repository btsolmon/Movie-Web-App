import axios from "axios";

export const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "826f50ac875ac781d67fa627ccd5498a",
  },
});
