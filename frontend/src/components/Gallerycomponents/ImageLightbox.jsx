import { useEffect } from "react";
const ImageLightbox = ({ images = [], index = 0, onClose }) => {
  if (!images.length) return null;
  const currentImage = images[index];
  // close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />

      {/* IMAGE CONTAINER */}
      <div className="relative max-w-4xl w-full px-4">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl font-bold"
        >
          ✕
        </button>

        {/* IMAGE */}
        <img
          src={currentImage}
          alt="gallery"
          className="w-full max-h-[80vh] object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

export default ImageLightbox;