import { indexSlice } from "./indexSlice";

export const managerAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getbranchManager: builder.query({
      query: (data) => ({
        url: "/auth/get-branch-manager",
        method: "GET",
      }),
      providesTags: ["manager"],
    }),
    addBranchManager: builder.mutation({
      query: (data) => ({
        url: "/auth/add-branch-manager",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["manager"],
    }),
  }),
});

export const { useGetbranchManagerQuery, useAddBranchManagerMutation } = managerAPIs;
