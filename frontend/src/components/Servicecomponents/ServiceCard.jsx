import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({
  allServices = [],
  children,
}) => {
  return (
    <div className="bg-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 inline-block">
            {children || "Our Services"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12 max-lg:max-w-3xl max-md:max-w-md mx-auto">
          {allServices.map((service) => {
            return (
              <div className="bg-white relative rounded-xl shadow-md  transition-all duration-300 p-5 flex flex-col gap-3 border-2 border-gray-200 hover:border-orange-200 hover:shadow-orange-100">
                {/* LEFT ACCENT STRIP */}
                <div className="absolute left-0 top-6 bottom-6 h-29 w-1 bg-orange-400 rounded-r-full"></div>
                {/* TITLE */}
                <h3 className="text-lg font-semibold text-gray-900">
                  {service.service_name}
                </h3>

                {/* SHORT TAGLINE (optional minimal hint) */}
                <p className="text-sm text-gray-500">
                  Click below to view full details and contact info
                </p>

                {/* CTA */}
                <Link
                  to={`/services/${service.service_id}`}
                  className="mt-2 inline-flex self-start items-center gap-1 text-sm font-semibold text-orange-600  px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-all duration-200 shadow-sm"
                >
                  View Details →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
