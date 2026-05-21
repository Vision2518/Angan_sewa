import React from "react";

const ServiceCard = ({ allServices = [], image_url, children }) => {
  return (
    <div className="bg-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 inline-block">
            {children || "Our Services"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12 max-lg:max-w-3xl max-md:max-w-md mx-auto">
          {allServices.map((service) => (
            <div
              key={service.service_id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col"
            >
              <div className="relative w-full h-44 overflow-hidden bg-gray-100">
                <img
                  src={`${image_url}/${service.service_image}`}
                  alt={service.service_name}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.jpg";
                  }}
                />
              </div>
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">
                    Verified Service
                  </span>

                  <span className="text-[11px] px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full font-medium">
                    Fast Response
                  </span>
                </div>

                {/* Service Name */}
                <h3 className="text-lg font-semibold text-gray-900 leading-snug -tracking-tight">
                  {service.service_name}
                </h3>

                {/* Optional short description */}
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                  {service.description && service.description.length > 40
                    ? service.description
                    : "Reliable professional service available at your selected branch with quick response and support."}
                </p>
                {/* CTA */}
                <button className="mt-2 text-sm font-semibold text-orange-500 hover:text-orange-600 self-start flex items-center gap-1">
                  View Details
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
