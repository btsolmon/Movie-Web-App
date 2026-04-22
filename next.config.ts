import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  NEXT_PUBLIC_TMDB_API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY,
};

export default nextConfig;
