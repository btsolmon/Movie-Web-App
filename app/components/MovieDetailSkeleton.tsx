import React from "react";
import { Skeleton } from "@/app/components/Skeleton";
import { Container } from "./Container";

const MovieDetailSkeleton = () => {
  return (
    <div className="min-h-screen text-black">
      <Container>
        <main className="pt-10">
          <div className="flex justify-between items-end mb-8">
            <div className="space-y-3">
              <Skeleton width={300} height={40} className="rounded-lg" />
              <div className="flex gap-2">
                <Skeleton width={40} height={16} />
                <Skeleton width={30} height={16} />
                <Skeleton width={60} height={16} />
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <Skeleton width={40} height={12} />
              <div className="flex gap-2 items-center">
                <Skeleton width={32} height={32} className="rounded-full" />
                <div className="space-y-1">
                  <Skeleton width={50} height={20} />
                  <Skeleton width={30} height={10} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-5 mb-10 h-[500px] mt-10">
            <div className="col-span-4">
              <Skeleton height="100%" className="rounded-sm" />
            </div>
            <div className="col-span-8">
              <Skeleton height="100%" className="rounded-sm" />
            </div>
          </div>
        </main>
      </Container>

      <Container>
        <div className="space-y-6">
          <div className="flex gap-2">
            <Skeleton width={80} height={32} className="rounded-full" />
            <Skeleton width={80} height={32} className="rounded-full" />
            <Skeleton width={80} height={32} className="rounded-full" />
          </div>
          <div className="space-y-2 max-w-4xl">
            <Skeleton width="100%" height={20} />
            <Skeleton width="100%" height={20} />
            <Skeleton width="70%" height={20} />
          </div>
        </div>
      </Container>

      <Container>
        <div className="space-y-5 border-b border-gray-200 dark:border-gray-600 py-6">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="grid grid-cols-[100px_1fr] items-center">
                <Skeleton width={60} height={16} />
                <Skeleton width={150} height={16} />
              </div>
              {i < 3 && (
                <hr className="mt-5 border-gray-100 dark:border-gray-800" />
              )}
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <div className="mt-10">
          <Skeleton width={150} height={24} className="mb-4" />
          <div className="grid grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton height={250} className="rounded-md" />
                <Skeleton width="80%" height={16} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MovieDetailSkeleton;
