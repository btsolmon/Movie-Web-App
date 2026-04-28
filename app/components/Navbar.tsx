"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

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
  const menuRef = useRef(null);

  useEffect(() => {
    // 3. Гадна талд дарагдсан эсэхийг шалгах функц
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsVisible(false); // Гадна талд дарвал хаах
      }
    };
    // Цэс нээлттэй үед л event listener-ийг идэвхжүүлнэ
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    // Component unmount болох эсвэл цэс хаагдах үед цэвэрлэх
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <header className="py-[11.5px] border-b border-gray-100 relative bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center gap-4 ">
          <Link href={"/"} className="flex items-center gap-2 cursor-pounter">
            <img className="w-4 h-4" src="film.svg" />
            <p className=" flex items-center size-4 font-bold italic text-[#4338ca]">
              MovieZ
            </p>
          </Link>

          <div className="flex items-center gap-3 flex-1 justify-center max-w-[800px]">
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsVisible(!isVisible)}
                className="flex items-center h-9 gap-2 border rounded-lg border-gray-300 py-2.5 px-4 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <img className="w-2 h-2" src="Vector.svg" alt="arrow" />
                <span className="text-sm font-medium">Genre</span>
              </button>

              <div
                className={`absolute left-0 z-50 w-[580px] p-6 bg-white border border-gray-200 shadow-xl rounded-xl mt-2 transition-all duration-300 ${
                  isVisible
                    ? "visible opacity-100 translate-y-0"
                    : "invisible opacity-0 -translate-y-2"
                }`}
              >
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
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M6 12L10 8L6 4"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center flex-1 max-w-[400px] h-9 gap-2 border rounded-lg border-gray-300 px-4 bg-gray-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <img
                className="w-4 h-4 opacity-50"
                src="magnifying-glass.svg"
                alt="search"
              />
              <input
                className="h-full w-full outline-none text-sm bg-transparent"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
              />
            </div>
          </div>

          <button className="flex items-center justify-center w-9 h-9 border rounded-lg border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
            <img className="w-3 h-3" src="moon.svg" alt="theme" />
          </button>
        </div>
      </div>
    </header>
  );
};
