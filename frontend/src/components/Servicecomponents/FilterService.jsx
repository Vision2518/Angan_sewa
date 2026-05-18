import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useGetProvinceQuery } from "../../redux/features/provinceSlice";
import { useGetAllServicesQuery } from "../../redux/features/ServiceSlice";
import {
  useGetDistrictByProvinceQuery,
  useGetBranchByDistrictQuery,
} from "../../redux/features/districtSlice";

import ServiceCard from "./ServiceCard";
import Pagination from "../pagination";

const FilterService = () => {
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  // ======================
  // STATES
  // ======================
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 6;

  // ======================
  // MAIN API (HYBRID)
  // ======================
  const { data, isFetching } = useGetAllServicesQuery({
    page,
    limit,
    province_id: selectedProvince,
    district_id: selectedDistrict,
    branch_id: selectedBranch,
  });

  const services = data?.data || [];
  const pagination = data?.pagination || {};

  // ======================
  // DROPDOWN DATA
  // ======================
  const { data: allProvinces } = useGetProvinceQuery();

  const { data: districtData } = useGetDistrictByProvinceQuery(
    selectedProvince || skipToken
  );

  const { data: branchData } = useGetBranchByDistrictQuery(
    selectedDistrict || skipToken
  );

  // ======================
  // PAGE CHANGE
  // ======================
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > (pagination.totalPages || 1)) return;
    setPage(newPage);
  };

  // ======================
  // FILTER HANDLERS
  // ======================
  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedDistrict("");
    setSelectedBranch("");
    setPage(1);
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedBranch("");
    setPage(1);
  };

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
    setPage(1);
  };

  const handleReset = () => {
    setSelectedProvince("");
    setSelectedDistrict("");
    setSelectedBranch("");
    setPage(1);
  };

  // ======================
  // UI
  // ======================
  return (
    <div className="p-4">

      {/* FILTERS */}
      <div className="bg-white p-6 rounded-2xl shadow-sm grid gap-4 md:grid-cols-4">

        {/* Province */}
        <select
          value={selectedProvince}
          onChange={handleProvinceChange}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">Select Province</option>
          {allProvinces?.data?.map((p) => (
            <option key={p.province_id} value={p.province_id}>
              {p.province_name}
            </option>
          ))}
        </select>

        {/* District */}
        <select
          value={selectedDistrict}
          disabled={!selectedProvince}
          onChange={handleDistrictChange}
          className="border rounded-lg px-4 py-2 disabled:bg-gray-100"
        >
          <option value="">Select District</option>
          {districtData?.data?.map((d) => (
            <option key={d.district_id} value={d.district_id}>
              {d.district_name}
            </option>
          ))}
        </select>

        {/* Branch */}
        <select
          value={selectedBranch}
          disabled={!selectedDistrict}
          onChange={handleBranchChange}
          className="border rounded-lg px-4 py-2 disabled:bg-gray-100"
        >
          <option value="">Select Branch</option>
          {branchData?.data?.map((b) => (
            <option key={b.branch_id} value={b.branch_id}>
              {b.branch_name}
            </option>
          ))}
        </select>

        {/* Reset */}
        <button
          className="bg-indigo-600 text-white rounded-lg px-4 py-2"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      {/* CONTENT */}
      <div className="mt-8">

        {/* LOADING */}
        {isFetching ? (
          <div className="text-center py-20 text-indigo-600 font-bold">
            Loading Services...
          </div>
        ) : services.length > 0 ? (
          <>
            {/* SERVICE LIST */}
            <ServiceCard allServices={services} image_url={IMG_URL} />

            {/* PAGINATION */}
            <div className="mt-6">
              <Pagination
                currentPage={pagination.currentPage || 1}
                totalPages={pagination.totalPages || 1}
                totalItems={pagination.totalItems || 0}
                startIndex={
                  ((pagination.currentPage || 1) - 1) * (pagination.limit || 6)
                }
                endIndex={
                  ((pagination.currentPage || 1) - 1) * (pagination.limit || 6) +
                  services.length
                }
                onPageChange={handlePageChange}
              />
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
