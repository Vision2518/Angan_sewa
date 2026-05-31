import { useState,useEffect } from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useSearchParams } from "react-router-dom";
import { useGetProvinceQuery } from "../../redux/features/provinceSlice";
import { useGetAllServicesQuery } from "../../redux/features/ServiceSlice";
import {
  useGetDistrictByProvinceQuery,
  useGetBranchByDistrictQuery,
} from "../../redux/features/districtSlice";
import ServiceCard from "./ServiceCard";
import Pagination from "../pagination";

const FilterService = () => {
  const [searchParams] = useSearchParams();
  const IMG_URL = import.meta.env.VITE_IMG_URL;
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  
  const [selectedBranch, setSelectedBranch] = useState("");
  
  useEffect(() => {
  const district = searchParams.get("district") || "";
  setSelectedDistrict(district);
}, [searchParams]);

  const [page, setPage] = useState(1);
  
  const limit = 6;

  const { data, isFetching } = useGetAllServicesQuery({
    page,
    limit,
    province_id: selectedProvince,
    district_id: selectedDistrict,
    branch_id: selectedBranch,
  });
  const hasFilters = !!(selectedProvince || selectedDistrict || selectedBranch);
  const services = data?.data || [];
  const pagination = data?.pagination || {};

  const { data: allProvinces } = useGetProvinceQuery();

  const { data: districtData } = useGetDistrictByProvinceQuery(
    selectedProvince || skipToken,
  );

  const { data: branchData } = useGetBranchByDistrictQuery(
    selectedDistrict || skipToken,
  );

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > (pagination.totalPages || 1)) return;
    setPage(newPage);
  };

  const handleReset = () => {
    setSelectedProvince("");
    setSelectedDistrict("");
    setSelectedBranch("");
    setPage(1);
  };

  const SkeletonCard = () => {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
        <div className="h-44 bg-gray-200" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-8 bg-gray-200 rounded w-24 mt-2" />
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 md:px-10 py-10">
      {/* 🔥 SECTION HEADER (NEW UX LAYER) */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Find Services in Your Area
        </h2>

        <p className="text-gray-600 mt-2">
          Select your location to discover trusted local professionals near you
        </p>
      </div>

      {/* 🔥 SEARCH BAR STYLE FILTER CARD */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Province */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Province</label>
            <select
              value={selectedProvince}
              onChange={(e) => {
                setSelectedProvince(e.target.value);
                setSelectedDistrict("");
                setSelectedBranch("");
                setPage(1);
              }}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none"
            >
              <option value="">Select Province</option>
              {allProvinces?.data?.map((p) => (
                <option key={p.province_id} value={p.province_id}>
                  {p.province_name}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">District</label>
            <select
              value={selectedDistrict}
              disabled={!selectedProvince}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedBranch("");
                setPage(1);
              }}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 disabled:bg-gray-100 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none"
            >
              <option value="">Select District</option>
              {districtData?.data?.map((d) => (
                <option key={d.district_id} value={d.district_id}>
                  {d.district_name}
                </option>
              ))}
            </select>
          </div>

          {/* Branch */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Branch</label>
            <select
              value={selectedBranch}
              disabled={!selectedDistrict}
              onChange={(e) => {
                setSelectedBranch(e.target.value);
                setPage(1);
              }}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 disabled:bg-gray-100 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none"
            >
              <option value="">Select Branch</option>
              {branchData?.data?.map((b) => (
                <option key={b.branch_id} value={b.branch_id}>
                  {b.branch_name}
                </option>
              ))}
            </select>
          </div>

          {/* CTA + Reset */}
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl py-2 text-sm font-medium"
            >
              Reset
            </button>

            <button
              onClick={() => setPage(1)}
              className="w-1/2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-2 text-sm font-semibold"
            >
              Find
            </button>
          </div>
        </div>
      </div>
      {/*recommnedation message */}
      <div className="mb-6 p-4 rounded-xl bg-orange-50 border border-orange-100 text-center">
        <p className="text-sm text-gray-700 font-medium">
          {hasFilters
            ? "Showing services for your selected location. You can adjust filters above anytime."
            : "You are viewing general services. For more accurate and nearby results, please select your province, district, and branch above."}
        </p>
      </div>
      {/* RESULTS */}
      <div className="mt-10">
        {isFetching ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : services.length > 0 ? (
          <>
            <ServiceCard
              allServices={services}
              image_url={IMG_URL}
              hasFilters={
                selectedProvince || selectedDistrict || selectedBranch
              }
            />
            <div className="mt-6">
              <Pagination
                currentPage={pagination.currentPage || 1}
                totalPages={pagination.totalPages || 1}
                totalItems={pagination.totalItems || 0}
                startIndex={
                  ((pagination.currentPage || 1) - 1) * (pagination.limit || 6)
                }
                endIndex={
                  ((pagination.currentPage || 1) - 1) *
                    (pagination.limit || 6) +
                  services.length
                }
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 font-medium">
              No services found for this location
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Try selecting a different district or branch
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterService;
