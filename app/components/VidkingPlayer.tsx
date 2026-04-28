"use client";
import { usePlayerProgress } from "@/app/hooks/usePlayerProgress";

type Props = {
  tmdbId: number;
  type?: "movie" | "tv";
  season?: number;
  episode?: number;
};

export function VidkingPlayer({
  tmdbId,
  type = "movie",
  season,
  episode,
}: Props) {
  const resumeAt = usePlayerProgress(tmdbId, type);
  const base =
    type === "movie"
      ? `https://www.vidking.net/embed/movie/${tmdbId}`
      : `https://www.vidking.net/embed/tv/${tmdbId}/${season}/${episode}`;
  const qs = new URLSearchParams({
    color: "e50914",
    autoPlay: "true",
    ...(resumeAt ? { progress: String(resumeAt) } : {}),
    ...(type === "tv" ? { nextEpisode: "true", episodeSelector: "true" } : {}),
  });

  return (
    <div className="w-full h-full">
      <iframe
        src={`${base}?${qs}`}
        className="w-full aspect-video rounded-lg shadow-2xl"
        allow="autoplay; fullscreen; encrypted-media"
        allowFullScreen
      />
    </div>
  );
}
