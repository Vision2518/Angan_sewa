import React, { useState } from "react";
import { useGetAllGalleryQuery } from "../../redux/features/gallerySlice.js";
import GalleryCard from "./GalleryCard";
import Pagination from "../pagination";

const GalleryGrid = () => {
  const [page, setPage] = useState(1);
  const limit = 6;
  const { data, isFetching } = useGetAllGalleryQuery({
    page,
    limit,
  });
  const gallery = data?.data || [];
  const pagination = data?.pagination || {};
  console.log("pagination:", pagination);
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > (pagination.totalPages || 1)) return;
    setPage(newPage);
  };
  return (
    <div className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* HERO / INTRO */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a2b4b] leading-tight">
            Service Gallery
          </h1>

          <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
            Explore recent activities, service updates, and community support
            moments from our branches and local service teams.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-sm text-gray-700">
            📍 Real branch activities • Trusted local services • Community
            focused
          </div>
        </div>
        {isFetching ? (
          <div className="text-center py-10">Loading...</div>
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
                ((pagination.currentPage || 1) - 1) * (pagination.limit || 6)
              }
              endIndex={
                (pagination.currentPage - 1) * pagination.limit + gallery.length
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
