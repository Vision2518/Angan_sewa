import React, { useState } from "react";
import { useGetAllGalleryQuery } from "../../redux/features/gallerySlice.js";
import GalleryCard from "./GalleryCard";
import Pagination from "../pagination";

const GalleryGrid = () => {
    const [page, setPage] = useState(1);
    const limit=6;
  const { data, isFetching } = useGetAllGalleryQuery({
    page,
    limit,
  });
  const gallery = data?.data || [];
  const pagination = data?.pagination || {};
  console.log("pagination:", pagination);
   const handlePageChange = (newPage) => {
    if (
      newPage < 1 ||
      newPage > (pagination.totalPages || 1)
    )
      return;
    setPage(newPage);
  };
  return (
    <div className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold border-l-4 border-orange-500 pl-4 mb-10">
          ALL GALLERY
        </h2>
         {isFetching ? (
          <div className="text-center py-10">
            Loading...
          </div>
        ) : (
          <>
            {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {gallery.map((item) => (
            <GalleryCard key={item.gallery_id} item={item} />
          ))}
        </div>
        {/* PAGINATION */}
            <Pagination
              currentPage={pagination.currentPage || 1}
              totalPages={pagination.totalPages || 1}
              totalItems={pagination.totalItems || 0}
              startIndex={
                ((pagination.currentPage || 1) - 1) *
                (pagination.limit || 6)
              }
            endIndex={
            (pagination.currentPage - 1) * pagination.limit +
            gallery.length
} 
              onPageChange={handlePageChange}
            />
            </>
        )}
      </div>
    </div>
  );
};
export default GalleryGrid;
