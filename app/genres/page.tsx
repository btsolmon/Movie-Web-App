"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { tmdb } from "@/lib/tmdb";
import { Movie } from "@/types";
import MovieCard from "@/app/components/MovieCard";
import { Pagination } from "@/app/components/Pagination";

const getImageUrl = (path: string | null) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : "/placeholder.jpg";

function GenresContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedGenres =
    searchParams.get("genre")?.split(",").filter(Boolean) || [];

  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    tmdb.get("/genre/movie/list").then((res) => setGenres(res.data.genres));
  }, []);

  const fetchMovies = async (p: number) => {
    setIsLoading(true);
    try {
      const res = await tmdb.get("/discover/movie", {
        params: {
          with_genres: selectedGenres.join(","),
          page: p,
          sort_by: "popularity.desc",
        },
      });
      setMovies(res.data.results.slice(0, 8));
      setTotalResults(res.data.total_results);
      setPage(p);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(1);
  }, [searchParams.get("genre")]);

  const handleGenreToggle = (id: number) => {
    const idStr = id.toString();
    const newGenres = selectedGenres.includes(idStr)
      ? selectedGenres.filter((g) => g !== idStr)
      : [...selectedGenres, idStr];

    const params = new URLSearchParams();
    if (newGenres.length > 0) params.set("genre", newGenres.join(","));
    router.push(`/genres?${params.toString()}`);
  };

  const selectedGenreNames = genres
    .filter((g) => selectedGenres.includes(g.id.toString()))
    .map((g) => g.name)
    .join(", ");

  return (
    <div className="max-w-[1200px] mx-auto py-10 px-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Search filter</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-64 flex-shrink-0">
          <h2 className="text-2xl font-bold mb-1">Genres</h2>
          <p className="text-lg text-gray-500 mb-5">
            See lists of movies by genre
          </p>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => {
              const isActive = selectedGenres.includes(genre.id.toString());
              return (
                <button
                  key={genre.id}
                  onClick={() => handleGenreToggle(genre.id)}
                  className={`flex items-center gap-1 px-3 py-1.5 border rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-black text-white dark:bg-white dark:text-black border-transparent"
                      : "border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  {genre.name}
                  {isActive ? (
                    <span className="ml-1">✕</span>
                  ) : (
                    <span className="ml-1">›</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold mb-6">
            {totalResults} titles in &quot;{selectedGenreNames || "All Genres"}
            &quot;
          </h2>

          {isLoading ? (
            <div className="text-center py-20">Loading...</div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    getImageUrl={getImageUrl}
                  />
                ))}
              </div>
              <div className="mt-10">
                <Pagination
                  currentPage={page}
                  onPageChange={fetchMovies}
                  totalPages={0}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GenresPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GenresContent />
    </Suspense>
  );
}
