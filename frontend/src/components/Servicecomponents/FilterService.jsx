import React, { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useGetProvinceQuery } from "../../redux/features/provinceSlice";
import {
  useGetDistrictByProvinceQuery,
  useGetBranchByDistrictQuery,
} from "../../redux/features/districtSlice";
import { useGetAllServicesQuery } from "../../redux/features/ServiceSlice";
import ServiceCard from "./ServiceCard";

const FilterService = () => {
  const IMG_URL = import.meta.env.VITE_IMG_URL;
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  // 1. Provinces
  const { data: allProvinces } = useGetProvinceQuery();
  const allprovince = allProvinces?.data || [];

  // 2. Districts
  const { data: districtData } = useGetDistrictByProvinceQuery(
    selectedProvince ? selectedProvince : skipToken
  );
  const districts = districtData?.data || [];

  // 3. Branches
  const { data: branchData } = useGetBranchByDistrictQuery(
    selectedDistrict ? selectedDistrict : skipToken
  );
  const branches = branchData?.data || [];

  // 4. ✅ Fetch ALL services once — no params
  const { data: allServices, isLoading, isError } = useGetAllServicesQuery();
  const allServicesList = allServices?.data || [];

  // 5. ✅ Filter locally
  const servicesList = allServicesList.filter((service) => {
    if (selectedProvince && String(service.province_id) !== String(selectedProvince)) return false;
    if (selectedDistrict && String(service.district_id) !== String(selectedDistrict)) return false;
    if (selectedBranch && String(service.branch_id) !== String(selectedBranch)) return false;
    return true;
  });

  // Debug — remove after confirming it works
  console.log("province:", selectedProvince, "district:", selectedDistrict, "branch:", selectedBranch);
  console.log("filtered services:", servicesList.length, "of", allServicesList.length);
  console.log("sample service keys:", allServicesList[0]);

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedDistrict("");
    setSelectedBranch("");
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedBranch("");
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm grid gap-4 md:grid-cols-4">

          {/* Province */}
          <select
            className="border rounded-lg px-4 py-2"
            value={selectedProvince}
            onChange={handleProvinceChange}
          >
            <option value="">Select Province</option>
            {allprovince.map((p) => (
              <option key={p.province_id} value={p.province_id}>
                {p.province_name}
              </option>
            ))}
          </select>

          {/* District */}
          <select
            key={`district-${selectedProvince}`}
            className="border rounded-lg px-4 py-2"
            disabled={!selectedProvince || districts.length === 0}
            value={selectedDistrict}
            onChange={handleDistrictChange}
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.district_id} value={d.district_id}>
                {d.district_name}
              </option>
            ))}
          </select>

          {/* Branch */}
          <select
            key={`branch-${selectedDistrict}`}
            className="border rounded-lg px-4 py-2 z-10 relative"
            disabled={!selectedDistrict || branches.length === 0}
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option value="">Select Branch</option>
            {branches.map((b) => (
              <option key={b.branch_id} value={b.branch_id}>
                {b.branch_name}
              </option>
            ))}
          </select>

          {/* Reset */}
          <button
            className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 disabled:opacity-40"
            disabled={!selectedProvince}
            onClick={() => {
              setSelectedProvince("");
              setSelectedDistrict("");
              setSelectedBranch("");
            }}
          >
            Reset
          </button>
        </div>

        {/* Results */}
        <section className="mt-8">
          {isLoading && (
            <p className="text-center text-gray-500 py-8">Loading services...</p>
          )}
          {isError && (
            <p className="text-center text-red-500 py-8">Failed to load services.</p>
          )}
          {!isLoading && servicesList.length === 0 && selectedProvince && (
            <p className="text-center text-gray-500 py-8">No services found.</p>
          )}
          {!isLoading && servicesList.length > 0 && (
            <ServiceCard allServices={servicesList} image_url={IMG_URL} />
          )}
        </section>
      </div>
    </section>
  );
};

export default FilterService;