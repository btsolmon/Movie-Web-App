"use client";

import { useState, useEffect, useRef } from "react";
import { Movie } from "@/types";
import { tmdb } from "@/lib/tmdb";
import MovieSection from "./components/MovieSection";
import { VidkingPlayer } from "./components/VidkingPlayer";
import { Container } from "./components/Container";

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
  const [playingMovieId, setPlayingMovieId] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const HeroSkeleton = () => (
    <div className="w-full h-[800px] flex items-center">
      <Container>
        <div className="relative z-10 flex flex-col gap-4">
          <div className="h-7 w-32 bg-gray-300 rounded animate-pulse" />
          <div className="h-[72px] w-full max-w-2xl bg-gray-300 rounded animate-pulse" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
            <div className="h-7 w-20 bg-gray-300 rounded animate-pulse" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-full max-w-lg bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-full max-w-lg bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-full max-w-[300px] bg-gray-300 rounded animate-pulse" />
          </div>
          <div className="w-[145px] h-[44px] bg-gray-300 rounded-md mt-2 animate-pulse" />
        </div>
      </Container>
    </div>
  );

  useEffect(() => {
    if (trendingMovies.length === 0) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, trendingMovies]);

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

  return (
    <div className="w-full mx-auto min-h-screen">
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
                <Container>
                  <div className="relative z-10 flex flex-col gap-4">
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
                </Container>
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
        seeMoreHref="/upcoming"
      />

      <MovieSection
        title="Popular"
        movies={popularMovies}
        isLoading={isLoading}
        getImageUrl={getImageUrl}
        seeMoreHref="/popular"
      />

      <MovieSection
        title="Top Rated"
        movies={topRatedMovies}
        isLoading={isLoading}
        getImageUrl={getImageUrl}
        seeMoreHref="/top-rated"
      />

      {playingMovieId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm">
          <button
            onClick={() => setPlayingMovieId(null)}
            className="absolute top-8 right-10 text-white text-5xl hover:text-red-500 transition-colors z-[110]"
          >
            ×
          </button>

          <div className="w-full max-w-6xl px-20">
            <VidkingPlayer tmdbId={playingMovieId} type="movie" />
          </div>
        </div>
      )}
    </div>
  );
}
