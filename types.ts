export type Genre = {
  id: number;
  name: string;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string; 
  softcore: boolean;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TrailerResult = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
};

export type CastMember = {
  id: number;
  name: string;
  character?: string;
  job?: string;
  department?: string;
  known_for_department?: string;
  profile_path: string | null;
  order?: number;
};

export type MovieDetails = Omit<Movie, "genre_ids"> & {
  genres: Genre[];
  runtime: number | null;
  tagline: string;
  status: string;
  homepage: string;
  budget: number;
  revenue: number;
  trailers: TrailerResult[];
  credits: CastMember[];
};