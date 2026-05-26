import React from "react";
import { useState } from "react";
import ImageLightbox from "./ImageLightbox";
const GalleryCard = ({ item }) => {
  const imageUrl =
    item.image && item.image.length > 0
      ? `http://localhost:5000/${item.image.split(",")[0]}`
      : "/placeholder.png";
  const images = item.image
  ? item.image.split(",").map(img =>
      `${import.meta.env.VITE_IMG_URL}/${img}`
    )
  : ["/placeholder.png"];
  const [open, setOpen] = useState(false);
  const formatGalleryDescription = (item) => {
    if (!item) return "";

    // If backend already gives good text → use it
    if (item.description && !item.description.includes("staff_id")) {
      return item.description;
    }

    // fallback clean UX text
    return `Recent service activity completed at ${item.location || "local branch"}.`;
  };
  return (
    <div className="bg-white rounded-2xl overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      {/* Image Container */}
      <div
        className="relative overflow-hidden h-64 bg-gray-200 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <img
          src={imageUrl}
          className="w-full h-full object-cover"
          alt={item.title}
        />

        {/* Date Badge */}
        <div className="absolute top-3 right-3 px-3 py-1.5 text-white text-xs font-bold rounded-md shadow-lg bg-orange-500">
          {new Date(item.gallery_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>
      {/* Content Container */}
      <div className="p-6">
        {/* Meta Info - Branch ID & Location */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span
            className="px-2.5 py-1 text-xs font-semibold rounded-full"
            style={{ backgroundColor: "#FF6B35", color: "white" }}
          >
            Community Service
          </span>
          <span className="text-gray-500 text-xs">•</span>
          <span className="text-gray-300 text-xs font-medium">
            {item.location}
          </span>
        </div>
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 leading-snug tracking-tight mb-3 group-hover:text-orange-400 transition-colors duration-300 line-clamp-2">
          {item.title}
        </h3>
        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">
          {formatGalleryDescription(item)}
        </p>
        {/* View More Link */}
        <button
          className="mt-4 font-semibold text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer"
          style={{ color: "#FF6B35" }}  onClick={() => setOpen(true)}
        >
          View More Photos
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </button>
      </div>
      {open && (
        <ImageLightbox
          images={images}
          index={0}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};
export default GalleryCard;
