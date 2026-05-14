import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetAllDistrictQuery,
  useGetBranchByDistrictQuery,
} from "../../../../../../src/redux/features/districtSlice";

import FeaturedBranchesList from "./FeaturedBranchesList";

const FeaturedBranchesContainer = () => {
  const navigate = useNavigate();

  const { isLoading, isError, data } = useGetAllDistrictQuery();

  // No user-selected district exists on the Home page.
  // We choose the first district (if available) to power the demo cards.
  const firstDistrictId = data?.data?.[0]?.district_id;

  const { data: branchData } = useGetBranchByDistrictQuery(firstDistrictId, {
    skip: !firstDistrictId,
  });

  const places =
    branchData?.data?.map((b) => ({
      id: b.branch_id,
      branchId: b.branch_id,
      label: b.branch_name,
      slug: b.branch_slug,
    })) || [];

  const featuredBranches = [
    {
      branchId: places[0]?.id,
      title: "Nearby Branch Assistance",
      note: "Get guidance from local managers.",
    },
    {
      branchId: places[1]?.id,
      title: "Fast Service Connect",
      note: "Quick response and transparent delivery.",
    },
    {
      branchId: places[2]?.id,
      title: "District-level Support",
      note: "Help across multiple district requirements.",
    },
  ].filter((b) => b.branchId);

  const isEmpty = !isLoading && (featuredBranches?.length === 0 || isError);

  const handleBranchClick = (selected) => {
    const branch = places.find((p) => p.id === Number(selected?.branchId));
    if (!branch?.slug) return;

    navigate(`/services/${branch.slug}`, {
      state: { branchId: branch.id },
    });
  };

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

          <button
            onClick={() => navigate("/Gallery")}
            className="px-8 py-3 font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-white"
            style={{ backgroundColor: "#FF6B35" }}
          >
            View all gallery <span className="ml-2">→</span>
          </button>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-600">Loading branches...</div>
        ) : (
          <FeaturedBranchesList
            branches={featuredBranches}
            onBranchClick={handleBranchClick}
          />
        )}

        {isEmpty ? null : null}
      </div>
    </section>
  );
};

export default FeaturedBranchesContainer;
