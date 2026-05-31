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
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* BACKDROP */}
        <div className="absolute inset-0 bg-black/80" onClick={onClose} />

        {/* MODAL BOX */}
        <div className="relative bg-white w-full max-w-5xl rounded-xl shadow-xl overflow-hidden z-10">
          {/* HEADER */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            {/* TITLE */}
            <div className="flex items-center space-x-3">
              <div className="w-1 h-6 bg-red-500 rounded-full"></div>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">
                  {"Gallery"}
                </h3>
                <div className="w-10 h-0.5 bg-red-500 mt-1 rounded-full"></div>
              </div>
            </div>

            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="group p-2 rounded-lg hover:bg-red-50 transition"
            >
              <FaTimes className="h-5 w-5 text-red-400 transition-transform hover:rotate-180 duration-300" />
            </button>
          </div>

          {/* BODY (YOU WILL PUT GRID HERE LATER) */}
          <div className="p-4">
            {/* IMAGE GRID GOES HERE */}
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
      </div>
    </div>
  );
};

export default ImageLightbox;
