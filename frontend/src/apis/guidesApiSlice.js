import { APISlice } from './APISlice';

export const guidesApiSlice = APISlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllGuides: builder.query({
      query: () => "/api/guides", // Get all guides from backend
      providesTags: ["Guides"],
    }),
    getThoughtOfTheDay: builder.query({
      query: () => "/api/guides/thought-of-the-day", // Matches backend
      providesTags: ["Thought"], // For caching
    }),
    getGuideLore: builder.query({
      query: (id) => `/api/guides/${id}/lore`,
    }),
  }),
});

export const {
  useGetAllGuidesQuery,
  useGetThoughtOfTheDayQuery,
  useGetGuideLoreQuery,
} = guidesApiSlice;