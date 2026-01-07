//auth slice
import { indexSlice } from "./indexSlice";

export const branchAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBranch: builder.query({
      query: () => ({
        url: "/branch/get-branch",
        method: "GET",
      }),

      provideTags: ["branch"],
    }),
    getPDB: builder.query({
      query: ({ province_id, district_id }) => ({
        url: `/branch/pdb?${province_id ? `province_id=${province_id}` : ""}${
          district_id ? `district_id=${district_id}` : ""
        },`,
        method: "GET",
      }),
      provideTags: ["branch"],
    }),
  }),
});
export const { useGetBranchQuery, useGetPDBQuery } = branchAPIs;
