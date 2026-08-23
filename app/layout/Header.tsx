/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import { GenreSelector } from "@/app/layout/GenreSelector";
import { Input } from "@/app/layout/Input";
import { useState, useEffect } from "react";
import { Container } from "@/app/components/Container";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return <div className="w-9 h-9 md:w-10 md:h-10 shrink-0"></div>;

    return (
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="w-9 h-9 md:w-10 md:h-10 shrink-0 flex items-center justify-center border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors bg-white dark:bg-black"
      >
        {theme === "light" ? (
          <img className="w-4 h-4" src="/moon.svg" alt="dark mode" />
        ) : (
          <img className="w-4 h-4" src="/sun.svg" alt="light mode" />
        )}
      </button>
    );
  };

  return (
    <header className="py-3 md:py-[11.5px] relative z-50">
      <Container>
        <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <div className="flex justify-between items-center">
            <Link
              href={"/"}
              onClick={() => {
                if (window.location.pathname === "/") {
                  window.location.href = "/";
                }
              }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img className="w-4 h-4" src="/film.svg" alt="logo" />
              <p className="flex items-center font-bold italic text-[#4338ca] text-lg">
                MovieZ
              </p>
            </Link>
            <div className="md:hidden">{renderThemeChanger()}</div>
          </div>
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <GenreSelector />
            <Input />
          </div>
          <div className="hidden md:block">{renderThemeChanger()}</div>
        </div>
      </Container>
    </header>
  );
};
