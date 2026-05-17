import { indexSlice } from "./indexSlice";
export const GalleryApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllGallery: builder.query({
      query: ({ page = 1, limit = 6 }) => ({
        url: "/gallery/get-all-gallery",
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["gallery"],
    }),
  }),
});
export const { useGetAllGalleryQuery } = GalleryApi;
