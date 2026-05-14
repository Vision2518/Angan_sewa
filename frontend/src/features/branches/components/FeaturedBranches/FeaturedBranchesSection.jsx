import React from "react";

const FeaturedBranchesSection = ({ children, isEmpty }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ color: "#0a1628" }}
            >
              Featured <span style={{ color: "#FF6B35" }}>Branches</span>
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl">
              Choose a branch to connect quickly with local managers.
            </p>
          </div>

          <a
            href="/Gallery"
            className="px-8 py-3 font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-white"
            style={{ backgroundColor: "#FF6B35" }}
          >
            View all gallery <span className="ml-2">→</span>
          </a>
        </div>

        {isEmpty ? (
          <div className="text-center text-gray-600">
            No branch data available yet.
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  );
};

export default FeaturedBranchesSection;
