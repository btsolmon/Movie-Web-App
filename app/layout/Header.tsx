/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import { GenreSelector } from "@/app/layout/GenreSelector";
import { Input } from "@/app/layout/Input";
import { useState, useEffect, useRef } from "react";
import { Container } from "@/app/components/Container";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return <div className="w-10 h-10"></div>;

    return (
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="w-10 h-10 flex items-center justify-center border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors bg-white dark:bg-black"
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
    <header className="py-[11.5px] relative z-50">
      <Container>
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
          <div className="flex gap-3">
            <GenreSelector />
            <Input />
          </div>
          <div>{renderThemeChanger()}</div>
        </div>
      </Container>
    </header>
  );
};
