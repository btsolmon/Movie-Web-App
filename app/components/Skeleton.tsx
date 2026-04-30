import React from "react";

type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  className?: string;
};

export const Skeleton: React.FC<SkeletonProps> = ({ width = "100%", height = "1rem", className = "" }) => {
  const style = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  return (
    <div style={style} className={`relative overflow-hidden rounded-md bg-gray-200 ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
};