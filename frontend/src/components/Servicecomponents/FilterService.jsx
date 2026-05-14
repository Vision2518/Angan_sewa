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
import Pagination from "../pagination";
import  usePagination  from "../usePagination";
const FilterService = () => {
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // Core data
  const { data: allProvinces } = useGetProvinceQuery();
  const { data: allServices } = useGetAllServicesQuery();

  const allServicesList = useMemo(
    () => allServices?.data || [],
    [allServices]
  );

  // Cascading dropdowns
  const { data: districtData } =
    useGetDistrictByProvinceQuery(
      selectedProvince || skipToken
    );

  const { data: branchData } =
    useGetBranchByDistrictQuery(
      selectedDistrict || skipToken
    );

  const { data: filteredBranchData, isFetching: loadingFilter } =
    useGetBranchesByProvinceQuery(
      selectedProvince
        ? {
            province_id: selectedProvince,
            district_id: selectedDistrict,
          }
        : skipToken
    );

  // Allowed branch IDs
  const allowedBranchIds = useMemo(() => {
    return (
      filteredBranchData?.data?.map((b) =>
        String(b.branch_id)
      ) || []
    );
  }, [filteredBranchData]);

  // FILTER SERVICES
  const servicesList = useMemo(() => {
    if (!selectedProvince) return allServicesList;
    if (loadingFilter) return [];

    return allServicesList.filter((service) => {
      const serviceBranchId = String(service.branch_id);

      if (selectedBranch) {
        return serviceBranchId === String(selectedBranch);
      }

      return allowedBranchIds.includes(serviceBranchId);
    });
  }, [
    allServicesList,
    selectedProvince,
    selectedBranch,
    allowedBranchIds,
    loadingFilter,
  ]);

  const handlePageChange = (pageNumber) => {
    if (
      pageNumber < 1 ||
      pageNumber > totalPages
    )
      return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4">

      {/* FILTER SECTION */}
      <div className="bg-white p-6 rounded-2xl shadow-sm grid gap-4 md:grid-cols-4">

        {/* Province */}
        <select
          value={selectedProvince}
          onChange={(e) => {
            setSelectedProvince(e.target.value);
            setSelectedDistrict("");
            setSelectedBranch("");
            setCurrentPage(1);
          }}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">
            Select Province
          </option>

          {allProvinces?.data?.map((p) => (
            <option
              key={p.province_id}
              value={p.province_id}
            >
              {p.province_name}
            </option>
          ))}
        </select>

        {/* District */}
        <select
          value={selectedDistrict}
          disabled={!selectedProvince}
          onChange={(e) => {
            setSelectedDistrict(e.target.value);
            setSelectedBranch("");
            setCurrentPage(1);
          }}
          className="border rounded-lg px-4 py-2 disabled:bg-gray-100"
        >
          <option value="">
            Select District
          </option>

          {districtData?.data?.map((d) => (
            <option
              key={d.district_id}
              value={d.district_id}
            >
              {d.district_name}
            </option>
          ))}
        </select>

        {/* Branch */}
        <select
          value={selectedBranch}
          disabled={!selectedDistrict}
          onChange={(e) => {
            setSelectedBranch(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg px-4 py-2 disabled:bg-gray-100"
        >
          <option value="">
            Select Branch
          </option>

          {branchData?.data?.map((b) => (
            <option
              key={b.branch_id}
              value={b.branch_id}
            >
              {b.branch_name}
            </option>
          ))}
        </select>

        {/* Reset */}
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

      {/* CONTENT */}
      <div className="mt-8">

        {loadingFilter ? (
          <div className="text-center py-20 text-indigo-600 font-bold">
            Loading Services...
          </div>
        ) : servicesList.length > 0 ? (
          <>
            <ServiceCard
              allServices={paginatedServices}
              image_url={IMG_URL}
            />

            {/* Pagination Component (ONLY UI NOW) */}
            <Pagination
              currentPage={visiblePage}
              totalPages={totalPages}
              totalItems={totalServices}
              startIndex={startIndex}
              endIndex={endIndex}
              onPageChange={handlePageChange}
            />
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