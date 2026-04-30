"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import { GenreSelector } from "@/app/layout/GenreSelector";
import { SearchInput } from "@/app/layout/SearchInput";
import { useState, useEffect, useRef } from "react";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="py-[11.5px]">
      <div className="container">
        <div className="flex justify-between items-center">
          <Link href={"/"} className="flex items-center gap-2 cursor-pointer">
            <img className="w-4 h-4" src="film.svg" alt="logo" />
            <p className="flex items-center font-bold italic text-[#4338ca] text-lg">
              MovieZ
            </p>
          </Link>
          <div className="flex gap-3">
            <GenreSelector />
            {/* <SearchInput /> */}
          </div>
          <div>
            <button
              onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
              }}
              className="p-2.5 border border-[#E4E4E7] rounded-[10px] shadow-xs cursor-pointer hover:opacity-80 bg-white dark:bg-black"
            >
              {theme === "light" ? (
                <img className="w-3 h-3" src="moon.svg" alt="dark mode" />
              ) : (
                <img className="w-4 h-4" src="sun.svg" alt="light mode" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
