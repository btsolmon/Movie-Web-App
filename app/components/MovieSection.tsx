/* eslint-disable @typescript-eslint/no-explicit-any */
import MovieCard from "./MovieCard";
import Link from "next/link";
import { Container } from "./Container";

interface MovieSectionProps {
  title: string;
  movies: any[];
  isLoading: boolean;
  getImageUrl: (path: string | null, size: string) => string;
  categoryPath?: string;
  onSeeMore?: () => void;
  seeMoreHref?: string;
}

const MovieGridSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
    {[...Array(10)].map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="aspect-[2/3] bg-gray-200 rounded-2xl mb-4" />
        <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />
        <div className="h-6 w-full bg-gray-200 rounded" />
      </div>
    ))}
  </div>
);

const MovieSection = ({
  title,
  movies,
  isLoading,
  getImageUrl,
  categoryPath,
  onSeeMore,
  seeMoreHref,
}: MovieSectionProps) => {
  return (
    <section className="py-8 md:py-16 text-black dark:text-white">
      <Container>
        <div className="flex justify-between items-center mb-6 md:mb-10">
          <h2 className="text-lg md:text-2xl font-semibold uppercase">{title}</h2>
          {seeMoreHref ? (
            <Link
              href={seeMoreHref}
              className="flex items-center gap-2 text-sm font-semibold hover:underline cursor-pointer"
            >
              See more <span>→</span>
            </Link>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                if (onSeeMore) onSeeMore();
              }}
              className="flex items-center gap-2 text-sm font-semibold hover:underline cursor-pointer"
            >
              See more <span>→</span>
            </button>
          )}
        </div>

        {isLoading ? (
          <MovieGridSkeleton />
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
      </Container>
    </section>
  );
};

export default MovieSection;
