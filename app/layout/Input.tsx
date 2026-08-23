/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useAutocomplete } from "@/app/hooks/useAutocomplete";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export const Input = () => {
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const movies = useAutocomplete(debouncedSearch);

  const pathname = usePathname();

  useEffect(() => {
    setSearch("");
    setIsVisible(false);
  }, [pathname]);

  useEffect(() => {
    if (search !== debouncedSearch) {
      setIsLoading(true);
    }

    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && search.trim()) {
      setIsVisible(false);
      router.push(`/search?q=${encodeURIComponent(search)}`);
      setSearch("");
      setIsVisible(false);
    }
  };

  return (
    <div className="relative flex-1 min-w-0" ref={searchRef}>
      <div className="flex items-center w-full md:w-[379px] h-9 gap-2 border rounded-lg border-gray-300 dark:border-gray-600 px-3 bg-gray-50 dark:bg-black focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
        <img
          className="w-4 h-4 opacity-50 dark:invert"
          src="/magnifying-glass.svg"
          alt="search"
        />
        <input
          className="h-full w-full outline-none text-sm bg-transparent dark:text-white"
          placeholder="Search.."
          value={search}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsVisible(true);
          }}
          onFocus={() => setIsVisible(true)}
          type="text"
        />
      </div>

      {isVisible && debouncedSearch && !isLoading && (
        <div className="absolute top-full left-0 right-0 md:left-1/2 md:right-auto md:-translate-x-1/2 mt-2 border border-gray-200 dark:border-gray-600 shadow-2xl rounded-lg overflow-x-hidden overflow-y-auto z-[60] bg-white dark:bg-black w-full md:w-[95vw] max-w-[577px] max-h-[70vh]">
          {movies?.length > 0 ? (
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
                href={`/search?q=${encodeURIComponent(debouncedSearch)}`}
                className="block text-center py-3 text-sm font-semibold border-t border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-zinc-900 dark:text-white"
                onClick={() => {
                  setSearch("");
                  setIsVisible(false);
                }}
              >
                See all results for &quot;{debouncedSearch}&quot;
              </Link>
            </>
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <p className="text-sm font-medium">
                No results found for &quot;{debouncedSearch}&quot;
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
