import React from "react";

const FeaturedBranchesList = ({ branches, onBranchClick }) => {
  if (!branches?.length) {
    return (
      <div className="text-center text-gray-600">
        No branch data available yet.
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {branches.map((b, idx) => (
        <button
          key={b.branchId ?? idx}
          onClick={() => onBranchClick?.(b)}
          className="text-left border border-gray-200 rounded-2xl p-6 bg-gray-50 hover:bg-white hover:shadow-xl transition-shadow"
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{
              backgroundColor: "rgba(255,107,53,0.12)",
              color: "#FF6B35",
            }}
          >
            ✓
          </div>

          <div className="text-xl font-semibold" style={{ color: "#0a1628" }}>
            {b.title}
          </div>

          <div className="text-gray-600 mt-2 text-sm leading-relaxed">
            {b.note}
          </div>
        </button>
      ))}
    </div>
  );
};

export default FeaturedBranchesList;
