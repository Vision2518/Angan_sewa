import React, { useState, useMemo } from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useGetProvinceQuery } from "../../redux/features/provinceSlice";
import { useGetAllServicesQuery } from "../../redux/features/ServiceSlice";
import {
  useGetDistrictByProvinceQuery,
  useGetBranchByDistrictQuery,
  useGetBranchesByProvinceQuery,
} from "../../redux/features/districtSlice";
import ServiceCard from "./ServiceCard";

const FilterService = () => {
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 1. Core Data
  const { data: allProvinces } = useGetProvinceQuery();
  const { data: allServices } = useGetAllServicesQuery();
  const allServicesList = useMemo(() => allServices?.data || [], [allServices]);

  // 2. Dropdown Data (Cascading)
  const { data: districtData } = useGetDistrictByProvinceQuery(selectedProvince || skipToken);
  const { data: branchData } = useGetBranchByDistrictQuery(selectedDistrict || skipToken);

  // 3. THE KEY HOOK: This fetches ALL branches belonging to the current selection
  // If only Province is selected, it returns all branches in that province.
  // If District is selected, it returns only branches in that district.
  const { data: filteredBranchData, isFetching: loadingFilter } = useGetBranchesByProvinceQuery(
    selectedProvince 
      ? { province_id: selectedProvince, district_id: selectedDistrict } 
      : skipToken
  );

  // Map the results to a simple array of IDs
  const allowedBranchIds = useMemo(() => {
    return filteredBranchData?.data?.map((b) => String(b.branch_id)) || [];
  }, [filteredBranchData]);

  // 4. Immediate Filter Logic
  const servicesList = useMemo(() => {
    // If no province is selected, show all services globally
    if (!selectedProvince) return allServicesList;

    // While fetching the new allowed branches for a newly selected province/district, 
    // we show an empty list (or you could keep the old one, but empty is cleaner for feedback)
    if (loadingFilter) return [];

    return allServicesList.filter((service) => {
      const serviceBranchId = String(service.branch_id);

      // Priority 1: If a specific branch is chosen, show only that branch
      if (selectedBranch) {
        return serviceBranchId === String(selectedBranch);
      }

      // Priority 2: If a Province or District is chosen, show services matching the "allowed" list
      // This is what makes the cards change as soon as you click a Province
      return allowedBranchIds.includes(serviceBranchId);
    });
  }, [allServicesList, selectedProvince, selectedBranch, allowedBranchIds, loadingFilter]);

  const totalServices = servicesList.length;
  const totalPages = Math.ceil(totalServices / itemsPerPage);
  const visiblePage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;
  const startIndex = (visiblePage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalServices);

  // Paginate the already-filtered services so search/filter behavior stays unchanged.
  const paginatedServices = servicesList.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    // Prevent navigation outside the available page range.
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4">
      <div className="bg-white p-6 rounded-2xl shadow-sm grid gap-4 md:grid-cols-4">
        
        {/* PROVINCE: Selecting this triggers the first filter update */}
        <select
          value={selectedProvince}
          onChange={(e) => {
            setSelectedProvince(e.target.value);
            setSelectedDistrict(""); // Reset downstream
            setSelectedBranch("");
            setCurrentPage(1);
          }}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">Select Province</option>
          {allProvinces?.data?.map((p) => (
            <option key={p.province_id} value={p.province_id}>{p.province_name}</option>
          ))}
        </select>

        {/* DISTRICT: Selecting this narrows cards further to just this district */}
        <select
          value={selectedDistrict}
          disabled={!selectedProvince}
          onChange={(e) => {
            setSelectedDistrict(e.target.value);
            setSelectedBranch(""); // Reset downstream
            setCurrentPage(1);
          }}
          className="border rounded-lg px-4 py-2 disabled:bg-gray-100"
        >
          <option value="">Select District</option>
          {districtData?.data?.map((d) => (
            <option key={d.district_id} value={d.district_id}>{d.district_name}</option>
          ))}
        </select>

        {/* BRANCH: Selecting this narrows cards to just one branch */}
        <select
          value={selectedBranch}
          disabled={!selectedDistrict}
          onChange={(e) => {
            setSelectedBranch(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg px-4 py-2 disabled:bg-gray-100"
        >
          <option value="">Select Branch</option>
          {branchData?.data?.map((b) => (
            <option key={b.branch_id} value={b.branch_id}>{b.branch_name}</option>
          ))}
        </select>

        <button
          className="bg-indigo-600 text-white rounded-lg px-4 py-2"
          onClick={() => {
            setSelectedProvince("");
            setSelectedDistrict("");
            setSelectedBranch("");
            setCurrentPage(1);
          }}
        >
          Reset
        </button>
      </div>

      <div className="mt-8">
        {loadingFilter ? (
          <div className="text-center py-20 text-indigo-600 font-bold">Loading Services...</div>
        ) : servicesList.length > 0 ? (
          <>
            <ServiceCard allServices={paginatedServices} image_url={IMG_URL} />

            <div className="max-w-6xl mx-auto px-4 mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-gray-600 text-center sm:text-left">
                Showing {startIndex + 1}-{endIndex} of {totalServices} services
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={visiblePage === 1}
                  onClick={() => handlePageChange(visiblePage - 1)}
                  className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 text-gray-700 transition disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 enabled:hover:bg-gray-50"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;
                  const isActivePage = visiblePage === pageNumber;

                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => handlePageChange(pageNumber)}
                      className={`min-w-10 px-3 py-2 text-sm font-semibold rounded-lg border transition ${
                        isActivePage
                          ? "border-indigo-600 bg-indigo-600 text-white"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  type="button"
                  disabled={visiblePage === totalPages}
                  onClick={() => handlePageChange(visiblePage + 1)}
                  className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 text-gray-700 transition disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 enabled:hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-gray-500 font-semibold">
            No services found in this location.
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterService;
