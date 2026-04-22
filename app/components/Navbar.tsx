"use client";

import { useState } from "react";

export const Navbar = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full h-16 flex justify-between items-center bg-white px-20">
      <div className="flex items-center gap-2  ">
        <img className="w-4 h-4" src="film.svg" />
        <p className=" flex items-center size-4 font-bold italic text-[#4338ca]">
          MovieZ
        </p>
      </div>
      <div className="flex justify-center items-center gap-4">
        <button className=" flex justify-center items-center h-9 gap-2 border rounded-[10px] border-gray-300 py-2 px-4 cursor-pointer">
          <img className="w-[8px] h-[4px]" src="Vector.svg" />
          <p>Genre</p>
        </button>
        <div className="flex justify-start items-center w-[379px] h-9 gap-2 border rounded-[10px] border-gray-300 py-2 px-4">
          <img src="magnifying-glass.svg" />
          <input
            className="h-9 w-full outline-none "
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
          />
        </div>
      </div>
      <div className="flex justify-center items-center w-9 h-9 border rounded-[10px] border-gray-300 cursor-pointer">
        <img src="moon.svg" />
      </div>
    </div>
  );
};
