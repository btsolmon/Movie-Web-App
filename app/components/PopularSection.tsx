import MovieCard from "./MovieCard";

interface Props {
  popularMovies: any[];
  isLoading: boolean;
  getImageUrl: (path: string, size: string) => string;
}
const MovieGridSkeleton = () => (
  <div className="grid grid-cols-5 gap-8">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="aspect-[2/3] bg-gray-200 rounded-2xl mb-4" />
        <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />
        <div className="h-6 w-full bg-gray-200 rounded" />
      </div>
    ))}
  </div>
);
const PopularSection = ({ popularMovies, isLoading, getImageUrl }: Props) => {
  return (
    <section className="px-20 py-16">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold uppercase italic">Popular</h2>
        <button className="flex items-center gap-2 text-sm font-semibold hover:underline">
          See more <span>→</span>
        </button>
      </div>

      {isLoading ? (
        <MovieGridSkeleton />
      ) : (
        <div className="grid grid-cols-5 gap-8">
          {popularMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} getImageUrl={getImageUrl} />
          ))}
        </div>
      )}
    </section>
  );
};

export default PopularSection;
