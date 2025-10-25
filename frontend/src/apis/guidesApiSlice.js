import { APISlice } from './APISlice';

export const guidesApiSlice = APISlice.injectEndpoints({
  endpoints: (builder) => ({
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
  useGetThoughtOfTheDayQuery,
  useGetGuideLoreQuery,
} = guidesApiSlice;