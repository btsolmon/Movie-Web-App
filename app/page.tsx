"use client";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { useState, useEffect, useRef } from "react";
import { MovieSummary } from "./types";
import { tmdb } from "./src/lib/tmdb";

const getImageUrl = (path: string | null, size: string = "original") => {
  return path
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : "/placeholder.jpg";
};

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState<MovieSummary[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<MovieSummary[]>([]);
  const [popularMovies, setPopularMovies] = useState<MovieSummary[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<MovieSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeIndex, setActiveIndex] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Hero хэсгийн ачаалалт
  const HeroSkeleton = () => (
    <div className="w-full h-[800px] bg-gray-200 animate-pulse flex items-center pl-35">
      <div className="flex flex-col gap-4">
        <div className="h-6 w-32 bg-gray-300 rounded" />
        <div className="h-20 w-[500px] bg-gray-300 rounded" />
        <div className="h-6 w-24 bg-gray-300 rounded" />
        <div className="h-24 w-[450px] bg-gray-300 rounded" />
        <div className="h-10 w-36 bg-gray-300 rounded mt-4" />
      </div>
    </div>
  );

  // Киноны картын ачаалалт
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [trendingRes, upcomingRes, popularRes, topRatedRes] =
          await Promise.all([
            tmdb.get("/trending/movie/week"),
            tmdb.get("/movie/upcoming?language=en-US&page=1"),
            tmdb.get("/movie/popular?language=en-US&page=1"),
            tmdb.get("/movie/top_rated?language=en-US&page=1"),
          ]);

        setTrendingMovies(trendingRes.data.results.slice(0, 3));
        setUpcomingMovies(upcomingRes.data.results.slice(0, 10));
        setPopularMovies(popularRes.data.results.slice(0, 10));
        setTopRatedMovies(topRatedRes.data.results.slice(0, 10));
      } catch (err) {
        console.error("Алдаа гарлаа:", err);
      } finally {
        setIsLoading(false); // Өгөгдөл ирсний дараа унтраана
      }
    };
    fetchData();
  }, []);

  // Скролл хийх үед индексийг шинэчлэх функц
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    }
  };

  // Цэг дээр дарах эсвэл дараагийнх руу шилжих үед ашиглах функц
  const scrollToMovie = (index: number) => {
    if (scrollContainerRef.current) {
      const clientWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({
        left: index * clientWidth,
        behavior: "smooth",
      });

      // Индексийг шууд шинэчилнэ
      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % trendingMovies.length;
    scrollToMovie(nextIndex);
  };

  return (
    <div className="w-full flex flex-col min-h-screen mx-auto bg-white">
      <Navbar />

      {/* TRENDING HERO SECTION */}
      {isLoading ? (
        <HeroSkeleton />
      ) : (
        <div className="relative group bg-black text-white">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="w-full h-[800px] flex overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
          >
            {trendingMovies.map((movie) => (
              <div
                key={movie.id}
                className="min-w-full h-full relative snap-center flex flex-col justify-center bg-cover bg-center"
                style={{
                  backgroundImage: `url(${getImageUrl(movie.backdrop_path)})`,
                }}
              >
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 w-[600px] flex flex-col gap-4 pl-35">
                  <p className="text-lg font-medium">Now Playing:</p>
                  <h1 className="text-6xl font-extrabold uppercase">
                    {movie.title}
                  </h1>
                  <div className="flex items-center gap-2 text-xl font-bold">
                    <img src="/star.svg" alt="star" className="w-6 h-6" />
                    <span>{movie.vote_average.toFixed(1)}/10</span>
                  </div>
                  <p className="text-base text-gray-200 max-w-lg line-clamp-3">
                    {movie.overview}
                  </p>
                  <button className="w-[145px] h-[40px] bg-gray-200 text-black rounded-md hover:scale-110 transition-transform">
                    Watch Movie
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* INDICATORS */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
            {trendingMovies.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToMovie(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-8 bg-white"
                    : "w-3 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="absolute right-10 top-1/2 -translate-y-1/2 z-20 hover:scale-110 transition-transform active:scale-95"
          >
            <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm border border-white/10">
              <img src="/chevron-right.svg" alt="next" className="w-10 h-10" />
            </div>
          </button>
        </div>
      )}

      {/* UPCOMING SECTION */}
      <div className="px-20 py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold uppercase italic">Upcoming</h2>
          <button className="flex items-center gap-2 text-sm font-semibold hover:underline">
            See more <span>→</span>
          </button>
        </div>
        {isLoading ? (
          <MovieGridSkeleton />
        ) : (
          <div className="grid grid-cols-5 gap-8">
            {upcomingMovies.map((movie) => (
              <div key={movie.id} className="group cursor-pointer">
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
                  <h3 className="font-bold text-lg line-clamp-1">
                    {movie.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* POPULAR SECTION */}
      <div className="px-20 ">
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
              <div key={movie.id} className="group cursor-pointer">
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
                  <h3 className="font-bold text-lg line-clamp-1">
                    {movie.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TOP RATED SECTION */}
      <div className="px-20 py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold uppercase italic">Top Rated</h2>
          <button className="flex items-center gap-2 text-sm font-semibold hover:underline">
            See more <span>→</span>
          </button>
        </div>
        {isLoading ? (
          <MovieGridSkeleton />
        ) : (
          <div className="grid grid-cols-5 gap-8">
            {topRatedMovies.map((movie) => (
              <div key={movie.id} className="group cursor-pointer">
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
                  <h3 className="font-bold text-lg line-clamp-1">
                    {movie.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
