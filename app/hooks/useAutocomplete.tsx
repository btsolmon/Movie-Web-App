/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { tmdb } from "@/lib/tmdb";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export function useAutocomplete(query: string) {
  const [items, setItems] = useState<Movie[]>([]);

  useEffect(() => {
    if (!query) return setItems([]);
    const t = setTimeout(async () => {
      const { data } = await tmdb.get("/search/movie", {
        params: { query, page: 1 },
      });
      setItems(data.results.slice(0, 5));
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  return items;
}
