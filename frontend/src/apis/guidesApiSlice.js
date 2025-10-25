import { APISlice } from './APISlice';

export const guidesApiSlice = APISlice.injectEndpoints({
  endpoints: (builder) => ({

    getThoughtOfTheDay: builder.query({
      query: () => '/api/guides/thought-of-the-day', // Matches backend
      providesTags: ['Thought'], // For caching
    }),

  }),
});

// Export the auto-generated hook
export const {
  useGetThoughtOfTheDayQuery,
} = guidesApiSlice;