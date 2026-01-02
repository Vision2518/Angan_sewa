import { indexSlice } from "./indexSlice";

export const managerAPIs = indexSlice.injectEndpoints({
  endpoints: (bulider) => ({
    getbranchManager: bulider.query({
      query: (data) => ({
        url: "/auth/get-branch-manager",
        method: "GET",
      }),
      providesTags: ["manager"],
    }),
  }),
});

export const { useGetbranchManagerQuery } = managerAPIs;
