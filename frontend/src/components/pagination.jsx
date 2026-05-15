import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  onPageChange,
}) => {
  if (!totalItems || totalPages <= 1) return null;

  const safeStart = totalItems === 0 ? 0 : startIndex + 1;
  const safeEnd = Math.min(endIndex, totalItems);

  // LIMIT visible page buttons (important UX fix)
  const getPages = () => {
    const pages = [];

    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8">

      {/* INFO */}
      <p className="text-sm text-gray-600 text-center sm:text-left">
        Showing {safeStart}-{safeEnd} of {totalItems}
      </p>

      {/* PAGINATION */}
      <div className="flex gap-2 justify-center flex-wrap">

        {/* PREV */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {/* PAGE NUMBERS */}
        {getPages().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 border rounded ${
              currentPage === page
                ? "bg-indigo-600 text-white"
                : ""
            }`}
          >
            {page}
          </button>
        ))}

        {/* NEXT */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;