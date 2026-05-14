import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  onPageChange,
}) => {
  if (totalItems === 0) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8">

      {/* Info */}
      <p className="text-sm text-gray-600 text-center sm:text-left">
        Showing {startIndex + 1}-{endIndex} of{" "}
        {totalItems}
      </p>

      {/* Buttons */}
      <div className="flex gap-2 justify-center flex-wrap">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(currentPage - 1)
          }
          className="px-3 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }).map(
          (_, i) => (
            <button
              key={i}
              onClick={() =>
                onPageChange(i + 1)
              }
              className={`px-3 py-2 border rounded ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : ""
              }`}
            >
              {i + 1}
            </button>
          )
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            onPageChange(currentPage + 1)
          }
          className="px-3 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;