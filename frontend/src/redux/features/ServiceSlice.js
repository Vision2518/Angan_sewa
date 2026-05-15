import { indexSlice } from "./indexSlice";

export const ServiceApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({

    getAllServices: builder.query({
      query: (filters) => {
        const {
          page = 1,
          limit = 6,
          province_id,
          district_id,
          branch_id,
        } = filters || {};

        return {
          url: "/services/get-all-service",
          method: "GET",
          params: {
            page,
            limit,
            ...(province_id && { province_id }),
            ...(district_id && { district_id }),
            ...(branch_id && { branch_id }),
          },
        };
      },

      providesTags: ["services"],
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

export const {
  useGetAllServicesQuery,
  useGetServiceByBranchQuery,
} = ServiceApi;