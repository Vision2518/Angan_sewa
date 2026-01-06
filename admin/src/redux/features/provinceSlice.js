//auth slice
import { indexSlice } from "./indexSlice";
export const provinceAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProvince: builder.query({
      query: () => ({
        url: "/branch/get-province",
        method: "GET",
      }),

      provideTags: ["province"],
    }),
  }),
});
export const { useGetProvinceQuery } = provinceAPIs;
