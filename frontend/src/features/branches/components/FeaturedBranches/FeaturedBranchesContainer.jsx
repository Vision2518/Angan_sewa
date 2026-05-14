import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetAllDistrictQuery,
  useGetBranchByDistrictQuery,
} from "../../../../redux/features/districtSlice";

import FeaturedBranchesList from "./FeaturedBranchesList";
import FeaturedBranchesSection from "./FeaturedBranchesSection";


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
    <div>
      <FeaturedBranchesSection isEmpty={isEmpty}>
        {isLoading ? (
          <div className="text-center text-gray-600">Loading branches...</div>
        ) : (
          <FeaturedBranchesList
            branches={featuredBranches}
            onBranchClick={handleBranchClick}
          />
        )}
      </FeaturedBranchesSection>
    </div>
  );
};

export default FeaturedBranchesContainer;
