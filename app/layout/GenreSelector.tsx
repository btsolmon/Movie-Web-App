"use client";


import { tmdb } from "@/lib/tmdb";
import { Genre } from "@/types";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const GenreSelector = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    tmdb.get("/genre/movie/list").then((res) => {
      setGenres(res.data.genres);
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGenreClick = (id: number) => {
    setIsVisible(false);
    router.push(`/genres?genre=${id}`);
  };

  const activeGenres = searchParams.get("genre")?.split(",") || [];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="flex gap-2 items-center text-sm text-[#181818] px-4 h-9 border border-[#E4E4E7] dark:border-gray-600 rounded-[10px] shadow-xs cursor-pointer hover:opacity-80 dark:text-white"
      >
        <svg
          className={`transition-transform duration-200 ${isVisible ? "rotate-180" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Genre
      </button>

      <div
        data-shown={isVisible}
        className={`text-black dark:text-white bg-white dark:bg-black absolute left-0 z-50 duration-300 p-5 border border-[#E4E4E7] dark:border-gray-600 rounded-lg mt-1 data-[shown=true]:visible data-[shown=true]:opacity-100 invisible opacity-0 shadow-xl w-[577px]`}
      >
        <div className="mt-1 font-semibold text-2xl">Genres</div>
        <div className="text-sm opacity-70">See lists of movies by genre</div>
        <hr className="border-[#E4E4E7] dark:border-gray-600 my-4" />

        <div className="flex flex-wrap gap-4 max-w-[540px] min-w-[300px]">
          {genres.map((genre) => {
            const isActive = activeGenres.includes(genre.id.toString());
            return (
              <button
                key={genre.id}
                onClick={() => handleGenreClick(genre.id)}
                className={`border cursor-pointer hover:opacity-80 duration-300 text-xs font-semibold py-1 px-3 rounded-full flex items-center gap-2 transition-all ${
                  isActive
                    ? "bg-black text-white dark:bg-white dark:text-black border-transparent"
                    : "border-[#E4E4E7] dark:border-gray-600"
                }`}
              >
                {genre.name}
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
