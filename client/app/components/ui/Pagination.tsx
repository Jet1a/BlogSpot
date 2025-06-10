import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  prevPage: number;
  nextPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  hasNextPage,
  hasPrevPage,
  prevPage,
  onPageChange,
  nextPage,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      <button
        onClick={() => onPageChange(prevPage)}
        disabled={!hasPrevPage}
        className={`px-2 py-1 rounded cursor-pointer ${
          hasPrevPage
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
        (page, index) => (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded cursor-pointer  ${
              page === currentPage
                ? "bg-blue-700 text-white font-bold"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(nextPage)}
        disabled={!hasNextPage}
        className={`px-2 py-1 rounded cursor-pointer ${
          hasNextPage
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
