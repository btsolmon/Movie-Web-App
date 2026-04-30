import MovieCard from "./MovieCard";
import Link from "next/link";

interface MovieSectionProps {
  title: string;
  movies: any[];
  isLoading: boolean;
  getImageUrl: (path: string, size: string) => string;
  categoryPath: string;
  onSeeMore?: () => void;
}

const MovieGridSkeleton = () => (
  <div className="grid grid-cols-5 gap-8">
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
}: MovieSectionProps) => {
  return (
    <section className="px-20 py-16 ">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-semibold uppercase">{title}</h2>
        <button
          onClick={onSeeMore}
          href={`/movie/category/${categoryPath}`}
          className="flex items-center gap-2 text-sm font-semibold hover:underline cursor-pointer"
        >
          See more <span>→</span>
        </button>
      </div>

      {isLoading ? (
        <MovieGridSkeleton />
      ) : (
        <div className="grid grid-cols-5 gap-8 ">
          {movies.slice(0, 10).map((movie) => (
            <MovieCard key={movie.id} movie={movie} getImageUrl={getImageUrl} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MovieSection;
