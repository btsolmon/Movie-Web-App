"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="flex items-center gap-2 py-10">
      {/* Өмнөх хуудас */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 disabled:opacity-30 hover:bg-gray-100 rounded flex justify-center items-center gap-3"
      >
        <span className="text-lg">‹</span>
        Previous
      </button>

      {pages.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`w-10 h-10 rounded-md transition-colors ${
            currentPage === pageNum
              ? "bg-black text-white"
              : "hover:bg-gray-100 border border-gray-200"
          }`}
        >
          {pageNum}
        </button>
      ))}

      <span className="px-2">...</span>

      {/* Дараагийн хуудас */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 hover:bg-gray-100 rounded flex items-center gap-3"
      >
        Next <span className="text-lg">›</span>
      </button>
    </div>
  );
};
