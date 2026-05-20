import React from "react";
import { useNavigate } from "react-router-dom";

const FeaturedServices = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Passport & Document Help",
      desc: "Guidance for document workflows",
    },
    {
      title: "Ward-level Support",
      desc: "Quick help through local managers",
    },
    {
      title: "Education Services",
      desc: "School-related assistance & info",
    },
    {
      title: "Health & Community",
      desc: "Connect to local government units",
    },
    {
      title: "Business Registration",
      desc: "Step-by-step support",
    },
    {
      title: "Property & Records",
      desc: "Access guidance for documentation",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "#0a1628" }}>
              Popular <span style={{ color: "#FF6B35" }}>Services</span>
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl">
              Find the service you need and connect with nearby branches.
            </p>
          </div>

          <button
            onClick={() => navigate("/services")}
            className="px-8 py-3 font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-white"
            style={{ backgroundColor: "#FF6B35" }}
          >
            See What We Offer
            <span className="inline-block ml-2">→</span>
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => (
            <button
              key={idx}
              onClick={() => navigate("/services")}
              className="text-left group border border-gray-200 rounded-2xl p-6 bg-gray-50 hover:bg-white hover:shadow-xl transition-shadow"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(255,107,53,0.12)" }}
              >
                <span className="text-2xl" style={{ color: "#FF6B35" }}>
                  ✓
                </span>
              </div>
              <h3 className="text-xl font-semibold" style={{ color: "#0a1628" }}>
                {s.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">{s.desc}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "#FF6B35" }}>
                Explore
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;

