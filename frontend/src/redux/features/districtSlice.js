import { indexSlice } from "./indexSlice";

export const districtApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDistrict: builder.query({
      query: () => ({
        url: "/branch/get-all-district",
        method: "GET",
      }),
      providesTags: ["district"],
    }),

    // ✅ Fixed: province_id now correctly passed into the URL
    getDistrictByProvince: builder.query({
      query: (province_id) => ({
        url: `/branch/get-districts/${province_id}`,
        method: "GET",
      }),
      providesTags: ["district"],
    }),

    getBranchByDistrict: builder.query({
      query: (district_id) => ({
        url: `/branch/get-branchs/${district_id}`,
        method: "GET",
      }),
      providesTags: ["district"],
    }),
  }),
});

export const {
  useGetAllDistrictQuery,
  useGetDistrictByProvinceQuery,  // ✅ RTK auto-generates this from "getDistrictByProvince"
  useGetBranchByDistrictQuery,
} = districtApi;