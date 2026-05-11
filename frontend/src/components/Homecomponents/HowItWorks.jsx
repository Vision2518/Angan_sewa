import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Select your district & place",
      desc: "Choose where you need help. We connect you to the nearest relevant branch.",
    },
    {
      title: "Browse available services",
      desc: "View service options and get clear next steps for your request.",
    },
    {
      title: "Connect with local managers",
      desc: "Get quick assistance and transparent service delivery through local teams.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "#0a1628" }}>
            How it <span style={{ color: "#FF6B35" }}>Works</span>
          </h2>
          <p className="text-gray-600 mt-4">
            Simple steps to access the right local service faster.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm hover:shadow-xl transition-shadow"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 font-bold"
                style={{ backgroundColor: "rgba(255,107,53,0.12)", color: "#FF6B35" }}
              >
                {idx + 1}
              </div>
              <h3 className="text-xl font-semibold" style={{ color: "#0a1628" }}>
                {s.title}
              </h3>
              <p className="text-gray-600 mt-3 leading-relaxed text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

