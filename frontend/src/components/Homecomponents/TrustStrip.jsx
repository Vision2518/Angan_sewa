import React from "react";

const TrustStrip = () => {
  const stats = [
    { value: "1000+", label: "Happy citizens" },
    { value: "24/7", label: "Quick assistance" },
    { value: "Trusted", label: "Local branches" },
    { value: "Fast", label: "Transparent delivery" },
  ];

  return (
    <section className="py-16 bg-[#0a1628]">
      <div className="max-w-7xl mx-auto px-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "white" }}>
              Trust built for every
              <span style={{ color: "#FF6B35" }}> District</span>
            </h2>
            <p className="text-gray-200 mt-4 leading-relaxed">
              Aagan Sewa connects citizens with reliable local managers. Clear
              service steps, faster responses, and transparent delivery—so you
              can get help when you need it.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <div className="text-2xl font-bold" style={{ color: "#FF6B35" }}>
                  {s.value}
                </div>
                <div className="text-sm text-gray-200 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;

