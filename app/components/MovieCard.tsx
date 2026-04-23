interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
  };
  getImageUrl: (path: string, size: string) => string;
}

const MovieCard = ({ movie, getImageUrl }: MovieCardProps) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-2xl aspect-[2/3]">
        <img
          src={getImageUrl(movie.poster_path, "w500")}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="mt-4 px-1">
        <div className="flex items-center gap-2 mb-1">
          <img src="/star.svg" alt="star" className="w-4 h-4" />
          <span className="text-sm font-medium">
            {movie.vote_average.toFixed(1)}/10
          </span>
        </div>
        <h3 className="font-bold text-lg line-clamp-1">{movie.title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
