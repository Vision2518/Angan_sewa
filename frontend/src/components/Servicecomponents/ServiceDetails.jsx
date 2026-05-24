import { useParams, useNavigate } from "react-router-dom";
import { useGetServiceByIdQuery } from "../../redux/features/ServiceSlice";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetServiceByIdQuery(id);

  const service = data?.data || data;

  // SAFE DATA LAYER
  const cleanService = {
    id: service?.service_id || id,
    name: service?.service_name || "Service Not Available",
    image: service?.service_image
      ? `${import.meta.env.VITE_IMG_URL}/${service.service_image}`
      : "/placeholder.jpg",
    description:
      service?.description?.length > 30
        ? service.description
        : "Reliable local service available in your area. Contact provider for full details.",
    phone: service?.phone || null,
    whatsapp: service?.whatsapp || null,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* BACK BUTTON */}
      <div className="p-4">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600 hover:text-black"
        >
          ← Back
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-5xl mx-auto px-4 space-y-6">

        {/* HERO CARD */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">

          {/* IMAGE */}
          <div className="h-64 w-full bg-gray-100 overflow-hidden">
            <img
              src={cleanService.image}
              alt={cleanService.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* TITLE + TEXT + BADGES */}
          <div className="p-5">

            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
              {cleanService.name}
            </h1>

            <p className="mt-2 text-sm md:text-base text-gray-500 leading-relaxed">
              Trusted local service • Fast response • Available near you
            </p>

            {/* BADGES */}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-[11px] md:text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                ✓ Verified Service
              </span>

              <span className="text-[11px] md:text-xs px-3 py-1 bg-orange-100 text-orange-600 rounded-full font-medium">
                ⚡ Fast Response
              </span>

              <span className="text-[11px] md:text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium">
                📍 Local Provider
              </span>
            </div>

          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">About Service</h2>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
            {cleanService.description}
          </p>
        </div>

        {/* CONTACT BUTTONS (DESKTOP) */}
        <div className="flex flex-col sm:flex-row gap-3">

          <a
            href={`tel:${cleanService.phone || ""}`}
            className="flex-1 text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition"
          >
            📞 Call Now
          </a>

          <a
            href={
              cleanService.whatsapp
                ? `https://wa.me/${cleanService.whatsapp}`
                : "#"
            }
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition"
          >
            💬 WhatsApp
          </a>

        </div>
      </div>

      {/* MOBILE STICKY ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-3 flex gap-2 sm:hidden z-50">

        <a
          href={`tel:${cleanService.phone || ""}`}
          className="flex-1 bg-green-500 text-white text-center py-3 rounded-xl font-semibold"
        >
          📞 Call
        </a>

        <a
          href={
            cleanService.whatsapp
              ? `https://wa.me/${cleanService.whatsapp}`
              : "#"
          }
          target="_blank"
          rel="noreferrer"
          className="flex-1 bg-orange-500 text-white text-center py-3 rounded-xl font-semibold"
        >
          💬 WhatsApp
        </a>

      </div>
    </div>
  );
};

export default ServiceDetails;