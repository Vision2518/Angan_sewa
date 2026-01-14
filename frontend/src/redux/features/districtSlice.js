//auth slice
import { indexSlice } from "./indexSlice";

export const districtAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDistrict: builder.query({
      query: () => ({
        url: "/branch/get-district",
        method: "GET",
      }),

      provideTags: ["district"],
    }),
getBranchesByDistrict:builder.query({
      query:(district_id)=>({
        url:`/branch/get-branches/${district_id}`,
        method:"GET",
      }),
      provideTags:["branches"]
}),
   }),
});

export const { useGetDistrictQuery, useGetBranchesByDistrictQuery } = districtAPIs;