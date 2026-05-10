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

    // NEW ENDPOINT: This handles the filtering for the cards
    getBranchesByProvince: builder.query({
      query: ({ province_id, district_id }) => ({
        url: `/branch/get-filteredBranches`,
        params: { province_id, district_id },
        method: "GET",
      }),
      providesTags: ["district"],
    }),
  }),
});

export const {
  useGetAllDistrictQuery,
  useGetDistrictByProvinceQuery,
  useGetBranchByDistrictQuery,
  useGetBranchesByProvinceQuery, // Now this will be available for export
} = districtApi;