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
  }),
});
export const { useGetDistrictQuery } = districtAPIs;
