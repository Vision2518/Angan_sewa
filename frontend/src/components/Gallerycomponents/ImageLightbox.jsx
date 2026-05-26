import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
const ImageLightbox = ({ images = [], onClose }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative bg-white w-full max-w-5xl max-h-[85vh] overflow-y-auto rounded-xl p-4 z-10">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-black/10 hover:bg-black/20 p-2 rounded-full"
        >
          <FaTimes className="text-orange-400" />
        </button>

        {/* TITLE */}
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Gallery Images
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-full h-40 object-cover rounded-lg hover:scale-105 transition"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageLightbox;