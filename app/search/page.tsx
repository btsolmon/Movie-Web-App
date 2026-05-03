"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { tmdb } from "@/lib/tmdb";
import { Movie } from "@/types";
import MovieCard from "@/app/components/MovieCard";
import { Pagination } from "@/app/components/Pagination";

const getImageUrl = (path: string | null, size: string = "w500") => {
  return path
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : "/placeholder.jpg";
};

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("q") || "";
  const selectedGenres =
    searchParams.get("genre")?.split(",").filter(Boolean) || [];

  const [results, setResults] = useState<Movie[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);

  const fetchData = async (newPage: number) => {
    try {
      setIsLoading(true);
      let res;

      if (selectedGenres.length > 0) {
        res = await tmdb.get(`/discover/movie`, {
          params: {
            with_genres: selectedGenres.join(","),
            page: newPage,
            sort_by: "popularity.desc",
          },
        });
      } else {
        res = await tmdb.get(`/search/movie`, {
          params: {
            query: query || "a",
            page: newPage,
          },
        });
      }

      setResults(res.data.results);
      setTotalResults(res.data.total_results);
      setPage(newPage);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error("Дата татахад алдаа гарлаа:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const res = await tmdb.get("/genre/movie/list");
      setGenres(res.data.genres);
    } catch (err) {
      console.error("Жанр татахад алдаа гарлаа:", err);
    }
  };

  useEffect(() => {
    fetchData(1);
    fetchGenres();
  }, [query, searchParams.get("genre")]);

  const handleGenreToggle = (id: number) => {
    const idStr = id.toString();
    let newGenres: string[];

    if (selectedGenres.includes(idStr)) {
      newGenres = selectedGenres.filter((g) => g !== idStr);
    } else {
      newGenres = [...selectedGenres, idStr];
    }

    const params = new URLSearchParams(searchParams.toString());

    if (newGenres.length > 0) {
      params.set("genre", newGenres.join(","));
    } else {
      params.delete("genre");
    }

    params.set("page", "1");

    router.push(`/search?${params.toString()}`);
  };

  return (
    <main className="max-w-[1200px] mx-auto pt-10 px-6 min-h-screen text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-2">Search results</h1>

      <div className="grid grid-cols-12 gap-10 pt-3">
        <div className="col-span-12 lg:col-span-9">
          {isLoading ? (
            <div className="py-20 text-center">Уншиж байна...</div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold">
                  {totalResults} results for "{query || search}"
                </h2>
              </div>

              {results.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {results.map((movie) => (
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        getImageUrl={getImageUrl}
                      />
                    ))}
                  </div>
                  <div className="mt-12 mb-10">
                    <Pagination
                      currentPage={page}
                      onPageChange={(p) => fetchData(p)}
                    />
                  </div>
                </>
              ) : (
                <div className="w-full border border-gray-200 dark:border-gray-800 rounded-lg py-20 flex items-center justify-center">
                  <p className="text-sm font-medium">
                    No results found for "{query || search}"
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="hidden lg:block lg:col-span-3">
          <div>
            <h3 className="text-2xl font-bold mb-1">Search by genre</h3>
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
                      <span className="ml-1 text-[10px]">✕</span>
                    ) : (
                      <span className="ml-1 opacity-40">›</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
