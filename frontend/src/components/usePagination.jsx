import { useMemo, useState } from "react";
export const usePagination = (data, itemsPerPage = 6) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const visiblePage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;
  const startIndex = (visiblePage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = useMemo(() => {
    return data.slice(startIndex, endIndex);
  }, [data, startIndex, endIndex]);
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  return {
    currentPage: visiblePage,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    paginatedData,
    setCurrentPage,
    handlePageChange,
  };
};
