"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useAutocomplete } from "@/app/hooks/useAutocomplete";

export const Header = () => {
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const movies = useAutocomplete(search);

  return (
    <div className="relative flex-1 max-w-[400px]" ref={searchRef}>
      <div className="flex items-center h-9 gap-2 border rounded-lg border-gray-300 px-4 bg-gray-50 focus-within: focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
        <img
          className="w-4 h-4 opacity-50"
          src="magnifying-glass.svg"
          alt="search"
        />
        <input
          className="h-full w-full outline-none text-sm bg-transparent"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
        />
      </div>

      {movies.length > 0 && search && (
        <div className="absolute top-full left-0 right-0 mt-2  border border-gray-200 shadow-2xl rounded-lg overflow-hidden z-[60]">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors border-b last:border-0 border-gray-100"
              onClick={() => setSearch("")}
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  className="w-[67px] h-25 object-cover rounded"
                />
              ) : (
                <div className="w-[67px] h-25 bg-gray-200 rounded flex items-center justify-center text-[10px]">
                  No Pic
                </div>
              )}
              <div>
                <p className="text-l font-semibold text-gray-900 line-clamp-1">
                  {movie.title}
                </p>
                <div className="flex items-center gap-1 ">
                  <span className="text-yellow-500 text-xs">★</span>
                  <span className="text-xs font-medium">
                    {movie.vote_average.toFixed(1)}/10
                  </span>
                </div>
                <p className="text-xs mt-8">
                  {movie.release_date?.split("-")[0] || "N/A"}
                </p>
              </div>
            </Link>
          ))}
          <Link
            href={`/search?q=${search}`}
            className="block text-center py-2 text-sm hover:bg-indigo-50"
          >
            See all results
          </Link>
        </div>
      )}
    </div>
  );
};
