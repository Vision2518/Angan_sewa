import { indexSlice } from "./indexSlice";
export const ServiceApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: (filters) => ({
        url: "/services/get-all-service",
        method: "GET",
        params: filters ? {
          ...(filters.province_id && { province_id: filters.province_id }),
          ...(filters.district_id && { district_id: filters.district_id }),
          ...(filters.branch_id && { branch_id: filters.branch_id }),
        } : {},
      }),
      providesTags: ["services"], // ✅ matches tagTypes now
    }),
    getServiceByBranch: builder.query({
      query: (branchId) => ({
        url: `/services/get-services/${branchId}`,
        method: "GET",
      }),
      providesTags: ["services"],
    }),
  }),
});
export const { useGetAllServicesQuery, useGetServiceByBranchQuery } = ServiceApi;