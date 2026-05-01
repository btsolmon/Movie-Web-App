"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useAutocomplete } from "@/app/hooks/useAutocomplete";

export const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const movies = useAutocomplete(debouncedSearch);

  useEffect(() => {
    if (search !== debouncedSearch) {
      setIsLoading(true);
    }

    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 100);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setIsLoading(false);
  }, [movies]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex-1 max-w-[400px]" ref={searchRef}>
      <div className="flex items-center h-9 gap-2 border rounded-lg border-gray-300 dark:border-gray-600 px-3 bg-gray-50 dark:bg-black focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
        <img
          className="w-4 h-4 opacity-50 dark:invert"
          src="magnifying-glass.svg"
          alt="search"
        />
        <input
          className="h-full w-full outline-none text-sm bg-transparent dark:text-white"
          placeholder="Search.."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsVisible(true);
          }}
          onFocus={() => setIsVisible(true)}
          type="text"
        />
      </div>

      {isVisible && debouncedSearch && !isLoading && (
        <div className="absolute top-full left-0 right-0 mt-2 border border-gray-200 dark:border-gray-600 shadow-2xl rounded-lg overflow-hidden z-[60] bg-white dark:bg-black min-w-[577px]">
          {movies.length > 0 ? (
            <>
              {movies.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors border-b last:border-0 border-gray-100 dark:border-gray-600 "
                  onClick={() => {
                    setSearch("");
                    setIsVisible(false);
                  }}
                >
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      className="w-[67px] h-25 object-cover rounded"
                    />
                  ) : (
                    <div className="w-[67px] h-25 bg-gray-200 dark:bg-zinc-800 rounded flex items-center justify-center text-[10px]">
                      No Pic
                    </div>
                  )}
                  <div className="dark:text-white">
                    <p className="text-l font-semibold line-clamp-1">
                      {movie.title}
                    </p>
                    <div className="flex items-center gap-1 ">
                      <span className="text-yellow-500 text-xs">★</span>
                      <span className="text-xs font-medium">
                        {movie.vote_average.toFixed(1)}/10
                      </span>
                    </div>
                    <p className="text-xs mt-8 opacity-60">
                      {movie.release_date?.split("-")[0] || "N/A"}
                    </p>
                  </div>
                </Link>
              ))}
              <Link
                href={`/search?q=${debouncedSearch}`}
                className="block text-center py-2 text-sm hover:bg-indigo-50 dark:hover:bg-zinc-900 dark:text-white"
                onClick={() => setIsVisible(false)}
              >
                See all results for "{search}"
              </Link>
            </>
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <p className="text-sm font-medium">
                No results found for "{debouncedSearch}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
