/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
  };
  getImageUrl: (path: string | null, size: string) => string;
}

const MovieCard = ({ movie, getImageUrl }: MovieCardProps) => {
  return (
    <Link href={`/movie/${movie.id}`} className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-xl aspect-[2/3] ">
        <img
          src={getImageUrl(movie.poster_path, "w500")}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>

      <div className="mt-4 px-1">
        <div className="flex items-center gap-2 mb-1">
          <img src="/star.svg" alt="star" className="w-4 h-4" />
          <span className="text-sm font-medium">
            {movie.vote_average.toFixed(1)}
            <span className="text-sm text-gray-500 font-normal">/10</span>
          </span>
        </div>
        <h3 className="font-semibold text-lg line-clamp-1">{movie.title}</h3>
      </div>
    </Link>
  );
};

export default MovieCard;
