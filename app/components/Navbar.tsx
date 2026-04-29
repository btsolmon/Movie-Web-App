"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useAutocomplete } from "@/app/hooks/useAutocomplete"; // Hook-оо ийшээ импортлоорой
import { useTheme } from "next-themes";

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film-Noir",
  "Game-Show",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "News",
  "Reality-TV",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Talk-Show",
  "Thriller",
  "War",
  "Western",
];

export const Navbar = () => {
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  // Чиний бэлдсэн Hook-ийг энд дуудаж байна
  const movies = useAutocomplete(search);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Genre цэсийг хаах
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
      // Хайлтын илэрцийг хаах (хоосон болгох замаар)
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        // Хэрэв хүсвэл search-ийг цэвэрлэж болно, эсвэл тусад нь 'showResults' state ашиглаж болно
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="py-[11.5px] relative  dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center gap-4">
          {/* Logo */}
          <Link href={"/"} className="flex items-center gap-2 cursor-pointer">
            <img className="w-4 h-4" src="film.svg" alt="logo" />
            <p className="flex items-center font-bold italic text-[#4338ca] text-lg">
              MovieZ
            </p>
          </Link>

          <div className="flex items-center gap-3 flex-1 justify-center max-w-[800px]">
            {/* Genre Dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsVisible(!isVisible)}
                className="flex items-center h-9 gap-2 border rounded-lg border-gray-300 py-2.5 px-4 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <img className="w-2 h-2" src="Vector.svg" alt="arrow" />
                <span className="text-sm font-medium">Genre</span>
              </button>

              {isVisible && (
                <div className="absolute left-0 z-50 w-[580px] p-6  border border-gray-200 shadow-xl rounded-xl mt-2">
                  <h2 className="font-bold text-2xl text-gray-900">Genres</h2>
                  <p className="text-gray-500 mb-4">
                    See lists of movies by genre
                  </p>
                  <hr className="border-gray-100 mb-4" />
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre, i) => (
                      <button
                        key={i}
                        className="border cursor-pointer hover:bg-gray-50 transition-all text-xs font-semibold py-1.5 px-3 border-gray-200 rounded-full flex items-center gap-2"
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Search Input and Autocomplete Results */}
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

              {/* Autocomplete Results Dropdown */}
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
          </div>

          <button
            onClick={() => {
              setTheme(theme === "light" ? "dark" : "light");
            }}
            className="flex items-center justify-center w-9 h-9 border rounded-lg border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors dark:text-white dark:bg-black"
          >
            {theme === "light" ? (
              <img className="w-3 h-3" src="moon.svg" alt="dark mode" />
            ) : (
              <img className="w-4 h-4" src="sun.svg" alt="light mode" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
