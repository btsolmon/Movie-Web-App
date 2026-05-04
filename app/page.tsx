"use client";

import { useState, useEffect, useRef } from "react";
import { Movie } from "@/types";
import { tmdb } from "@/lib/tmdb";
import MovieSection from "./components/MovieSection";
import MovieCard from "./components/MovieCard";
import { Pagination } from "./components/Pagination";
import { VidkingPlayer } from "./components/VidkingPlayer";
import { useTheme } from "next-themes";

const getImageUrl = (path: string | null, size: string = "original") => {
  return path
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : "/placeholder.jpg";
};

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewCategory, setViewCategory] = useState<string | null>(null);
  const [categoryMovies, setCategoryMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [playingMovieId, setPlayingMovieId] = useState<number | null>(null);
  const { theme, setTheme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    if (trendingMovies.length === 0 || viewCategory) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, trendingMovies, viewCategory]);

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

        setTrendingMovies(trendingRes.data.results.slice(0, 10));
        setUpcomingMovies(upcomingRes.data.results.slice(0, 10));
        setPopularMovies(popularRes.data.results.slice(0, 10));
        setTopRatedMovies(topRatedRes.data.results.slice(0, 10));
      } catch (err) {
        console.error("An error has occured", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (playingMovieId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [playingMovieId]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    }
  };

  const scrollToMovie = (index: number) => {
    if (scrollContainerRef.current) {
      const clientWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({
        left: index * clientWidth,
        behavior: "smooth",
      });

      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const isLastSlide = activeIndex === trendingMovies.length - 1;

    if (isLastSlide) {
      container.style.scrollBehavior = "auto";
      container.scrollLeft = 0;
      setActiveIndex(0);
      setTimeout(() => {
        container.style.scrollBehavior = "smooth";
      }, 50);
    } else {
      const nextIndex = activeIndex + 1;
      scrollToMovie(nextIndex);
    }
  };

  const fetchCategory = async (type: string, pageNum: number) => {
    setIsLoading(true);
    try {
      const res = await tmdb.get(`/movie/${type}?page=${pageNum}`);
      setCategoryMovies(res.data.results.slice(0, 10));
      setViewCategory(type);
      setPage(pageNum);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (viewCategory) {
    return (
      <div className=" w-[1440px] mx-auto  min-h-screen">
        <main className=" p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold capitalize">{viewCategory}</h2>
            <button
              onClick={() => setViewCategory(null)}
              className=" gap-2 text-sm font-semibold hover:underline cursor-pointer"
            >
              ← Back
            </button>
          </div>

          <div className="grid grid-cols-5 gap-8">
            {categoryMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                getImageUrl={getImageUrl}
              />
            ))}
          </div>
          <Pagination
            currentPage={page}
            onPageChange={(newPage) => fetchCategory(viewCategory, newPage)}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="w-[1440px] flex flex-col min-h-screen mx-auto ">
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
                  <button
                    onClick={() => setPlayingMovieId(movie.id)}
                    className="w-[145px] flex items-center gap-3 bg-gray-200 text-black px-3 py-2 rounded-md hover:scale-110 transition-transform"
                  >
                    <div className="border-l-[12px] border-l-black border-y-[8px] border-y-transparent ml-1" />
                    <span>Watch Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex gap-3 items-center">
            {trendingMovies.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToMovie(index)}
                className={`h-3 rounded-full transition-all duration-300 shadow-lg ${
                  activeIndex === index
                    ? "w-8 bg-white"
                    : "w-3 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="absolute right-10 top-1/2 -translate-y-1/2 z-20 hover:scale-110 transition-transform active:scale-95"
          >
            <div className="/20 p-4 rounded-full backdrop-blur-sm border border-white/10">
              <img src="/chevron-right.svg" alt="next" className="w-10 h-10" />
            </div>
          </button>
        </div>
      )}

      <MovieSection
        title="Upcoming"
        movies={upcomingMovies}
        isLoading={isLoading}
        getImageUrl={getImageUrl}
        categoryPath="upcoming"
        onSeeMore={() => fetchCategory("upcoming", 1)}
      />

      <MovieSection
        title="Popular"
        movies={popularMovies}
        isLoading={isLoading}
        getImageUrl={getImageUrl}
        categoryPath="popular"
        onSeeMore={() => fetchCategory("popular", 1)}
      />

      <MovieSection
        title="Top Rated"
        movies={topRatedMovies}
        isLoading={isLoading}
        getImageUrl={getImageUrl}
        categoryPath="top-rated"
        onSeeMore={() => fetchCategory("top_rated", 1)}
      />

      {playingMovieId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm">
          <button
            onClick={() => setPlayingMovieId(null)}
            className="absolute top-8 right-10 text-white text-5xl hover:text-red-500 transition-colors z-[110]"
          >
            ×
          </button>

          <div className="w-full max-w-6xl p-4">
            <VidkingPlayer tmdbId={playingMovieId} type="movie" />
          </div>
        </div>
      )}
    </div>
  );
}
