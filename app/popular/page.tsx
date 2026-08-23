"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { tmdb } from "@/lib/tmdb";
import { Movie } from "@/types";
import MovieCard from "@/app/components/MovieCard";
import { Pagination } from "@/app/components/Pagination";
import { Container } from "@/app/components/Container";

const getImageUrl = (path: string | null, size: string = "original") => {
  return path
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : "/placeholder.jpg";
};

export default function PopularPage() {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const res = await tmdb.get("/movie/popular", {
        params: {
          language: "en-US",
          page: page,
        },
      });
      setMovies(res.data.results || []);
      setTotalPages(res.data.total_pages > 500 ? 500 : res.data.total_pages);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-8 md:py-16 min-h-screen text-black dark:text-white">
      <Container>
        <div className="flex justify-between items-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-3xl">Popular</h2>
          <button
            onClick={() => router.back()}
            className="font-semibold hover:underline cursor-pointer"
          >
            ← Back
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-20 animate-pulse text-xl">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
            {movies.slice(0, 10).map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                getImageUrl={getImageUrl}
              />
            ))}
          </div>
        )}

        <div className="mt-12">
          <Pagination
            currentPage={page}
            onPageChange={(p) => setPage(p)}
            totalPages={totalPages}
          />
        </div>
      </Container>
    </div>
  );
}
