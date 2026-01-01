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
  }),
});
export const { useGetBranchQuery } = branchAPIs;
