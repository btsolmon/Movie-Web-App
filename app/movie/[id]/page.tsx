"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { tmdb } from "@/app/src/lib/tmdb";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import MovieCard from "@/app/components/MovieCard";

const getImageUrl = (path: string | null, size: string = "original") => {
  return path
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : "/placeholder.jpg";
};

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        // Киноны мэдээлэл, жүжигчид (credits) болон санал болгох кинонуудыг нэг дор татах
        const [movieRes, recommendRes] = await Promise.all([
          tmdb.get(`/movie/${id}?append_to_response=credits`),
          tmdb.get(`/movie/${id}/recommendations`),
        ]);

        setMovie(movieRes.data);
        // Эхний 5 оновчтой киног авах
        setRecommendations(recommendRes.data.results.slice(0, 5));
      } catch (err) {
        console.error("Дата татахад алдаа гарлаа:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovieData();
    // Хуудасны дээш скролл хийх (ID солигдох үед)
    window.scrollTo(0, 0);
  }, [id]);

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );

  if (!movie) return <div className="p-20 text-center">Кино олдсонгүй.</div>;

  // Director, Writers, Stars-ийг шүүж авах
  const director = movie.credits?.crew?.find(
    (c: any) => c.job === "Director",
  )?.name;
  const writers = movie.credits?.crew
    ?.filter((c: any) => c.job === "Writer" || c.job === "Screenplay")
    ?.map((w: any) => w.name)
    .slice(0, 3)
    .join(", ");
  const stars = movie.credits?.cast
    ?.slice(0, 3)
    .map((s: any) => s.name)
    .join(", ");

  return (
    <div className="bg-white min-h-screen text-black">
      <Navbar />

      <main className="max-w-[1200px] mx-auto pt-10 px-6">
        {/* Title and Rating Section */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-semibold mb-2 ">{movie.title}</h1>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <span>{movie.release_date?.split("-")[0]}</span>
              <span>•</span>
              <span>{movie.adult ? "R" : "PG"}</span>
              <span>•</span>
              <span>
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
              Rating
            </span>
            <div className="flex items-center gap-1">
              <img src="/star.svg" className="w-6 h-6" alt="star" />
              <div className="flex flex-col leading-none">
                <span className="text-xl font-bold">
                  {movie.vote_average?.toFixed(1)}
                  <span className="text-sm text-gray-500 font-normal">/10</span>
                </span>
                <span className="text-[10px] text-gray-500 font-medium">
                  {movie.vote_count >= 1000
                    ? (movie.vote_count / 1000).toFixed(0) + "k"
                    : movie.vote_count}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Media Grid: Poster (4 cols) and Backdrop (8 cols) */}
        <div className="grid grid-cols-12 gap-5 mb-10 h-[500px]">
          <div className="col-span-4 rounded-sm overflow-hidden shadow-2xl">
            <img
              src={getImageUrl(movie.poster_path, "w780")}
              className="w-full h-full object-cover"
              alt={movie.title}
            />
          </div>
          <div className="col-span-8 relative rounded-sm overflow-hidden group shadow-lg">
            <img
              src={getImageUrl(movie.backdrop_path, "original")}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="backdrop"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />

            {/* Play Trailer Button */}
            <button className="absolute bottom-8 left-8 flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-5 py-3 rounded-full border border-white/20 transition-all active:scale-95">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div className="border-l-[12px] border-l-black border-y-[8px] border-y-transparent ml-1" />
              </div>
              <span className="font-bold text-sm">Play trailer</span>
            </button>
          </div>
        </div>

        {/* Genres and Summary */}
        <div>
          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genres?.map((g: any) => (
              <span
                key={g.id}
                className="px-4 py-1 border border-gray-200 rounded-full text-xs font-bold hover:bg-gray-50 cursor-default transition-colors"
              >
                {g.name}
              </span>
            ))}
          </div>
          <p className="text-lg leading-relaxed text-gray-800 max-w-4xl">
            {movie.overview}
          </p>
        </div>

        {/* Credits Table-like Section */}
        <div className="space-y-5 border-b border-gray-200 py-6 mb-8 ">
          <div className="grid grid-cols-[100px_1fr] items-center">
            <span className="font-bold text-sm">Director</span>
            <span className="text-sm hover:underline cursor-pointer">
              {director || "N/A"}
            </span>
          </div>
          <hr className="border-gray-200" />
          <div className="grid grid-cols-[100px_1fr] items-center">
            <span className="font-bold text-sm">Writers</span>
            <span className="text-sm hover:underline cursor-pointer">
              {writers || "N/A"}
            </span>
          </div>
          <hr className="border-gray-200" />
          <div className="grid grid-cols-[100px_1fr] items-center">
            <span className="font-bold text-sm">Stars</span>
            <span className=" text-sm hover:underline cursor-pointer">
              {stars || "N/A"}
            </span>
          </div>
        </div>

        {/* Recommendations Section */}
        <section className="pb-24">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              More like this
            </h2>
            <button className="flex items-center gap-1 text-sm font-bold hover:bg-gray-100 px-3 py-1 rounded-lg transition-all">
              See more <span className="text-lg">→</span>
            </button>
          </div>

          <div className="grid grid-cols-5 gap-8">
            {recommendations.length > 0 ? (
              recommendations.map((m: any) => (
                <div
                  key={m.id}
                  className="bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
                >
                  <MovieCard movie={m} getImageUrl={getImageUrl} />
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No recommendations found.</p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
